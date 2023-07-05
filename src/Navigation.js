import { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
    const [current, setCurrent] = useState("");
    var classNameAbout = "about";

    const toggleCurrent = (curr) => {
        return current !== curr ? setCurrent(curr) : setCurrent("start");
    }

    const toggleCurrentLink = (curr, currLink) => {
        return current !== curr ? currLink : "/tinf22b6-treemester";
    }

    switch (current) {
        case "about":
            classNameAbout = "currentPage";
            break;
        // case "circlePacking":
        //     classNameCirclePacking = " ";
        //     break;
        default:
            break;
    }

    return (
        <nav className="navigation">
            <div className="start">
                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")}>
                    <p className="label">&#x1F333; Treemester</p>
                </Link>

            </div>
            <div className="links">

                <Link to={toggleCurrentLink("about", "/tinf22b6-treemester/about")} onClick={() => toggleCurrent("about")} className={classNameAbout}>
                    <span>About Treemester</span>
                </Link>

                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")}>                    
                    <span>Login</span>
                </Link>
                    
                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")}>
                    <span>Edit</span>
                    <ul>
                        <li>
                        Create new Mindmap
                        </li>
                        <li>
                        Upload Mindmap
                        </li>

                        <li>
                        Create new Sprintline
                        </li>
                        
                        <li>
                        Upload Sprintline 
                       </li>
                   </ul>
                </Link>
                
                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")} >
                    <span>Settings</span>
                        <ul>
                            <li>
                            Options
                            </li>
                            <li>
                            Darkmode
                            </li>
                            <li>
                            Help
                            </li>
                            <li>
                            "Logged User"
                            </li>
                        </ul>
                    </Link>            
                </div>
        </nav>
    )
}

export default Navigation;