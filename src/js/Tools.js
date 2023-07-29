import React, { useState } from 'react';
import * as d3 from 'd3';
import ToolsTooltip from './ToolsTooltip';
import { right } from '@popperjs/core';

const Tools = ({ circleData, updateCircleData, setToolChanges, toolChanges}) => {
    const [size, setSize] = useState(50);
    const [text, setText] = useState('');
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState("");
  

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleAddCircle = () => {
        var selectedNode = findOutNode();
        if (selectedNode === null) {
            console.log("Kein Circle gefunden");
            return;
        }
        console.log(selectedNode);
        
        const newCircle = {
            "name": text,
            "radius": parseInt(size),
            "children": []
        };

        if(circleSizeUnfitting(selectedNode, newCircle)){
            setTooltipMessage("Can't add the circle - too big");
            setTooltipVisible(true);
            setTimeout(() => {
                setTooltipVisible(false);
              }, 3000);  
            return;
        }

        const updatedData = addCircleToTestData(circleData, selectedNode.name, newCircle);
        updateCircleData(updatedData);

        setToolChanges(!toolChanges);
    }


    const addCircleToTestData = (node, selectedName, newCircle) => {
        if (node.name === selectedName) {
            if (!node.children) {
                node.children = [];
            }
            node.children.push(newCircle);
        } else if (node.children) {
            node.children = node.children.map(child => addCircleToTestData(child, selectedName, newCircle));
        }

        return node;
    }

    function findOutNode() {
        const node = d3.selectAll("circle")
            .filter(function () { return d3.select(this).attr('stroke') === '#000'; })
        if (node.empty()) {
            return null;
        } else {
            return node.datum().data;
        }
    }

    function circleSizeUnfitting(selectedNode, newCircle){
        const nodeSize = selectedNode.radius;
        let childrenSize = 0;
        
        if (selectedNode.children && selectedNode.children.length > 0) {
            selectedNode.children.forEach(element => {
              childrenSize += element !== null ? element.radius : 0;
            });
        }

        childrenSize += newCircle.radius;
        
        return childrenSize > nodeSize;
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
            
            <ToolsTooltip isVisible={tooltipVisible} message={tooltipMessage} alignment={right} />
        </>
    );
};

export default Tools;
