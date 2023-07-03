import { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
    const [current, setCurrent] = useState("");
    var classNameAbout = " ";

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

                <Link to="/tinf22b6-treemester/about" onClick={() => setCurrent("about")} className={classNameAbout}>
                    <span>About Treemester</span>
                </Link>

                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")}>                    
                    <span>Login</span>
                </Link>
                    
                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")}>
                    <span>Edit</span>
                    <ul>
                        <li>
                          &nbsp;Create new Mindmap&nbsp; 
                        </li>
                        
                        <li>
                          &nbsp;Upload Mindmap&nbsp;
                        </li>

                        <li>
                          &nbsp;Create new Sprintline&nbsp;
                        </li>
                        
                        <li>
                          &nbsp;Upload Sprintline&nbsp; 
                       </li>
                   </ul>
                </Link>
                
                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")} >
                    <span>Settings</span>
                        <ul>
                            <li>
                            &nbsp;Options&nbsp;
                            </li>
                            <li>
                            &nbsp;Darkmode&nbsp;
                            </li>
                            <li>
                            &nbsp;Help&nbsp;
                            </li>
                            <li>
                            &nbsp;"Logged User"&nbsp;
                            </li>
                        </ul>
                    </Link>            
                </div>
        </nav>
    )
}

export default Navigation;