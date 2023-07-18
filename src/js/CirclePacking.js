import * as d3 from 'd3';
import React, { useEffect } from 'react';

function CirclePacking(props) {
    const data = props.data;

    useEffect(() => {
        const draw = () => {
            let svg = d3.select('svg');
            svg.selectAll('*').remove();

            let g = svg.append('g');
            g.attr("class", "svgRoot")

            let packingLayout = d3.pack()
                .radius(d => {
                    if (d.children) {
                        // Kleinster Kreis in den alle Children-Kreise reinpassen
                        return d3.packEnclose(d.children).r;
                    } else {
                        return d.data.radius;
                    }
                });
            var root = d3.hierarchy(data, d => d.children);
            packingLayout(root);

            let focus = root;
            let focus0 = null;

            var maxDepth = d3.max(root.descendants(), function (d) { return +d.depth });

            // Farbverlauf der Kreise von aussen nach innen
            const color = d3.scaleSequential([maxDepth, 0], d3.interpolate('#b9f0e2', '#3b77a8'));
            // Kreise zu allen Nodes hinzufuegen
            const node = g.selectAll('node')
                .data(root.descendants())
                .enter()
                .append('circle')
                .attr('r', d => d.r)
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
                .attr('id', (d, i) => i)
                .style('fill', d => d.children ? color(d.depth) : 'white')
                .on('dblclick', (event, d) => {
                    let v = d.children ? d : d.parent;
                    if (focus !== v) {
                        zoom(event, v);
                        event.stopImmediatePropagation();
                    } else if (v !== root) {
                        zoom(event, root);
                        event.stopImmediatePropagation();
                    }
                })
                .on('click', function (d, i) {
                    var self = this;
                    if (!this.clickTimeout) {
                        this.clickTimeout = setTimeout(function () {
                            if (self.isSelected) {
                                d3.select(self).attr("stroke", "none");
                                self.isSelected = false;
                            } else {
                                d3.select(self).attr("stroke", "#000");
                                self.isSelected = true;
                            }
                            self.clickTimeout = null;
                        }, 200);
                    } else {
                        clearTimeout(this.clickTimeout);
                        this.clickTimeout = null;
                    }
                });

            // Texte zu allen Nodes hinzufuegen
            const label = g.selectAll('label')
                .data(root.descendants())
                .enter()
                .append('text')
                .attr('x', d => d.x)
                .attr('y', d => d.y)
                .style('text-anchor', 'middle')
                .style('background-color', d => d === focus ? 'white' : 'none')
                .style('border', d => d === focus ? '1px solid black' : 'none')
                .style('fill-opacity', d => d.parent === focus || d === focus ? 1 : 0)
                .style('display', d => d.parent === focus || d === focus ? 'inline' : 'none')
                .style('font-size', d => d === focus ? '22px' : '13px')
                .style('font-weight', d => d === focus ? '700' : '200')
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

            function zoom(event, d) {
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

                label.filter(function (d) { return d.parent === focus || d === focus || this.style.display === 'inline' })
                    .transition(transition)
                    .style('fill-opacity', d => d.parent === focus || d === focus ? 1 : 0)
                    .style('font-size', d => d === focus ? '22px' : '13px')
                    .style('font-weight', d => d === focus ? '700' : '200')
                    .on('start', function (d) { if (d.parent === focus || d === focus) this.style.display = 'inline' })
                    .on('end', function (d) { if (d.parent !== focus && d !== focus) this.style.display = 'none' });
            }

        }

        draw();
    }, [data]);

    return (
        <svg height="100%" width="100%" ></svg>
    );
}

export default CirclePacking;
