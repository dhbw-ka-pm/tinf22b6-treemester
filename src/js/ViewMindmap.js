import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../css/ViewMindmap.css"
import SaveFile from './SaveFile';
import Tools from './Tools'

var XMLParser = require('react-xml-parser');

var xslFile = require("../xml/transformMindmap.xsl");
var xmlSampleData = require("../xml/sampleData.xml");
let rootForDownload = " ";

var xml_doc;

function ViewMindmap() {
    const { state } = useLocation();

    const [toolChanges, setToolChanges] = useState(false);
    const [circleData, setCircleData] = useState();

    var canDownload = !state ? false : true;

    let file;
    let xsl;
    let svg;
    let width;
    var focus;
    var focus0;
    const headerOffset = 150;
    let selectedNode = null;

    useEffect(() => {
        xml_doc = circleData;
    }, [circleData])


    const getXSL = (functionAfter) => {
        fetch(xslFile)
            .then(response => response.text())
            .then(text => xsl = text)
            .then(() => {
                functionAfter(xml_doc)
            })
    }

    useEffect(() => {
        if (!state) {
            fetch(xmlSampleData)
                .then(response => response.text())
                .then(text => {
                    var parser = new DOMParser();
                    setCircleData(parser.parseFromString(text, "text/xml"));

                    getXSL((data) => { transformXML(data) });
                })
        }
        else {
            file = state.file;

            getXSL((_) => {convertFile(file)})
        }
    }, [state])

    return (
        <>
            <nav className="toolbar">
                <div className="content-wrapper">
                    <Tools circleData={circleData} updateCircleData={(data) => { setCircleData(data); getXSL((data) => {transformXML(data)}); }} toolChanges={toolChanges} setToolChanges={setToolChanges} />
                </div>
            </nav>
            <div className="circles"></div>
            {canDownload &&
                <div className='saveFile'>
                    <SaveFile
                        buttonText="Download as XML-File"
                        onSave={() => downloadXML(rootForDownload)}
                        defaultValue="myMindmap"
                    />
                </div>
            }
        </>
    );

    function convertFile(file) {
        var reader = new FileReader();
        reader.onload = function () {
            var parser = new DOMParser();
            let parsedXML = parser.parseFromString(reader.result, "text/xml")
            setCircleData(parsedXML)
            transformXML(parsedXML)
        }
        reader.readAsText(file);
    }

    function transformXML(xml) {
        var parser = new DOMParser();
        let processor = new XSLTProcessor();
        var xsl_doc = parser.parseFromString(xsl, "text/xml");
        processor.importStylesheet(xsl_doc);
        let res = processor.transformToDocument(xml, document);
        renderSVG(res.documentElement, new XMLSerializer().serializeToString(xml)) //adds xmlns
    }

    function renderSVG(element, xml) {
        d3.select(".circles").selectChildren().remove();
        document.getElementsByClassName("circles")[0].appendChild(element);
        svg = d3.select("svg");
        width = svg.node().getBBox().width;
        var xmlData = new XMLParser().parseFromString(xml);
        xmlData = xmlData.children[0].children[0];
        addData(xmlData);
    }

    function addData(xmlData) {

        let packingLayout = d3.pack()
            .radius(d => d.data.attributes.radius)

        var root = d3.hierarchy(xmlData, d => d.children)

        rootForDownload = root;

        focus = root;

        packingLayout(root);

        var descendants = root.descendants();

        descendants.sort((a, b) => {
            if (parseInt(a.data.attributes.id.slice(1)) < parseInt(b.data.attributes.id.slice(1))) {
                return -1;
            }
            else {
                return 1;
            }
        });

        d3.selectAll("circle")
            .data(descendants)
            .on('dblclick', (event, d) => {
                let v = d.children ? d : (d.parent ? d.parent : d);
                if (focus !== v) {
                    zoom(event, v);
                    event.stopImmediatePropagation();
                } else if (v !== root) {
                    zoom(event, root);
                    event.stopImmediatePropagation();
                }
            })
            .on('click', function (d, i) {
                var self = this;
                if (!this.clickTimeout) {
                    this.clickTimeout = setTimeout(function () {
                        if (self.isSelected) {
                            d3.select(self).attr("stroke", "none");
                            self.isSelected = false;
                        } else {
                            if (selectedNode && selectedNode !== self) {
                                d3.select(selectedNode).attr("stroke", "none");
                                selectedNode.isSelected = false;
                            }

                            d3.select(self).attr("stroke", "#000");
                            self.isSelected = true;
                            selectedNode = self;
                        }
                        self.clickTimeout = null;
                    }, 200);
                } else {
                    clearTimeout(this.clickTimeout);
                    this.clickTimeout = null;
                }
            })


        d3.selectAll("text")
            .data(descendants)

    }

    function zoom(event, d) {
        if (!focus) {
            return;
        }
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

        d3.selectAll("text")
            .filter(function (d) { return d.parent === focus || d === focus || this.getAttribute("display") === 'inline' })
            .transition(transition)
            .attr('fill-opacity', d => d.parent === focus || d === focus ? 1 : 0)
            .attr('font-size', d => d === focus ? '22px' : '13px')
            .attr('font-weight', d => d === focus ? '700' : '200')
            .on('start', function (d) { if (d.parent === focus || d === focus) this.setAttribute("display", "inline") })
            .on('end', function (d) { if (d.parent !== focus && d !== focus) this.setAttribute("display", "none") });
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
    function createXML(root) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<!DOCTYPE root SYSTEM "mindmapData.dtd">\n';
        xml += '<?xml-stylesheet href="transformMindmap.xsl" type="text/xsl"?>\n';
        xml += '<root>\n';
        xml += createNodeXML(root);
        xml += '</root>\n';
        return xml;
    }

    function createNodeXML(node) {
        let xml = '';
        xml += `<node id="${node.data.attributes.id}" x="${node.data.attributes.x}" y="${node.data.attributes.y}" color="${node.data.attributes.color}" radius="${node.data.attributes.radius}" text="${node.data.attributes.text}">\n`;
        if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
                xml += createNodeXML(node.children[i]);
            }
        }
        xml += '</node>\n';
        return xml;
    }

    function downloadXML(root) {
        const xml = createXML(root);
        const xmlToDownload = new Blob([xml], { type: 'application/xml' });
        const downloadLink = URL.createObjectURL(xmlToDownload);

        let fileName = document.getElementById("fileNameInput").value;

        const linkElement = document.createElement('a');
        linkElement.href = downloadLink;
        linkElement.download = fileName;
        linkElement.click();
    }
}

export default ViewMindmap;
