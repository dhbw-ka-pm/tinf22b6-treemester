import React, { useState } from 'react';
import './App.css';
import CirclePacking from './CirclePacking';
import About from './About';

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
                    "children":[
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
    const [currentPage, setCurrentPage] = useState('Circles');
  
    const handleNavigationClick = (page) => {
        if (currentPage !== page) {
            setCurrentPage(page);
        } else {
            setCurrentPage('Circles');
        }
    };
  
    return (
        <div className="App">
            <header className="App-header">
                <nav className="navigation">
                    <div className="label">
                        <p>&#127795;   Treemester</p>
                    </div>
                    <ul>
                        <li className={currentPage === 'About the Project' ? 'active' : ''}>
                            <button onClick={() => handleNavigationClick('About the Project')}>
                                About the Project
                            </button>
                        </li>
                    </ul>
                </nav>
                {currentPage === 'Circles' && (
                    <div className="circles">
                        <CirclePacking data={circleTestData} />
                    </div>
                )}
                {currentPage === 'About the Project' && (
                    <div className="about">
                        <About />
                    </div>
                )}
            </header>
        </div>
    );
}
  
export default App;
