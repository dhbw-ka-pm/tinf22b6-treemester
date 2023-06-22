import './App.css'
import CirclePacking from './CirclePacking'

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
    return (
        <div className="App">
            <header className="App-header">
                <p>Treemester is a software for students and other people, who are struggling with learning and are in need of better topical guidance</p>
                <div className="tree">
                    <CirclePacking data={circleTestData}></CirclePacking>
                </div>
            </header>
        </div>
    );
}

export default App
