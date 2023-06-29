import React from 'react';

function About() {
    return (
        <>
            <div className="description">
                <h3>Circle Packing Model</h3>
                <p>Circle Packing is a modified version of a treemap where circles are used instead of rectangles.
                    
                    The circles symbolize different levels in the hierarchy with each branch of the tree represented by a circle and its sub-branches shown as circles contained within it.
                    
                    Additionally, the size of each circle can be utilized to convey an extra value, such as quantity or file size. Furthermore, color can be employed to assign categories or represent another variable by using different shades.
                 </p>
            </div>
        </>
    );
}

export default About;
