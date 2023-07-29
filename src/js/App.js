import React, { useState } from 'react';
import '../css/App.css';
import CirclePacking from './CirclePacking';
import About from './About';
import Layout from './Layout';
import Tools from './Tools';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ViewMindmap from './ViewMindmap';

var intialCircleData = ({
    "name": "Theoretische Informatik",
    "radius": 800,
    "children": [
        {
            "name": "Sortieralgorithmen",
            "radius": 300,
            "children": [
                {
                    "name": "Bubble Sort",
                    "radius": 55,
                    "children": []
                },
                {
                    "name": "Insertion Sort",
                    "radius": 65,
                    "children": []
                },
                {
                    "name": "Merge Sort",
                    "radius": 50,
                    "children": []
                }
            ]
        },
        {
            "name": "Turingmaschinen",
            "radius": 55,
            "children": []
        },
        {
            "name": "Vollständige Induktion",
            "radius": 300,
            "children": [
                {
                    "name": "Induktionsanfang",
                    "radius": 50,
                    "children": []
                },
                {
                    "name": "Induktionsschritt",
                    "radius": 150,
                    "children": [
                        {
                            "name": "Induktionsannahme",
                            "radius": 45,
                            "children": []
                        },
                        {
                            "name": "Induktionsbehauptung",
                            "radius": 55,
                            "children": []
                        },
                    ]
                }
            ]
        }
    ]
});

const App = () => {
    const [circleData, setCircleData] = useState(intialCircleData);

    const [toolChanges, setToolChanges] = useState(false);
    
    // Function to update the circle data
    const updateCircleData = (newData) => {
        setCircleData(newData);
    };

    return (
        <React.Fragment>
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path='/tinf22b6-treemester' element={<Layout />}>
                            <Route index element={
                                <div className="circles" key={toolChanges}>
                                    <nav className="toolbar">
                                        <div className="content-wrapper">
                                        <Tools circleData={circleData} updateCircleData={updateCircleData} toolChanges={toolChanges} setToolChanges={setToolChanges} />
                                        </div>
                                    </nav>
                                    <CirclePacking data={circleData} />
                                </div>
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
