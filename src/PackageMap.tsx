// import React from 'react';
// import {} from 'd3';

// const PackageMap = () => {
//   return <div></div>;
// };

// export default PackageMap;

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  x: number;
  y: number;
}

interface ScatterPlotProps {
  data: DataPoint[];
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
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

    const xScale = d3.scaleLinear().domain([-1, 1]).range([0, 500]);
    const yScale = d3.scaleLinear().domain([-1, 1]).range([500, 0]);

    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('a')
      .attr('href', 'https://data.org')
      .attr('target', '_blank')
      .append('circle')
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('r', 5)
      .attr('fill', 'blue')
      .on('mouseover', (event, d) => {
        tooltip
          .style('opacity', 1)
          .html(`x: ${d.x}, y: ${d.y}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    svg
      .append('g')
      .attr('transform', 'translate(0, 250)')
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .remove();

    svg
      .append('g')
      .attr('transform', 'translate(250, 0)')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .remove();
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
