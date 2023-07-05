import { useState } from "react";
import { Link } from "react-router-dom";
import ReactFileReader from 'react-file-reader';
import { useNavigate } from "react-router-dom";

function Navigation() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState("");
    var classNameAbout = " ";

    switch (current) {
        case "about":
            classNameAbout = "currentPage";
            break;
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

                <a>
                    <span>Edit</span>
                    <ul>
                        <li>
                            Create new Mindmap
                        </li>
                        <li>
                            <ReactFileReader handleFiles={(files) => handleFiles(files)} fileTypes={[".xml"]}>
                                <>Upload Mindmap</>
                            </ReactFileReader>
                        </li>

                        <li>
                            Create new Sprintline
                        </li>

                        <li>
                            Upload Sprintline
                        </li>
                    </ul>
                </a>

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

    function handleFiles(files) {
        navigate("/tinf22b6-treemester/view", { state: { file: files[0] } });
    }
}

export default Navigation;

