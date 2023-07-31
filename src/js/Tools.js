import React, { useState } from 'react';
import * as d3 from 'd3';


var XMLParser = require('react-xml-parser');


const Tools = ({ circleData, updateCircleData, setToolChanges, toolChanges }) => {
    const [size, setSize] = useState(50);
    const [text, setText] = useState('');
  
    let packingLayout = d3.pack()
        .radius(d => {
            if (d.children) {
                return d3.packEnclose(d.children).r;
            } else {
                return d.data.attributes.radius;
            }
        });

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleAddCircle = () => {
        var selectedNode = findOutNode();
        if (selectedNode === null) {
            return;
        }

        const newCircle = document.createElementNS("", "node");

        let updatedData = addCircleToData(circleData, selectedNode, newCircle, text, size);
        updateCircleData(updatedData);

        setToolChanges(!toolChanges);
    }


    const addCircleToData = (data, selection, newCircle, text, size) => {

        var node = data.getElementById(selection.datum().data.attributes.id)
        node.appendChild(newCircle)
        newCircle.setAttribute("color", "white")
        newCircle.setAttribute("radius", parseInt(size))
        newCircle.setAttribute("text", text)
        updateIds(data.getElementById("N1"), 0)
        updateRadiusAndPosition(data)
        return data;

    }

    function updateIds(node, start) {
        var id = start;
        id++;
        node.setAttribute("id", "N" + id)
        let children = node.children;
        if (children) {
            for (const child of children) {
                id = updateIds(child, id);
            };
        }
        return id;
    }

    function updateRadiusAndPosition(data) {
        let packData = new XMLSerializer().serializeToString(data);
        packData = new XMLParser().parseFromString(packData);
        var root = d3.hierarchy(packData.children[0].children[0], d => d.children)
        packingLayout(root);

        var node = data.getElementById("N1");
        var maxDepth = d3.max(root.descendants(), function (d) { return +d.depth });
        const color = d3.scaleSequential([maxDepth, 0], d3.interpolate('#b9f0e2', '#3b77a8'));
        updateValues(node, root, color);

    }

    function updateValues(node, packedNode, color) {
        node.setAttribute("x", packedNode.x)
        node.setAttribute("y", packedNode.y)
        node.setAttribute("radius", packedNode.r)
        node.setAttribute("color", packedNode.children ? color(packedNode.depth) : 'white')
        let children = node.children;
        var i = 0;
        if (children) {
            for (const child of children) {
                updateValues(child, packedNode.children[i], color)
                i++;
            };
        }
    }

    function findOutNode() {
        const node = d3.selectAll("circle")
            .filter(function () { return d3.select(this).attr('stroke') === '#000'; })
        if (node.empty()) {
            return null;
        } else {
            return node;
        }
    }

    const handleSizeKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if ((charCode < 48) || (charCode > 57)) { // 0 - 9
            event.preventDefault();
        }
    };
    

    return (
        <>
            <p>
                <label>
                    Size: &nbsp;
                    <input type="text" value={size} onChange={handleSizeChange} onKeyPress={handleSizeKeyPress} />
                </label>
            </p>
            <p>
                <label>
                    Text: &nbsp;
                    <input type="text" value={text} onChange={handleTextChange} />
                </label>
            </p>
            <button onClick={handleAddCircle}>Create Circle</button>    
        </>
    );
};

export default Tools;
