import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


var xslFile = require("./xml/convertToSvg.xsl");


function ViewMindmap() {
    const navigate = useNavigate();
    const { state } = useLocation();

    let file;
    let xsl;
    let svg;
    let width;
    var focus;
    var focus0;
    const headerOffset = 150;

    useEffect(() => {
        if (!state) {
            navigate("/tinf22b6-treemester")
        }
        else {
            file = state.file;

            fetch(xslFile)
                .then(response => response.text())
                .then(text => xsl = text)
                .then(() => {
                    convertFile(file);
                })


        }
    }, [])
    return (
        <div className="circles">

        </div>
    );

    function convertFile(file) {
        var reader = new FileReader();
        reader.onload = function () {
            let processor = new XSLTProcessor();
            var parser = new DOMParser();
            var xsl_doc = parser.parseFromString(xsl, "text/xml");
            var xml_doc = parser.parseFromString(reader.result, "text/xml");
            processor.importStylesheet(xsl_doc);
            let res = processor.transformToDocument(xml_doc, document);
            renderSVG(res.documentElement, reader.result);
        }
        reader.readAsText(file);
    }

    function renderSVG(element, xml) {
        d3.select(".circles").selectChildren().remove();
        document.getElementsByClassName("circles")[0].appendChild(element);
        svg = d3.select("svg");
        width = svg.node().getBBox().width;

        addData(xml);
    }

    function addData(xml) {

        var XMLParser = require('react-xml-parser');
        var xmlData = new XMLParser().parseFromString(xml);
        xmlData = xmlData.children[0];

        let packingLayout = d3.pack()
        .radius(d => d.data.attributes.radius)

        var hierarchy = d3.hierarchy(xmlData, d => d.children)
        
        let root = hierarchy.children[0]
        focus = root;
        
        packingLayout(hierarchy);
        
        var descendants = hierarchy.descendants().slice(1);

        descendants.sort((a,b) => {
            if(parseInt(a.data.attributes.id.slice(1)) < parseInt(b.data.attributes.id.slice(1))){
                return -1;
            }
            else{
                return 1;
            }
        });


        d3.selectAll("circle")
            .data(descendants)
            .on('click', (event, d) => {
                let v = d.children ? d : d.parent;
                if (focus !== v) {
                    zoom(event, v);
                    event.stopImmediatePropagation();
                } else if (v !== root) {
                    zoom(event, root);
                    event.stopImmediatePropagation();
                }
            })
            

        d3.selectAll("text")
            .data(descendants)
            .style('fill-opacity', d => d.parent === focus || d === focus ? 1 : 0)
            .style('display', d => d.parent === focus || d === focus ? 'inline' : 'none')
            .style('font-size', d => d === focus ? '18px' : '12px')
            .style('font-weight', d => d === focus ? '600' : '200')


        zoomTo([root.x, root.y, root.r * 2], headerOffset, 0);


    }

    function zoom(event, d) {
        focus0 = focus;
        focus = d;

        //Zoom Effekt
        const transition = svg.transition()
            .duration(750)
            .tween('zoom', () => {
                const i = d3.interpolateZoom([focus0.x, focus0.y, focus0.r * 2], [focus.x, focus.y, focus.r * 2]);
                let textIn = d3.interpolate(0, headerOffset);
                let textOut = d3.interpolate(headerOffset, 0);
                return t => zoomTo(i(t), textIn(t), textOut(t));
            });

        //packingLayout(root);

        d3.selectAll("text")
            .filter(function (d) { return d.parent === focus || d === focus || this.style.display === 'inline' })
            .transition(transition)
            .style('fill-opacity', d => d.parent === focus || d === focus ? 1 : 0)
            .style('font-size', d => d === focus ? '18px' : '12px')
            .style('font-weight', d => d === focus ? '600' : '200')
            .on('start', function (d) { if (d.parent === focus || d === focus) this.style.display = 'inline' })
            .on('end', function (d) { if (d.parent !== focus && d !== focus) this.style.display = 'none' });
    }

    function zoomTo(v, textIn, textOut) {
        const k = width / v[2];

        d3.selectAll("circle")
            .attr('cx', d => (d.data.attributes.x - v[0]) * k)
            .attr('cy', d => (d.data.attributes.y - v[1]) * k)
            .attr('r', d => d.data.attributes.radius * k);

        d3.selectAll("text")
            .attr('x', d => (d.data.attributes.x - v[0]) * k)
            .attr('y', d => {
                let a = null;
                if (d === focus) {
                    a = textIn;
                } else if (d === focus0) {
                    a = textOut;
                } else {
                    a = 0;
                }
                return (d.data.attributes.y - v[1]) * k - a
            });
    }
}

export default ViewMindmap;