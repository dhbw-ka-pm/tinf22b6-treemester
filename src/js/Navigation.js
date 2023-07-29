import { useState } from "react";
import { Link } from "react-router-dom";
import ReactFileReader from 'react-file-reader';
import { useNavigate } from "react-router-dom";
import xmlbuilder from 'xmlbuilder';
import SaveFile from "./SaveFile";
import "../css/Navigation.css"
import CreateSprintline from "./CreateSprintline";
import SprintlineDialog from "./Sprintline";

function Navigation() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState("");
    var classNameAbout = "about";

    const [showToolbar, setShowToolbar] = useState(false);

    const toggleCurrent = (curr) => {
        return current !== curr ? setCurrent(curr) : setCurrent("start");
    }

    const toggleCurrentLink = (curr, currLink) => {
        return current !== curr ? currLink : "/tinf22b6-treemester";
    }

    const handleShowToolbar = () => {
        setShowToolbar(!showToolbar);
    };

    switch (current) {
        case "about":
            classNameAbout = "currentPage";
            break;
        default:
            break;
    }
    
    function handleFiles(files) {
        navigate("/tinf22b6-treemester/view", { state: { file: files[0] } });
    }

    function createFile() {
        const root = xmlbuilder.create('root', { version: '1.0', encoding: 'UTF-8' });
        root.dtd('mindmapData.dtd');
        root.instructionBefore('xml-stylesheet', 'href="transformMindmap.xsl" type="text/xsl"');

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
    function createSprintFile() {
        const root = xmlbuilder.create('root', { version: '1.0', encoding: 'UTF-8' });
        root.dtd('sprintline.dtd');
       
        let fileName = document.getElementById("elementInput").value;

        root.ele('label', {
            id: "1",
            sublabel: "first",
            boolean: "true",
            text: fileName
        })
        const xml = root.end({ pretty: true });

        const xmlToDownload = new Blob([xml], { type: 'application/xml' });
        const downloadLink = URL.createObjectURL(xmlToDownload);

        const linkElement = document.createElement('a');
        linkElement.href = downloadLink;
        linkElement.download = fileName + ".xml";
        linkElement.click();

        navigate("/tinf22b6-treemester/view", { state: { file: xmlToDownload } });
    }


    return (
        <>    
        <nav className="navigation">
            <div className="start">
                <Link className="link" to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")}>
                    <p className="label">&#x1F333; Treemester</p>
                </Link>

            </div>
            <div className="links">
                <Link className={"link " + classNameAbout} to={toggleCurrentLink("about", "/tinf22b6-treemester/about")} onClick={() => toggleCurrent("about")}>
                    <span>About</span>
                </Link>

                <div className="link" >
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
                           <CreateSprintline
                                buttonText="Create new Sprintline"
                                onSave={createSprintFile}
                                defaultValue="mySprintline"
                            />
                        </li>

                        <li>
                        <SprintlineDialog
                        />
                        </li>
                    </ul>
                </div>

                <div className="link">
                    <span>Settings</span>
                    <ul>
                        <li>
                            Darkmode
                        </li>
                        <li>
                            <Link to={toggleCurrentLink("about", "/tinf22b6-treemester/about")} onClick={() => toggleCurrent("about")} className={"link " + classNameAbout}>
                                Help
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
   ); 
}

export default Navigation;

