import React, { useState } from 'react';
import * as d3 from 'd3';

const Tools = () => {
  const [size, setSize] = useState(50);
  const [text, setText] = useState('');


  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  var circleTestData = {
    "name": "Theoretische Informatik",
    "children": [
        {   
            "name": "Sortieralgorithmen",
            "children": [
                {
                    "name": "Bubble Sort",
                    "radius": 55
                },
                {
                    "name": "Insertion Sort",
                    "radius": 65
                },
                {
                    "name": "Merge Sort",
                    "radius": 50
                }
            ]
        },
        {
            "name": "Turingmaschinen",
            "radius": 55
        },
        {
            "name": "Vollst\u00e4ndige Induktion",
            "children": [
                {
                    "name": "Induktionsanfang",
                    "radius": 50
                },
                {
                    "name": "Induktionsschritt",
                    "children": [
                        {
                            "name": "Induktionsannahme",
                            "radius": 45
                        },
                        {
                            "name": "Induktionsbehauptung",
                            "radius": 55
                        },
                    ]
                }
            ]
        }
    ]
}
  
  const handleAddCircle = (newCircle) => {
    var selectedName = findOutName();
    if(selectedName === null){
      console.log("Kein Circle gefunden");
      return;
    }
    console.log(selectedName);

    addCircleToTestData(circleTestData,selectedName,newCircle);
    console.log(circleTestData);
    selectedName = null;
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

  function findOutName(){
    const node = d3.selectAll("circle")
                .filter(function () { return    d3.select(this).attr('stroke') === '#000';}) 
    if (node.empty()) {
      return null;
    } else {
      return node.datum().data.name; 
    }      
        
  }

  const handleCreateCircle = () => {
    var newCircle = {
      "name": text,
      "radius": size,
      "children": []
    };
    handleAddCircle(newCircle);
  };


  return (
    <>
      <p>
        <label>
          Size: &nbsp;
          <input type="number" value={size} onChange={handleSizeChange} />
        </label>
      </p>
      <p>
        <label>
          Text: &nbsp;
          <input type="text" value={text} onChange={handleTextChange} />
        </label>
      </p>
      <button onClick={handleCreateCircle}>Create Circle</button>
    </>
  );
};

export default Tools;
