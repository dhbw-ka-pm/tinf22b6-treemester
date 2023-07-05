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

const circleTestData = {
    "name": "Theoretische Informatik",
    "value": 60,
    "children": [
        {
            "name": "Sortieralgorithmen",
            "value": 45,
            "children": [
                {
                    "name": "Bubble Sort",
                    "value": 55
                },
                {
                    "name": "Insertion Sort",
                    "value": 65
                },
                {
                    "name": "Merge Sort",
                    "value": 50
                }
            ]
        },
        {
            "name": "Turingmaschinen",
            "value": 55
        },
        {
            "name": "Vollst\u00e4ndige Induktion",
            "value": 30,
            "children": [
                {
                    "name": "Induktionsanfang",
                    "value": 50
                },
                {
                    "name": "Induktionsschritt",
                    "value": 60,
                    "children": [
                        {
                            "name": "Induktionsannahme",
                            "value": 45
                        },
                        {
                            "name": "Induktionsbehauptung",
                            "value": 55
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
                </Route>
            </Routes>
        </BrowserRouter>
        </header>
        </React.Fragment>
    );
}

export default App;