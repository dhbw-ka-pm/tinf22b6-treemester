import React, { useState } from 'react';
import * as d3 from 'd3';

const Tools = ({ circleData, updateCircleData, setToolChanges, toolChanges}) => {
    const [size, setSize] = useState(50);
    const [text, setText] = useState('');


    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleAddCircle = () => {
        var selectedName = findOutName();
        if (selectedName === null) {
            console.log("Kein Circle gefunden");
            return;
        }
        console.log(selectedName);
        
        const newCircle = {
            "name": text,
            "radius": parseInt(size),
            "children": []
        };
        
        const updatedData = addCircleToTestData(circleData, selectedName, newCircle);
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

    function findOutName() {
        const node = d3.selectAll("circle")
            .filter(function () { return d3.select(this).attr('stroke') === '#000'; })
        if (node.empty()) {
            return null;
        } else {
            return node.datum().data.name;
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
