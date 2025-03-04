import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { exampleMapAtom, exampleSearch, SearchResult } from './atoms';

const ScatterPlot: React.FC = () => {
  const exampleSearchResults = useRecoilValue(exampleSearch);
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
    const packageNames = exampleSearchResults.response.results
      .slice(0, 5)
      .flatMap((result: SearchResult) => result.package);

    chartGroup
      .selectAll('.dot')
      .data(exampleMap.data)
      .enter()
      .append('a')
      .attr('href', (d) => d.website || d.source)
      .attr('target', '_blank')
      .append('circle')
      .attr('cx', (d) => xScale(d.coord1) - 250)
      .attr('cy', (d) => yScale(d.coord2) - 250)
      .attr('id', (d) => d.package)
      .attr('r', 5)
      // .attr('fill', (d) => (packageNames.includes(d.package) ? 'red' : 'blue'))
      .attr('class', (d) =>
        packageNames.includes(d.package) ? 'fill-selected' : 'fill-unselected'
      )
      .on('mouseover', (event, d) => {
        const logoHtml = d.logo
          ? `<img src="${d.logo}" alt="${d.package} logo" style="width: auto; height: 150px; margin-right: 5px;">`
          : '';

        tooltip
          .style('opacity', 1)
          .html(`${logoHtml}Package: ${d.package}`)
          .style('left', `${event.pageX + 5}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    const handleCustomEvent = (event: CustomEvent) => {
      const { title } = event.detail;
      const selectedGroup = d3.select(`#${title}`) as d3.Selection<
        SVGCircleElement,
        unknown,
        // eslint-disable-next-line
        any,
        unknown
      >;
      if (!selectedGroup.empty()) {
        const d = selectedGroup.datum() as {
          logo?: string;
          package: string;
          coord1: number;
          coord2: number;
        };
        console.log(d);
        const logoHtml = d.logo
          ? `<img src="${d.logo}" alt="${d.package} logo" style="width: auto; height: 150px; margin-right: 5px;">`
          : '';

        // Get the bounding box of the selected item
        const bbox = (
          selectedGroup.node() as SVGGraphicsElement
        ).getBoundingClientRect();
        console.log(bbox);
        tooltip
          .style('opacity', 1)
          .html(`${logoHtml}Package: ${d.package}`)
          .style('left', `${bbox.left + window.scrollX + bbox.width / 2 + 5}px`)
          .style('top', `${bbox.top + window.scrollY - 28}px`);
      }
    };

    document.addEventListener(
      'onResultHover',
      handleCustomEvent as EventListener
    );
    // Trigger the custom event for demonstration purposes
    chartGroup.selectAll('circle').each(function (d) {
      const event = new CustomEvent('onResultHover', { detail: d });
      console.log(d);
      document.dispatchEvent(event);
    });

    return () => {
      document.removeEventListener(
        'onResultHover',
        handleCustomEvent as EventListener
      );
    };
  });

  return <svg ref={svgRef}></svg>;
};

export default ScatterPlot;
