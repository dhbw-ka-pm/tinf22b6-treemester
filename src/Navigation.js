import { useState } from "react";
import { Link } from "react-router-dom";
import ReactFileReader from 'react-file-reader';
import { useNavigate } from "react-router-dom";
import xmlbuilder from 'xmlbuilder';
import SaveFile from "./SaveFile";

function Navigation() {
    const navigate = useNavigate();
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

                <a>
                    <span>Edit</span>
                    <ul>
                        <li>
                            <SaveFile
                                buttonText="Create new Mindmap"
                                onSave={createFile}
                                defaultValue="myMindmap"
                            />
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
                             <ReactFileReader handleFiles={(files) => handleFiles(files)} fileTypes={[".xml"]}>
                                <>Upload SprintLine</>
                            </ReactFileReader>
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

    function createFile() {
        const root = xmlbuilder.create('root', { version: '1.0', encoding: 'UTF-8' });
        root.dtd('testData.dtd');
        root.instructionBefore('xml-stylesheet', 'href="convertSVG.xsl" type="text/xsl"');

        let fileName = document.getElementById("fileNameInput").value;

        root.ele('node', {
            id: "N1",
            x: "0",
            y: "0",
            color: "rgb(150, 150, 150)",
            radius: "200",
            text: fileName
        });

        const xml = root.end({ pretty: true });

        const xmlToDownload = new Blob([xml], { type: 'application/xml' });
        const downloadLink = URL.createObjectURL(xmlToDownload);

        const linkElement = document.createElement('a');
        linkElement.href = downloadLink;
        linkElement.download = fileName + ".xml";
        linkElement.click();

        navigate("/tinf22b6-treemester/view", { state: { file: xmlToDownload } });
    }
}

export default Navigation;

