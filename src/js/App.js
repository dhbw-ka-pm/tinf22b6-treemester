import React from 'react';
import '../css/App.css';
import About from './About';
import Layout from './Layout';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ViewMindmap from './ViewMindmap';

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
