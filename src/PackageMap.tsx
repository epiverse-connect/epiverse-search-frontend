import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { exampleMapAtom, exampleSearch, SearchResult } from './atoms';

const ScatterPlot: React.FC = () => {
  const exampleSearchResults = useRecoilValue(exampleSearch);
  console.log(exampleSearchResults);
  const exampleMap = useRecoilValue(exampleMapAtom);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '500px')
      .attr('viewBox', '0 0 500 500')
      .style('display', 'block')
      .style('margin', '0 auto');

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('background', '#f9f9f9')
      .style('padding', '5px 10px')
      .style('border', '1px solid #d3d3d3')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    const xScale = d3.scaleLinear().domain([-1.7, 2.6]).range([0, 500]);
    const yScale = d3.scaleLinear().domain([-1.35, 1.45]).range([500, 0]);

    const chartGroup = svg.append('g').attr('transform', 'translate(250, 250)');

    // Extract package names from exampleSearchResults.response.results
    const packageNames = exampleSearchResults.response.results.map(
      (result: SearchResult) => result.package
    );

    chartGroup
      .selectAll('.dot')
      .data(exampleMap.data)
      .enter()
      .append('a')
      .attr('href', (d) => d.website)
      .attr('target', '_blank')
      .append('circle')
      .attr('cx', (d) => xScale(d.coord1) - 250)
      .attr('cy', (d) => yScale(d.coord2) - 250)
      .attr('r', 5)
      .attr('fill', (d) => (packageNames.includes(d.package) ? 'red' : 'blue'))
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`Package: ${d.package}<br>x: ${d.coord1}, y: ${d.coord2}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
  });

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
