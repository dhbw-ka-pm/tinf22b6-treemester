import React from 'react';
import { useState } from 'react';
import '../css/About.css';

function About() {
    const [showParagraphs, setShowParagraphs] = useState([]);

    const toggleParagraph = (index) => {
        if (showParagraphs.includes(index)) {
            setShowParagraphs(showParagraphs.filter((item) => item !== index));
        } else {
            setShowParagraphs([...showParagraphs, index]);
        }
    };

    return (
        <>
            <div className="faq">
                <h1 >Treemester</h1>
                <hr></hr>
                <h3 onClick={() => toggleParagraph(0)}>What is Treemester?</h3>
                {showParagraphs.includes(0) ? (
                    <p className="show">
                        Treemester is a software for students and other people, who are struggling with learning and are in need
                        of better topical guidance. We differ from other software by creating a product that establishes a fun and
                        easy learning experience with an appealing and professional design at the same time!
                    </p>
                ) : (
                    <p>
                        Treemester is a software for students and other people, who are struggling with learning and are in need
                        of better topical guidance. We differ from other software by creating a product that establishes a fun and
                        easy learning experience with an appealing and professional design at the same time!
                    </p>
                )}
                <hr></hr>
                <h3 onClick={() => toggleParagraph(1)}>How to edit your first Mindmap</h3>
                {showParagraphs.includes(1) ? (
                    <p className="show">
                        Create a new Mindmap, click on a circle and use the tool bar to edit new subcircles!
                    </p>
                ) : (
                    <p>Create a new Mindmap, click on a circle and use the tool bar to edit new subcircles!</p>
                )}
                <hr></hr>
                <h3 onClick={() => toggleParagraph(2)}>What is a SprintLine?</h3>
                {showParagraphs.includes(2) ? (
                    <p className="show">
                        A Sprintline is your personal roadmap! Choose a mindmap, select the topics you want to learn and create
                        your own learning journey. You can designate the required To-Do's for each subtopic and thus, check your
                        current learning state!
                    </p>
                ) : (
                    <p>
                        A Sprintline is your personal roadmap! Choose a mindmap, select the topics you want to learn and create
                        your own learning journey. You can designate the required To-Do's for each subtopic and thus, check your
                        current learning state!
                    </p>
                )}
                <hr></hr>
                <h3 onClick={() => toggleParagraph(3)}>Can I save my Mindmaps and SprintLines?</h3>
                {showParagraphs.includes(3) ? (
                    <p className="show">
                        Yes, you can save both of them and you are also able to upload them for further editing!
                    </p>
                ) : (
                    <p>
                        Yes, you can save both of them and you are also able to upload them for further editing!
                    </p>
                )}
                <hr></hr>
            </div>
        </>
    );
}

export default About;
