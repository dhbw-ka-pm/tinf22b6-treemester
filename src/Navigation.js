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
    }

    return (
        <nav className="navigation">
            <div className="links">
                <Link to="/tinf22b6-treemester" onClick={() => setCurrent("circlePacking")}>
                    <p className="label">&#x1F333; Treemester</p>
                </Link>
                    <Link to="/tinf22b6-treemester/about" onClick={() => setCurrent("about")} className={classNameAbout}>
                        <span>About the Project</span>
                    </Link>
            </div>
        </nav>
    )
}

export default Navigation;