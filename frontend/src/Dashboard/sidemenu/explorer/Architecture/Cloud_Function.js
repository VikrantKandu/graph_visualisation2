import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../CSS/Graph.css';
import lbImage from '../../../pic/lb.png'; // Image path
import GraphAnimation from './GraphAnimation';

const Cloud_Function = () => {
  const [nodeSize, setNodeSize] = useState(20);
  const [linkStrength, setLinkStrength] = useState(-100);
  const svgRef = useRef();
  const [graphData, setGraphData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [selectedVersions, setSelectedVersions] = useState([]);

  const versionOptions = ['Version 1', 'Version 2', 'Version 3', 'Version 4'];

  // Fetch graph data from API
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cloud_function');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setGraphData(data);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };
    fetchGraphData();
  }, []);

  const handleAnimationClick = () => {
    if (resultData) {
      setAnimationData(resultData); // Set result data to animationData to trigger GraphAnimation
    }
  };

  const handleCheckboxChange = (version) => {
    setSelectedVersions((prevSelected) => {
      const newSelected = prevSelected.includes(version)
        ? prevSelected.filter((v) => v !== version) // Remove version if already selected
        : [...prevSelected, version]; // Add version if not selected

      updateVisualization(newSelected);
      return newSelected;
    });
  };

  const filterGraphData = (data, selectedVersions) => {
    if (selectedVersions.length === 0) return data; // No versions selected, return all data

    const selectedVersionNumbers = selectedVersions.map(v => parseInt(v.split(' ')[1]));
    const maxSelectedVersion = Math.max(...selectedVersionNumbers);
    const minSelectedVersion = Math.min(...selectedVersionNumbers);

    const filteredNodes = data.nodes.filter(node => node.version <= maxSelectedVersion);
    const filteredNodeIds = new Set(filteredNodes.map(node => node.id));
    const filteredLinks = data.links.filter(link => filteredNodeIds.has(link.source.id) && filteredNodeIds.has(link.target.id));

    // Add positive/negative sign for higher/lower version
    filteredNodes.forEach(node => {
      if (node.version === maxSelectedVersion) {
        node.sign = '+';
      } else if (node.version < maxSelectedVersion) {
        node.sign = '-';
      } else {
        node.sign = '';
      }
    });

    return { nodes: filteredNodes, links: filteredLinks };
  };

  const updateVisualization = (versions) => {
    if (!graphData) return;

    const filteredData = filterGraphData(graphData, versions);
    const svgElement = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clean up previous SVG content
    svgElement.selectAll("*").remove();

    const svg = svgElement
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom().on("zoom", (event) => svg.attr("transform", event.transform)))
      .append("g");

    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(linkStrength))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const handleNodeClick = async (nodeData) => {
      setSelectedNode(nodeData);
      setIsModalOpen(true);
      try {
        const response = await fetch('http://localhost:8000/api/send-node-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nodeData),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setResultData(result);
      } catch (error) {
        console.error('Error sending node data:', error);
      }
    };

    const drag = (simulation) => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    };

    const link = svg.selectAll("line")
      .data(filteredData.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1);

    const node = svg.selectAll("g")
      .data(filteredData.nodes)
      .join("g")
      .on("click", (event, d) => handleNodeClick(d))
      .call(drag(simulation));

    node.selectAll("circle").data(d => [d])
      .join("circle")
      .attr("r", nodeSize)
      .attr("fill", d => selectedVersions.includes(`Version ${d.version}`) ? "orange" : "skyblue");

    node.selectAll("image").data(d => [d])
      .join("image")
      .attr("xlink:href", lbImage)
      .attr("width", nodeSize * 2.5)
      .attr("height", nodeSize * 2.5)
      .attr("x", -nodeSize * 1.25)
      .attr("y", -nodeSize * 1.25)
      .attr("clip-path", "url(#clip-circle)");

    // Display sign for higher/lower versions
    node.selectAll("text").data(d => [d])
      .join("text")
      .text(d => d.label + (d.sign ? ` (${d.sign})` : ''))
      .attr('x', 0)
      .attr('y', nodeSize + 12)
      .attr('text-anchor', 'middle');

    simulation.nodes(filteredData.nodes).on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    simulation.force("link").links(filteredData.links);
    simulation.alpha(1).restart();
  };

  useEffect(() => {
    updateVisualization(selectedVersions);
  }, [graphData, nodeSize, linkStrength, selectedVersions]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };

  return (
    <div className="graph-container">
      <div id="graph-frame">
        <svg id="svg_graph" ref={svgRef}></svg>
      </div>

      <div id="text-info">Adjustable Node Sizes and Link Strengths</div>

      {/* Checkboxes for selecting versions */}
      <div style={{ margin: '10px' }}>
        {versionOptions.map((version) => (
          <label key={version} style={{ margin: '5px', padding: '5px 10px' }}>
            <input
              type="checkbox"
              checked={selectedVersions.includes(version)}
              onChange={() => handleCheckboxChange(version)}
            />
            {version}
          </label>
        ))}
      </div>

      {isModalOpen && selectedNode && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2 className="modal-title">Node Details</h2>
            <div className="modal-details">
              <p><strong>ID:</strong> {selectedNode.id}</p>
              <p><strong>Label:</strong> {selectedNode.label}</p>
              <button onClick={handleAnimationClick}>Show Animation</button>
            </div>
          </div>
        </div>
      )}

      {animationData && <GraphAnimation pathData={animationData} />}
    </div>
  );
};

export default Cloud_Function;
