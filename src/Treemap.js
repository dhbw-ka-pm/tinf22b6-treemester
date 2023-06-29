import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function Treemap(params) {
    const ref = useRef();
    var data = params.data;

    useEffect(() => {
        const svg = d3.select(ref.current)
            .style('border', 'none');
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();

        const treeLayout = d3.tree()
            .separation((a, b) => {
                    return (a.parent == b.parent ?
                        (
                            a.data.name.length * 5 > a.data.value ?
                                a.data.name.length / 10
                                : a.data.value / 10
                        )
                        : (
                            b.data.name.length * 5 > b.data.value ?
                                b.data.name.length / 5
                                : b.data.value / 5
                        )
                    ) + (1 / 5);
            })
            .nodeSize([80, 120]);
        var root = d3.hierarchy(data, d => d.children);
        treeLayout(root);


        var g = svg.append('g');

        g.selectAll('.link')
            .data(root.descendants().slice(1))
            .enter()
            .append('line')
            .attr('class', 'link')
            .style('stroke', 'grey')
            .style('fill', 'none')
            .attr('x1', function (d) { return d.parent ? d.x : null })
            .attr('y1', function (d) { return d.parent ? d.y : null })
            .attr('x2', function (d) { return d.parent ? d.parent.x : null })
            .attr('y2', function (d) { return d.parent ? d.parent.y : null });

        g.selectAll('node')
            .data(root.descendants())
            .enter()
            .append('circle')
            .attr('r', d => d.data.value)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .style('stroke', 'black')
            .style('fill', 'white')
            .on('click', (_, d) => {
                var text = document.getElementById('newNodeText').value;
                var childNode = {
                    'name': text,
                    'value': 10,
                }
                if (!d.data.children) {
                    d.data.children = [];
                }
                d.data.children.push(childNode);
                draw();
            });

        g.selectAll('.node')
            .data(root.descendants())
            .enter()
            .append('text')
            .attr('x', d => d.x)
            .attr('y', d => d.y + d.data.value + 15)
            .style('text-anchor', 'middle')
            .text(d => d.data.name);
    }

    return (
        <>
            <div>
                <input type="text" id="newNodeText" placeholder="Node Name"></input>
                <p>Click on a node to add a child with the specified text</p>
            </div>
            <div className="chart">
                <svg ref={ref}></svg>
            </div>
        </>
    );
}

export default Treemap;
