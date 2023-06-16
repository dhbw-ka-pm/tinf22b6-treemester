import logo from './logo.svg';
import './App.css';
import Treemap from './Treemap';
import { useState } from 'react';

const testData = {
    "name": "Theoretische Informatik",
    "value": 20,
    "children": [
        {
            "name": "Sortieralgorithmen",
            "value": 15,
            "children": [
                {
                    "name": "Bubble Sort",
                    "value": 10,
                },
                {
                    "name": "Insertion Sort",
                    "value": 10,
                },
                {
                    "name": "Merge Sort",
                    "value": 10,
                }
            ]
        },
        {
            "name": "Turingmaschinen",
            "value": 15,
        }
    ]
}
const testData2 = {
    "name": "Sortieralgorithmen",
    "value": 15,
    "children": [
        {
            "name": "Bubble Sort",
            "value": 10,
        },
        {
            "name": "Insertion Sort",
            "value": 10,
        },
        {
            "name": "Merge Sort",
            "value": 10,
        }
    ]
}


function App() {
    const [data, setData] = useState(testData)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Treemester is a software for students and other people, who are struggling with learning and are in need of better topical guidance 
              </p>
              <div class="tree">
                  <button id="button1" onClick={() => setData(testData)}>Mindmap 1</button>
                  <button id="button2" onClick={() => setData(testData2)}>Mindmap 2</button>
                  <Treemap data={data}></Treemap>
              </div>
              </header>
          
    </div>
    );

    function buttonFunction() {
        setData(data == testData ? testData2 : testData);
    }
}

export default App;

