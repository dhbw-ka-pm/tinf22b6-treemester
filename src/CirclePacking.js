import * as d3 from 'd3';
import React, { useEffect } from 'react';

function CirclePackaging(props) {
    const data = props.data;

    useEffect(() => {
        const draw = () => {
            let svg = d3.select('svg');
            svg.selectAll('*').remove();
    
            let g = svg.append('g');
    
            let packingLayout = d3.pack()
            .radius(d => {
                if (d.children) {
                    // Kleinster Kreis in den alle Children-Kreise reinpassen
                    return d3.packEnclose(d.children).r;
                } else {
                    return d.data.value;
                }
            });
            var root = d3.hierarchy(data, d => d.children);
            packingLayout(root);
    
            let focus = root;
            let focus0 = null;
    
            var maxDepth = d3.max(root.descendants(), function(d) { return +d.depth });
    
            // Farbverlauf der Kreise von außen nach innen
            const color = d3.scaleSequential([maxDepth,0], d3.interpolate('#b9f0e2', '#3b77a8'));
    
            // Kreise zu allen Nodes hinzufügen
            const node = g.selectAll('node')
                .data(root.descendants())
                .enter()
                .append('circle')
                .attr('r', d => d.r)
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
                .style('fill', d => d.children ? color(d.depth) : 'white')
                .on('click', (event, d) => {
                    let v = d.children ? d : d.parent;
                    if (focus !== v) {
                        zoom(event, v);
                        event.stopImmediatePropagation();
                    } else if (v !== root) {
                        zoom(event, root);
                        event.stopImmediatePropagation();
                    }
                });
    
            // Texte zu allen Nodes hinzufügen
            const label = g.selectAll('node')
            .data(root.descendants())
            .enter()
            .append('text')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .style('text-anchor', 'middle')
            .style('fill-opacity', d => d.parent === focus || d === focus ? 1 : 0)
            .style('display', d => d.parent === focus || d === focus ? 'inline' : 'none')
            .style('font-size', d => d === focus ? '18px' : '12px')
            .style('font-weight', d => d === focus ? '600' : '200')
            .text(d => d.data.name);
    
            let width = d3.select('svg').node().getBBox().width;
            let headerOffset = 150;
    
            zoomTo([root.x, root.y, root.r * 2], headerOffset, 0);
    
            function zoomTo(v, textIn, textOut) {            
                const k = width / v[2];
    
                node
                .attr('cx', d => (d.x - v[0]) * k)
                .attr('cy', d => (d.y - v[1]) * k)
                .attr('r', d => d.r * k);
    
                label
                .attr('x', d => (d.x - v[0]) * k)
                .attr('y', d => {
                    let a = null;
                    if (d === focus) {
                        a = textIn;
                    } else if (d === focus0) {
                        a = textOut;
                    } else {
                        a = 0;
                    }
                    return (d.y - v[1]) * k - a
                });
            }
    
            function zoom(event, d){
                focus0 = focus;
                focus = d;
    
                //Zoom Effekt
                const transition = svg.transition()
                .duration(750)
                .tween('zoom', () => {
                    const i = d3.interpolateZoom([focus0.x, focus0.y, focus0.r * 2], [focus.x, focus.y, focus.r * 2]);
                    let textIn = d3.interpolate(0, headerOffset);
                    let textOut = d3.interpolate(headerOffset, 0);
                    return t => zoomTo(i(t), textIn(t), textOut(t));
                });
    
                packingLayout(root);
    
                label.filter(function(d) { return d.parent === focus || d === focus || this.style.display === 'inline' })
                .transition(transition)
                .style('fill-opacity', d => d.parent === focus || d === focus ? 1 : 0)
                .style('font-size', d => d === focus ? '18px' : '12px')
                .style('font-weight', d => d === focus ? '600' : '200')
                .on('start', function(d) { if (d.parent === focus || d === focus) this.style.display = 'inline' })
                .on('end', function(d) { if (d.parent !== focus && d !== focus) this.style.display = 'none' });
            }
        }

        draw();
    }, [data]);

    return (
        <svg height="100%" width="100%"></svg>
    );
}

export default CirclePackaging;
