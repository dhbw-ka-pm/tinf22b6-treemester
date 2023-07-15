import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import ReactFileReader from 'react-file-reader';
import { useNavigate } from "react-router-dom";
import xmlbuilder from 'xmlbuilder';
import SaveFile from "./SaveFile";
import ToolBar from "./Toolbar";
import "../css/Navigation.css"
import { ReactSVG } from "react-svg";

function Navigation({handleToolbarCreateCircle,handleToolbarClose}) {
    
    const navigate = useNavigate();
    const [current, setCurrent] = useState("");
    var classNameAbout = "about";

    const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({ top: 100, left: 100 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    const toggleCurrent = (curr) => {
        return current !== curr ? setCurrent(curr) : setCurrent("start");
    }

    const toggleCurrentLink = (curr, currLink) => {
        return current !== curr ? currLink : "/tinf22b6-treemester";
    }

    const handleFloatingToolbarToggle = () => {
        setShowFloatingToolbar(!showFloatingToolbar);
    };

    const handleCloseToolbar = () => {
        setShowFloatingToolbar(false);
      };
    
    const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const offsetX = clientX - toolbarPosition.left;
    const offsetY = clientY - toolbarPosition.top;
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
          if (isLocked || !isDragging) return;
          const { clientX, clientY } = e;
          const newLeft = clientX - dragOffset.x;
          const newTop = clientY - dragOffset.y;
          setToolbarPosition({ left: newLeft, top: newTop });
        };
    
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }, [isLocked, isDragging, dragOffset]);
    
    const handleMouseUp = () => {
        setIsDragging(false);
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

    return (
        <>    
        <nav className="navigation">
            <div className="start">
                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")}>
                    <p className="label">&#x1F333; Treemester</p>
                </Link>

            </div>
            <div className="links">
                <Link to={toggleCurrentLink("about", "/tinf22b6-treemester/about")} onClick={() => toggleCurrent("about")} className={classNameAbout}>
                    <span>About</span>
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
                                <>Upload Sprintline</>
                            </ReactFileReader>
                        </li>

                        <li onClick={handleFloatingToolbarToggle}>
                            Show ToolBar
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
                    </ul>
                </Link>
            </div>
        </nav>
              
        {showFloatingToolbar && (
        <div
          className={`floating-toolbar-overlay${isLocked ? " locked" : ""}`}
          onMouseDown={handleMouseDown}
          style={{ top: toolbarPosition.top, left: toolbarPosition.left }}
        >
          <div className="floating-toolbar">
            <span className="toolbar-close" onClick={handleCloseToolbar}>
                Close                
            </span>
            <br/>
            <div>                
            {!isLocked && (
              <span className="toolbar-lock" onClick={() => setIsLocked(true)}>
                Lock 
              </span>
            )}
            {isLocked && (
              <span className="toolbar-unlock" onClick={() => setIsLocked(false)}>
                Unlock
              </span>
            )}
            </div>

            <ToolBar createCircle={handleToolbarCreateCircle} onClose={handleCloseToolbar} />
          
          </div>
        </div>
        )}
    </>
   ); 
}

export default Navigation;

