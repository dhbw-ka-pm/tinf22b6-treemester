import React from 'react';
import './App.css';
import CirclePacking from './CirclePacking';
import About from './About';
import Layout from './Layout';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ViewMindmap from './ViewMindmap';

const circleTestData = {
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


function App() {
    return (
        <React.Fragment className="App">
        <header className="App-header">
        <BrowserRouter>
            <Routes>
                <Route path='/tinf22b6-treemester' element={<Layout />}>
                    <Route index element={
                        <div className="circles">
                            <CirclePacking data={circleTestData} />
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