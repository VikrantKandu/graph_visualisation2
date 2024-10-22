import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Import images from the /pic folder
const importImages = (requireContext) => {
  const images = {};
  requireContext.keys().forEach((item) => {
    const imageName = item.replace('./', '').replace('.png', '');
    images[imageName] = requireContext(item);
  });
  return images;
};

// Import images using require.context
const images = importImages(require.context('../../../pic', false, /\.png$/));

// Default image path
const defaultImage = require('../../../pic/lb.png'); // Change to your default image path

const GraphAnimation = ({ pathData }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (pathData) {
      drawGraph(pathData);
    }
  }, [pathData]);

  const drawGraph = (pathData) => {
    const svg = d3.select(svgRef.current)
      .attr('width', 800)
      .attr('height', 600);

    svg.selectAll('*').remove(); // Clear previous SVG content

    const container = svg.append('g').attr('class', 'nodes-container');

    // Setup zoom
    // svg.call(d3.zoom()
    //   .scaleExtent([0.5, 5])
    //   .on('zoom', (event) => {
    //     container.attr('transform', event.transform);
    //   })
    // );

    const nodes = createNodes(pathData);
    drawNodes(container, nodes);
    drawLines(container, nodes);
    animateBall(nodes);
  };

  const createNodes = (pathData) => {
    const nodeSpacing = 150;
    return [
      { name: pathData.path.start.properties.name, x: 100, y: 300 },
      ...pathData.path.segments.map((segment, i) => ({
        name: segment.end.properties.name,
        x: 200 + i * nodeSpacing,
        y: 300 + (i % 2 === 0 ? -50 : 50),
      })),
    ];
  };

  const drawNodes = (container, nodes) => {
    const nodeGroups = container.selectAll('g.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeGroups.append('circle')
      .attr('r', 20) // Node radius
      .attr('fill', 'skyblue')
      .attr('stroke-width', 2);

    nodeGroups.append('clipPath')
      .attr('id', (d, i) => `clip-${i}`)
      .append('circle')
      .attr('r', 20); // Match circle radius

    // Add images inside the circle using the clipPath
    nodeGroups.append('image')
      .attr('xlink:href', d => {
        const imageName = d.name; // Use the node name to find the image
        return images[imageName] ? images[imageName] : defaultImage; // Use default image if not found
      })
      .attr('width', 40) // Adjust size as needed
      .attr('height', 40)
      .attr('x', -20) // Center the image
      .attr('y', -20) // Center the image inside the circle
      .attr('clip-path', (d, i) => `url(#clip-${i})`); // Use clipPath to clip the image
       
    nodeGroups.append('text')
      .text(d => d.name)
      .attr('x', 0)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('fill', 'black');
  };

  const drawLines = (container, nodes) => {
    const radius = 25; // Adjust radius to be slightly larger than the actual node radius

    // Define the arrow marker
    container.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10) // Adjust arrow position to avoid overlap
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5") // Shape of the arrow
      .attr("fill", "black");

    // Draw lines with arrows
    for (let i = 1; i < nodes.length; i++) {
      const startNode = nodes[i - 1];
      const endNode = nodes[i];

      // Calculate angle between start and end nodes
      const angle = Math.atan2(endNode.y - startNode.y, endNode.x - startNode.x);

      // Calculate the adjusted start and end points so the line doesn't touch the node
      const startX = startNode.x + radius * Math.cos(angle);
      const startY = startNode.y + radius * Math.sin(angle);
      const endX = endNode.x - radius * Math.cos(angle);
      const endY = endNode.y - radius * Math.sin(angle);

      container.append('line')
        .attr('x1', startX)
        .attr('y1', startY)
        .attr('x2', endX)
        .attr('y2', endY)
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrow)'); // Attach the arrow marker to the line
    }
  };

  const animateBall = (nodes) => {
    const line = d3.line().x(d => d.x).y(d => d.y);
    const lineData = nodes.map(node => ({ x: node.x, y: node.y }));

    const path = d3.select(svgRef.current)
      .append("path")
      .datum(lineData)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", "none"); // Hide the path stroke

    const ball = d3.select(svgRef.current)
      .append("circle")
      .attr("r", 5)
      .attr("fill", "red");

    ball.transition()
      .duration(5000)
      .attrTween("transform", translateAlong(path.node()));
  };

  const translateAlong = (path) => {
    const length = path.getTotalLength();
    return (d) => {
      return (t) => {
        const p = path.getPointAtLength(t * length);
        return `translate(${p.x}, ${p.y})`;
      };
    };
  };

  return <svg ref={svgRef}></svg>;
};

export default GraphAnimation;



