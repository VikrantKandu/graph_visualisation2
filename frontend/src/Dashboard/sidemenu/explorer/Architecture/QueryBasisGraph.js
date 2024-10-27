// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import './QueryBasisGraph.css';

// const QueryBasisGraph = () => {
//   const [query, setQuery] = useState(''); // State to store the Cypher query
//   const [graphData, setGraphData] = useState({ nodes: [], links: [] }); // State to store graph data (nodes and links)
//   const svgRef = useRef(); // Ref for D3.js to manipulate the SVG

//   // Handle form submission to send query to Neo4j API
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8000/api/runquery', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//       });

//       const data = await response.json();
//       console.log('Received data:', data);

//       const nodes = new Map(); // Map to keep track of unique nodes
//       const links = [];

//       data.forEach((record) => {
//         const { start, end } = record.p;

//         // Handle start node
//         const startNodeId = start.identity.low;
//         if (!nodes.has(startNodeId)) {
//           nodes.set(startNodeId, {
//             id: startNodeId,
//             label: start.labels[0],
//             properties: start.properties,
//           });
//         }

//         // Handle end node
//         const endNodeId = end.identity.low;
//         if (!nodes.has(endNodeId)) {
//           nodes.set(endNodeId, {
//             id: endNodeId,
//             label: end.labels[0],
//             properties: end.properties,
//           });
//         }

//         // Handle relationships
//         record.p.segments.forEach((segment) => {
//           const relationship = segment.relationship;
//           links.push({
//             source: relationship.start.low,
//             target: relationship.end.low,
//             label: relationship.type,
//             properties: relationship.properties,
//           });
//         });
//       });

//       setGraphData({ nodes: Array.from(nodes.values()), links });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // D3.js effect to create the graph visualization
//   useEffect(() => {
//     if (!graphData.nodes.length) return; // Don't draw if no data

//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove(); // Clear previous graph

//     const width = window.innerWidth; // Full screen width
//     const height = window.innerHeight; // Full screen height

//     const color = d3.scaleOrdinal(d3.schemeCategory10); // Color scale for nodes

//     const simulation = d3.forceSimulation(graphData.nodes)
//       .force('link', d3.forceLink(graphData.links).id((d) => d.id).distance(150))
//       .force('charge', d3.forceManyBody().strength(-300))
//       .force('center', d3.forceCenter(width / 2, height / 2));

//     // Draw links (relationships)
//     const link = svg.append('g')
//       .selectAll('line')
//       .data(graphData.links)
//       .enter()
//       .append('line')
//       .attr('stroke', '#999')
//       .attr('stroke-width', 2);

//     // Draw nodes with color based on label
//     const node = svg.append('g')
//       .selectAll('circle')
//       .data(graphData.nodes)
//       .enter()
//       .append('circle')
//       .attr('r', 15)
//       .attr('fill', (d) => color(d.label))
//       .call(d3.drag()
//         .on('start', dragstarted)
//         .on('drag', dragged)
//         .on('end', dragended));

//     // Add labels to nodes
//     const nodeLabels = svg.append('g')
//       .selectAll('text')
//       .data(graphData.nodes)
//       .enter()
//       .append('text')
//       .attr('dy', -3)
//       .attr('text-anchor', 'middle')
//       .text((d) => d.label);

//     // Add relationship labels
//     const linkLabels = svg.append('g')
//       .selectAll('text')
//       .data(graphData.links)
//       .enter()
//       .append('text')
//       .attr('class', 'link-label')
//       .attr('text-anchor', 'middle')
//       .attr('fill', 'red')
//       .attr('font-size', '12px')
//       .text((d) => d.label);

//     // Define the tick function
//     simulation
//       .nodes(graphData.nodes)
//       .on('tick', () => {
//         link
//           .attr('x1', (d) => d.source.x || 0) // Default to 0 if NaN
//           .attr('y1', (d) => d.source.y || 0)
//           .attr('x2', (d) => d.target.x || 0)
//           .attr('y2', (d) => d.target.y || 0);

//         node
//           .attr('cx', (d) => d.x || 0)
//           .attr('cy', (d) => d.y || 0);

//         nodeLabels
//           .attr('x', (d) => (d.x || 0) + 20) // Offset slightly for clarity
//           .attr('y', (d) => (d.y || 0));

//         linkLabels
//           .attr('x', (d) => (d.source.x + d.target.x) / 2 || 0)
//           .attr('y', (d) => (d.source.y + d.target.y) / 2 || 0);
//       });

//     // Drag functions
//     function dragstarted(event, d) {
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     }

//     function dragged(event, d) {
//       d.fx = event.x;
//       d.fy = event.y;
//     }

//     function dragended(event, d) {
//       if (!event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     }

//     // Log nodes and links for debugging
//     console.log('Nodes:', graphData.nodes);
//     console.log('Links:', graphData.links);

//   }, [graphData]);

//   return (
//     <div>
//       <h1>Neo4j Query Graph Visualization</h1>

//       {/* Input form for Cypher query */}
//       <form onSubmit={handleSubmit} style={{ position: 'absolute', zIndex: 10 }}>
//         <textarea
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           rows="4"
//           cols="100"
//           placeholder="Write your Cypher query here"
//         ></textarea>
//         <br />
//         <button type="submit">Run Query</button>
//       </form>

//       {/* SVG container for D3.js graph */}
//       <svg ref={svgRef} width="100%" height="200%" style={{ backgroundColor: 'red' }}></svg>
//     </div>
//   );
// };

// export default QueryBasisGraph;


import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './QueryBasisGraph.css';

const QueryBasisGraph = () => {
  const [query, setQuery] = useState(''); // State to store the Cypher query
  const [graphData, setGraphData] = useState({ nodes: [], links: [] }); // State to store graph data (nodes and links)
  const svgRef = useRef(); // Ref for D3.js to manipulate the SVG
  console.log(query);
  // Handle form submission to send query to Neo4j API
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/api/runquery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
  
      const data = await response.json();
      console.log('Received data:', data);
  
      const nodes = new Map(); // Map to keep track of unique nodes
      const links = [];
  
      data.forEach((record) => {
        // Handle nodes (`n`)
        if (record.n) {
          const nodeId = record.n.identity.low;
          if (!nodes.has(nodeId)) {
            nodes.set(nodeId, {
              id: nodeId,
              label: record.n.labels[0],
              properties: record.n.properties,
            });
          }
        }
  
        // Handle paths (`p`)
        if (record.p) {
          const { start, end } = record.p;
  
          // Handle start node
          const startNodeId = start.identity.low;
          if (!nodes.has(startNodeId)) {
            nodes.set(startNodeId, {
              id: startNodeId,
              label: start.labels[0],
              properties: start.properties,
            });
          }
  
          // Handle end node
          const endNodeId = end.identity.low;
          if (!nodes.has(endNodeId)) {
            nodes.set(endNodeId, {
              id: endNodeId,
              label: end.labels[0],
              properties: end.properties,
            });
          }
  
          // Handle relationships
          record.p.segments.forEach((segment) => {
            const relationship = segment.relationship;
            links.push({
              source: relationship.start.low,
              target: relationship.end.low,
              label: relationship.type,
              properties: relationship.properties,
            });
          });
        } else {
          console.warn('Skipping record due to missing path (p)', record);
        }
      });
  
      setGraphData({ nodes: Array.from(nodes.values()), links });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  // D3.js effect to create the graph visualization
  useEffect(() => {
    if (!graphData.nodes.length) return; // Don't draw if no data

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous graph

    const width = 400; // Fixed width
    const height = 400; // Fixed height

    const color = d3.scaleOrdinal(d3.schemeCategory10); // Color scale for nodes

    const simulation = d3.forceSimulation(graphData.nodes)
      .force('link', d3.forceLink(graphData.links).id((d) => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Draw links (relationships)
    const link = svg.append('g')
      .selectAll('line')
      .data(graphData.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    // Draw nodes with color based on label
    const node = svg.append('g')
      .selectAll('circle')
      .data(graphData.nodes)
      .enter()
      .append('circle')
      .attr('r', 15)
      .attr('fill', (d) => color(d.label))
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add labels to nodes
    const nodeLabels = svg.append('g')
      .selectAll('text')
      .data(graphData.nodes)
      .enter()
      .append('text')
      .attr('dy', -3)
      .attr('text-anchor', 'middle')
      .text((d) => d.properties.name || ''); // Corrected access

    // Add relationship labels
    const linkLabels = svg.append('g')
      .selectAll('text')
      .data(graphData.links)
      .enter()
      .append('text')
      .attr('class', 'link-label')
      .attr('text-anchor', 'middle')
      .attr('fill', 'red')
      .attr('font-size', '12px')
      .text((d) => d.label);

    // Define the tick function
    simulation
      .nodes(graphData.nodes)
      .on('tick', () => {
        link
          .attr('x1', (d) => d.source.x || 0) // Default to 0 if NaN
          .attr('y1', (d) => d.source.y || 0)
          .attr('x2', (d) => d.target.x || 0)
          .attr('y2', (d) => d.target.y || 0);

        node
          .attr('cx', (d) => d.x || 0)
          .attr('cy', (d) => d.y || 0);

        nodeLabels
          .attr('x', (d) => (d.x || 0) + 20) // Offset slightly for clarity
          .attr('y', (d) => (d.y || 0));

        linkLabels
          .attr('x', (d) => (d.source.x + d.target.x) / 2 || 0)
          .attr('y', (d) => (d.source.y + d.target.y) / 2 || 0);
      });

    // Drag functions
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

    // Log nodes and links for debugging
    console.log('Nodes:', graphData.nodes);
    console.log('Links:', graphData.links);

  }, [graphData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Neo4j Query Graph Visualization</h1>

      {/* Input form for Cypher query */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Write your Cypher query here"
        ></textarea>
        <br />
        <button type="submit">Run Query</button>
      </form>

      {/* SVG container for D3.js graph */}
      <svg ref={svgRef} width={400} height={400}></svg>
      {/* style={{ backgroundColor: 'red' }} */}
    </div>
  );
};

export default QueryBasisGraph;
 


// QueryBasisGraph.js



// import React, { useState, useEffect, useRef } from 'react';
// import * as d3 from 'd3';
// import axios from 'axios';
// import './QueryBasisGraph.css';

// const CombinedGraph = () => {
//   const [query, setQuery] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [apiData, setApiData] = useState(null);
//   const [graphData, setGraphData] = useState({ nodes: [], links: [] });
//   const svgRef = useRef();

//   // Fetch AI data based on the search term
//   const callAIApi = async () => {
//     try {
//       const response = await axios.post('http://localhost:8000/api/llm', {
//         prompt: searchTerm,
//       });
//       setApiData(response.data.content); // Store the AI response
//       console.log('AI Response:', response.data.content);

//       // Automatically run the query based on AI response
//       const effectiveQuery = `MATCH (n) WHERE n.name = '${response.data.content.name}' RETURN n`;
//       await runGraphQuery(effectiveQuery);
//     } catch (error) {
//       console.error('Error fetching AI data:', error);
//     }
//   };

//   // Run the graph query
//   const runGraphQuery = async (effectiveQuery) => {
//     try {
//       const response = await fetch('http://localhost:8000/api/runquery', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: effectiveQuery }),
//       });

//       const data = await response.json();
//       console.log('Received data:', data);

//       const nodes = new Map();
//       const links = [];

//       data.forEach((record) => {
//         if (record.n) {
//           const nodeId = record.n.identity.low;
//           if (!nodes.has(nodeId)) {
//             nodes.set(nodeId, {
//               id: nodeId,
//               label: record.n.labels[0],
//               properties: record.n.properties,
//             });
//           }
//         }

//         if (record.p) {
//           record.p.segments.forEach((segment) => {
//             const relationship = segment.relationship;
//             links.push({
//               source: relationship.start.low,
//               target: relationship.end.low,
//               label: relationship.type,
//             });
//           });
//         }
//       });

//       setGraphData({ nodes: Array.from(nodes.values()), links });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   // D3.js effect to create the graph visualization
//   useEffect(() => {
//     if (!graphData.nodes.length) return;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll('*').remove(); // Clear previous graph

//     const width = 400;
//     const height = 400;
//     const color = d3.scaleOrdinal(d3.schemeCategory10);

//     const simulation = d3.forceSimulation(graphData.nodes)
//       .force('link', d3.forceLink(graphData.links).id((d) => d.id).distance(150))
//       .force('charge', d3.forceManyBody().strength(-300))
//       .force('center', d3.forceCenter(width / 2, height / 2));

//     const link = svg.append('g')
//       .selectAll('line')
//       .data(graphData.links)
//       .enter()
//       .append('line')
//       .attr('stroke', '#999')
//       .attr('stroke-width', 2);

//     const node = svg.append('g')
//       .selectAll('circle')
//       .data(graphData.nodes)
//       .enter()
//       .append('circle')
//       .attr('r', 15)
//       .attr('fill', (d) => color(d.label))
//       .call(d3.drag()
//         .on('start', dragstarted)
//         .on('drag', dragged)
//         .on('end', dragended));

//     simulation
//       .nodes(graphData.nodes)
//       .on('tick', () => {
//         link
//           .attr('x1', (d) => d.source.x)
//           .attr('y1', (d) => d.source.y)
//           .attr('x2', (d) => d.target.x)
//           .attr('y2', (d) => d.target.y);

//         node
//           .attr('cx', (d) => d.x)
//           .attr('cy', (d) => d.y);
//       });

//     function dragstarted(event, d) {
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     }

//     function dragged(event, d) {
//       d.fx = event.x;
//       d.fy = event.y;
//     }

//     function dragended(event, d) {
//       if (!event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     }
//   }, [graphData]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <h1>Combined AI and Graph Visualization</h1>

//       <input
//         type="text"
//         placeholder="Enter search term..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={callAIApi}>Get AI Data</button>

//       <form onSubmit={(e) => { e.preventDefault(); runGraphQuery(query); }}>
//         <textarea
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           rows="4"
//           cols="50"
//           placeholder="Write your Cypher query here"
//         ></textarea>
//         <br />
//         <button type="submit">Run Query</button>
//       </form>

//       <svg ref={svgRef} width={400} height={400}></svg>
//     </div>
//   );
// };

// export default CombinedGraph;
