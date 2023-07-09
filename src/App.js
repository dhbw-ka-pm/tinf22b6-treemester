import React from 'react';
import './App.css';
import CirclePacking from './CirclePacking';
import About from './About';
import Layout from './Layout';
import xmlbuilder from 'xmlbuilder';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ViewMindmap from './ViewMindmap';

// const circleTestData = {
//     "name": "Theoretische Informatik",
//     "children": [
//         {
//             "name": "Sortieralgorithmen",
//             "children": [
//                 {
//                     "name": "Bubble Sort",
//                     "radius": 55
//                 },
//                 {
//                     "name": "Insertion Sort",
//                     "radius": 65
//                 },
//                 {
//                     "name": "Merge Sort",
//                     "radius": 50
//                 }
//             ]
//         },
//         {
//             "name": "Turingmaschinen",
//             "radius": 55
//         },
//         {
//             "name": "Vollst\u00e4ndige Induktion",
//             "children": [
//                 {
//                     "name": "Induktionsanfang",
//                     "radius": 50
//                 },
//                 {
//                     "name": "Induktionsschritt",
//                     "children": [
//                         {
//                             "name": "Induktionsannahme",
//                             "radius": 45
//                         },
//                         {
//                             "name": "Induktionsbehauptung",
//                             "radius": 55
//                         },
//                     ]
//                 }
//             ]
//         }
//     ]
// }

// function downloadXML (json){
//     const xml = xmlbuilder.create(json, {encoding: 'utf-8'}).end({pretty: true});
//     const xmlToDownload = new Blob([xml], {type: 'application/xml'});
//     const downloadLink = URL.createObjectURL(xmlToDownload);

//     const linkElement = document.createElement('a');
//     linkElement.href = downloadLink;
//     linkElement.download = 'your_circle_packing.xml';
//     linkElement.click();
// }

const circleTestData = {
    "name":"Theoretische Informatik",
    "id":"N1",
    "x":"0",
    "y":"0",
    "color":"rgb(59, 119, 168)",
    "radius":"273.278",
    "children":[
       {
          "name":"Sortieralgorithmen",
          "id":"N2",
          "x":"-99.1991",
          "y":"-112.515",
          "color":"rgb(101, 159, 187)",
          "radius":"123.278",
          "children":[
             {
                "name":"Bubble Sort",
                "id":"N3",
                "x":"-164.472",
                "y":"-132.548",
                "color":"white",
                "radius":55
             },
             {
                "name":"Insertion Sort",
                "id":"N4",
                "x":"-44.4723",
                "y":"-132.548",
                "color":"white",
                "radius":65
             },
             {
                "name":"Merge Sort",
                "id":"N5",
                "x":"-113.639",
                "y":"-40.6732",
                "color":"white",
                "radius":50
             }
          ]
       },
       {
          "name":"Turingmaschinen",
          "id":"N6",
          "x":"79.0792",
          "y":"-112.515",
          "color":"white",
          "radius":55
       },
       {
          "name":"Vollst\u00e4ndige Induktion",
          "id":"N7",
          "x":"81.5273",
          "y":"92.4707",
          "color":"rgb(101, 159, 187)",
          "radius":150,
          "children":[
             {
                "name":"Induktionsanfang",
                "id":"N8",
                "x":"-18.4727",
                "y":"92.4707",
                "color":"white",
                "radius":50
             },
             {
                "name":"Induktionsschritt",
                "id":"N9",
                "x":"131.527",
                "y":"92.4707",
                "color":"rgb(143, 200, 207)",
                "radius":100,
                "children":[
                   {
                      "name":"Induktionsannahme",
                      "id":"N10",
                      "x":"76.5273",
                      "y":"92.4707",
                      "color":"white",
                      "radius":45
                   },
                   {
                      "name":"Induktionsbehauptung",
                      "id":"N11",
                      "x":"176.527",
                      "y":"92.4707",
                      "color":"white",
                      "radius":55
                   }
                ]
             }
          ]
       }
    ]
 }


const root = xmlbuilder.create('root', {version: '1.0', encoding: 'UTF-8'});
root.dtd('testData.dtd');
root.instructionBefore('xml-stylesheet', 'href="convertSVG.xsl" type="text/xsl"');

function createNode(parent, data) {
  const node = parent.ele('node', {
    id: data.id,
    x: data.x,
    y: data.y,
    color: data.color,
    radius: data.radius,
    text: data.name
  });
  if (data.children) {
    data.children.forEach(child => createNode(node, child));
  }
}

function downloadXML (json){
    createNode(root, json);
    const xml = root.end({pretty: true});
    
    const xmlToDownload = new Blob([xml], {type: 'application/xml'});
    const downloadLink = URL.createObjectURL(xmlToDownload);

    const linkElement = document.createElement('a');
    linkElement.href = downloadLink;
    linkElement.download = 'your_circle_packing.xml';
    linkElement.click();
}

function App() {
    return (
        <React.Fragment>
        <header className="App-header">
        <BrowserRouter>
            <Routes>
                <Route path='/tinf22b6-treemester' element={<Layout />}>
                    <Route index element={
                        <><div className="circles">
                                    <CirclePacking data={circleTestData} />
                                </div><div className='buttons'>
                                        <button className='downloadButton' onClick={() => downloadXML(circleTestData)}>Download as XML-File</button>
                                    </div></>
                    } />
                    <Route path='/tinf22b6-treemester/about' element={<About />} />
                    <Route path='/tinf22b6-treemester/view' element={<ViewMindmap />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </header>
        </React.Fragment>
    );
}

export default App;