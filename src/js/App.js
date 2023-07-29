import React, { useState } from 'react';
import '../css/App.css';
import About from './About';
import Layout from './Layout';

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
            "name": "Vollständige Induktion",
            "radius": 300,
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
});

const App = () => {

    return (
        <React.Fragment>
            <header className="App-header">
                <BrowserRouter>
                    <Routes>
                        <Route path='/tinf22b6-treemester' element={<Layout />}>
                            <Route index element={
                                    <ViewMindmap/>
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
