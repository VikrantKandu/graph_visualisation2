// import React, { useState, useEffect } from 'react';
// import '../../Style_css/SecurityGraph.css';

// function SecurityGraph() {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <div className="securitygraph">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         placeholder="Search..."
//       />
//     </div>
//   );
// }

// function CardComponent() {
//   return (
//     <div className="card">
//       <h3>This is a Card Component</h3>
//       <p>Here you can display details inside a card.</p>
//     </div>
//   );
// }

// function AnotherComponent() {
//   return (
//     <div className="another-component">
//       <h3>This is Another Component</h3>
//       <p>Different content goes here.</p>
//     </div>
//   );
// }

// function MainComponent() {
//   const [activeComponent, setActiveComponent] = useState('securityGraph'); // Default to SecurityGraph

//   useEffect(() => {
//     const currentPath = window.location.pathname;
//     if (currentPath === '/security-graph') {
//       setActiveComponent('securityGraph');
//     } else if (currentPath === '/card') {
//       setActiveComponent('card');
//     } else if (currentPath === '/another-component') {
//       setActiveComponent('another');
//     } else {
//       setActiveComponent(null);
//     }
//   }, []);

//   const handleClick = (component, path) => {
//     setActiveComponent(component);
//     window.history.pushState({}, '', path);
//   };
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };
//   return (
//     <div className="main-container">
//       <h1 className="heading">Security Graph</h1>

//       <div className="left-buttons">
//         <button onClick={() => handleClick('securityGraph', '/security-graph')}>Find</button>
//         <button onClick={() => handleClick('card', '/card')}>Cloud Resource</button>
//         <button onClick={() => handleClick('another', '/another-component')}>View</button>
//       </div>
//       <div className="securitygraph">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         placeholder="Search..."
//       />
//     </div>
//       <div className="component-display">
//         {activeComponent === 'securityGraph' && <SecurityGraph />}
//         {activeComponent === 'card' && <CardComponent />}
//         {activeComponent === 'another' && <AnotherComponent />}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import CardComponent from './CardComponent'; // Ensure the path is correct
// import AnotherComponent from './AnotherComponent'; // Ensure the path is correct
// import '../../Style_css/SecurityGraph.css';
// import { FaBell, FaSearch,FaBeer,FaCompass, FaHome, FaUser, FaCog } from 'react-icons/fa'; // Import icons

// function SecurityGraph() {
//   const [activeComponent, setActiveComponent] = useState('securityGraph'); // Default to SecurityGraph
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input

//   useEffect(() => {
//     const currentPath = window.location.pathname;
//     if (currentPath === '/security-graph') {
//       setActiveComponent('securityGraph');
//     } else if (currentPath === '/card') {
//       setActiveComponent('card');
//     } else if (currentPath === '/another-component') {
//       setActiveComponent('another');
//     } else {
//       setActiveComponent('securityGraph'); // Default fallback
//     }
//   }, []);

//   const handleClick = (component, path) => {
//     setActiveComponent(component);
//     window.history.pushState({}, '', path);
//   };

//   // Header component defined within SecurityGraph
//   const Header = () => (
//     <header className="headerr">
//       <div className="header-left">
//         <FaCompass className="header-icon" onClick={() => handleClick('securityGraph', '/security-graph')} />
//         <FaBeer className="header-icon" onClick={() => handleClick('card', '/card')} />
//         <FaCog className="header-icon" onClick={() => handleClick('another', '/another-component')} />
//       </div>
//       <div className="header-right">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//         />
//         <FaBell className="notification-icon" />
//       </div>
//     </header>
//   );

//   return (
//     <div className="main-container">
//       <Header /> {/* Include the header here */}
//       <h1 className="heading">Security Graph</h1>

//       <div className="left-buttons">
//         <button onClick={() => handleClick('securityGraph', '/security-graph')}>Find</button>
//         <button onClick={() => handleClick('card', '/card')}>Cloud Resource</button>
//         <button onClick={() => handleClick('another', '/another-component')}>View</button>
//       </div>
//       <div className="body-search">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//         />
//       </div>
//       <div className="component-display">
//         {activeComponent === 'securityGraph' && (
//           <div className="securitygraph">
//             {/* Render content for SecurityGraph here if needed */}
//           </div>
//         )}
//         {activeComponent === 'card' && <CardComponent />}
//         {activeComponent === 'another' && <AnotherComponent />}
//       </div>
//     </div>
//   );
// }

// export default SecurityGraph;
// import React, { useState, useEffect } from 'react';
// import CardComponent from './CardComponent'; // Ensure the path is correct
// import AnotherComponent from './AnotherComponent'; // Ensure the path is correct
// import '../../Style_css/SecurityGraph.css';
// import { FaBell, FaBeer, FaCog, FaCompass, FaProjectDiagram, FaAngleDown, FaSave, FaRedo, FaEllipsisV, FaCheckCircle } from 'react-icons/fa'; // Import icons

// function SecurityGraph() {
//   const [activeComponent, setActiveComponent] = useState('securityGraph'); // Default to SecurityGraph
//   const [searchTerm, setSearchTerm] = useState(''); // State for search input
//   const [isSaved, setIsSaved] = useState(false); // State for save status

//   useEffect(() => {
//     const currentPath = window.location.pathname;
//     if (currentPath === '/security-graph') {
//       setActiveComponent('securityGraph');
//     } else if (currentPath === '/card') {
//       setActiveComponent('card');
//     } else if (currentPath === '/another-component') {
//       setActiveComponent('another');
//     } else {
//       setActiveComponent('securityGraph'); // Default fallback
//     }
//   }, []);

//   const handleClick = (component, path) => {
//     setActiveComponent(component);
//     window.history.pushState({}, '', path);
//   };

//   const handleSaveAs = () => {
//     const dataToSave = { /* Your data here, e.g., state or information to save */ };
//     const blob = new Blob([JSON.stringify(dataToSave)], { type: 'application/json' }); // Create a blob from the data
//     const url = URL.createObjectURL(blob); // Create a URL for the blob

//     const a = document.createElement('a'); // Create a link element
//     a.href = url; // Set the URL to the blob
//     a.download = 'data.json'; // Set the filename
//     document.body.appendChild(a); // Append the link to the body
//     a.click(); // Programmatically click the link to trigger the download
//     document.body.removeChild(a); // Remove the link from the document
//     URL.revokeObjectURL(url); // Release the object URL
//   };

//   const handleRefresh = () => {
//     window.location.reload(); // Refresh the page
//   };

//   // Header component defined within SecurityGraph
//   const Header = () => {
//     const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
//     const [selectedProject, setSelectedProject] = useState(null); // State for selected project

//     // Dummy project list (replace this with your actual project data)
//     const projects = ['Project 1', 'Project 2', 'Project 3'];

//     const toggleDropdown = () => {
//       setDropdownVisible(!dropdownVisible);
//     };

//     const handleProjectSelect = (project) => {
//       setSelectedProject(project);
//       setDropdownVisible(false); // Hide dropdown after selection
//       console.log(`Selected project: ${project}`); // Example action on project selection
//     };

//     return (
//       <header className="headerr">
//         <div className="header-left">
//           <div className="header-item" onClick={() => handleClick('securityGraph', '/security-graph')}>
//             <FaCompass className="header-icon" />
//             <span className="header-label">Home</span>
//           </div>
          
//           <div className="header-item project-dropdown">
//             <div onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center' }}>
//               <FaProjectDiagram className="header-icon" />
//               <span className="header-label">Projects</span>
//               <FaAngleDown className="down-arrow" style={{ marginLeft: '5px' }} />
//             </div>
//             {dropdownVisible && (
//               <div className="dropdown-menu">
//                 {projects.map((project) => (
//                   <div
//                     key={project}
//                     className="dropdown-item"
//                     onClick={() => handleProjectSelect(project)}
//                   >
//                     {project}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="header-right">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <FaBell className="notification-icon" />
//         </div>
//       </header>
//     );
//   };

//   return (
//     <div className="main-container">
//       <Header /> {/* Include the header here */}

//       {/* Header container for title and buttons */}
//       <div className="header-container">
//         <h1 className="heading">Security Graph</h1>

//         {/* Right buttons placed in the same line */}
//         <div className="right-buttons">
//           <button onClick={handleSaveAs} className="save-button">
//             <FaSave className="save-icon" /> Save As
//           </button>
//           <button onClick={handleRefresh} className="refresh-button">
//             <FaRedo className="refresh-icon" /> 
//           </button>
//           <button className="options-button">
//             <FaEllipsisV className="options-icon" />
//           </button>
//         </div>
//       </div>

//       <div className="left-buttons">
//         <button onClick={() => handleClick('securityGraph', '/security-graph')}>Find</button>
//         <button onClick={() => handleClick('card', '/card')}>Cloud Resource</button>
//         <button onClick={() => handleClick('another', '/another-component')}>View</button>
//       </div>

//       <div className="body-search">
//         <input
//           type="text"
//           placeholder="Search for anything in your cloud...."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//         />
//       </div>
//       <div className="component-display">
//         {activeComponent === 'securityGraph' && (
//           <div className="securitygraph">
//             {/* Render content for SecurityGraph here if needed */}
//           </div>
//         )}
//         {activeComponent === 'card' && <CardComponent />}
//         {activeComponent === 'another' && <AnotherComponent />}
//       </div>
//     </div>
//   );
// }

// export default SecurityGraph;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// import CardComponent from './CardComponent'; 
// import AnotherComponent from './AnotherComponent'; 
// import '../../Style_css/SecurityGraph.css';
// import { FaBell, FaProjectDiagram, FaAngleDown, FaSave, FaRedo, FaEllipsisV } from 'react-icons/fa'; 

// function SecurityGraph() {
//   const [activeComponent, setActiveComponent] = useState('securityGraph'); 
//   const [searchTerm, setSearchTerm] = useState(''); 
//   const [isSaved, setIsSaved] = useState(false); 

//   useEffect(() => {
//     const currentPath = window.location.pathname;
//     if (currentPath === '/security-graph') {
//       setActiveComponent('securityGraph');
//     } else if (currentPath === '/card') {
//       setActiveComponent('card');
//     } else if (currentPath === '/another-component') {
//       setActiveComponent('another');
//     } else {
//       setActiveComponent('securityGraph'); 
//     }
//   }, []);

//   const handleClick = (component, path) => {
//     setActiveComponent(component);
//     window.history.pushState({}, '', path);
//   };

//   const handleSaveAs = () => {
//     const dataToSave = { /* Your data here */ };
//     const blob = new Blob([JSON.stringify(dataToSave)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'data.json';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleRefresh = () => {
//     window.location.reload();
//   };

//   const Header = () => {
//     const [dropdownVisible, setDropdownVisible] = useState(false); 
//     const [selectedProject, setSelectedProject] = useState(null); 
//     const projects = ['Project 1', 'Project 2', 'Project 3'];

//     const toggleDropdown = () => {
//       setDropdownVisible(!dropdownVisible);
//     };

//     const handleProjectSelect = (project) => {
//       setSelectedProject(project);
//       setDropdownVisible(false); 
//       console.log(`Selected project: ${project}`); 
//     };

//     return (
//       <header className="headerr">
//         <div className="header-left">
//           <div className="header-item" onClick={() => handleClick('securityGraph', '/security-graph')}>
//             <FaProjectDiagram className="header-icon" />
//             <span className="header-label">Home</span>
//           </div>
//           <div className="header-item project-dropdown">
//             <div onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center' }}>
//               <FaProjectDiagram className="header-icon" />
//               <span className="header-label">Projects</span>
//               <FaAngleDown className="down-arrow" style={{ marginLeft: '5px' }} />
//             </div>
//             {dropdownVisible && (
//               <div className="dropdown-menu">
//                 {projects.map((project) => (
//                   <div key={project} className="dropdown-item" onClick={() => handleProjectSelect(project)}>
//                     {project}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="header-right">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <FaBell className="notification-icon" />
//         </div>
//       </header>
//     );
//   };

//   const callLlmApi = async () => {
//     try {
//       console.log(searchTerm); // For debugging purposes
//       const response = await axios.post('http://localhost:8000/api/llm', {
//         prompt: searchTerm, // Change searchTerm to prompt
//       });
  
//       console.log('LLM Response:', response.data); 
//     } catch (error) {
//       if (error.response) {
//         console.error('Error fetching LLM response:', error.response.status, error.response.data);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//       } else {
//         console.error('Error calling the API:', error.message);
//       }
//     }
//   };
  

//   return (
//     <div className="main-container">
//       <Header />
//       <div className="header-container">
//         <h1 className="heading">Security Graph</h1>
//         <div className="right-buttons">
//           <button onClick={handleSaveAs} className="save-button">
//             <FaSave className="save-icon" /> Save As
//           </button>
//           <button onClick={handleRefresh} className="refresh-button">
//             <FaRedo className="refresh-icon" /> 
//           </button>
//           <button className="options-button">
//             <FaEllipsisV className="options-icon" />
//           </button>
//         </div>
//       </div>
//       <div className="left-buttons">
//         <button onClick={() => handleClick('securityGraph', '/security-graph')}>Find</button>
//         <button onClick={() => handleClick('card', '/card')}>Cloud Resource</button>
//         <button onClick={() => handleClick('another', '/another-component')}>View</button>
//       </div>
//       <div className="body-search">
//         <input
//           type="text"
//           placeholder="Search for anything in your cloud...."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//         />
//         <button onClick={callLlmApi}>Search</button> {/* Button to trigger API call */}
//       </div>
//       <div className="component-display">
//         {activeComponent === 'securityGraph' && (
//           <div className="securitygraph">
//             {/* Render content for SecurityGraph here if needed */}
//           </div>
//         )}
//         {activeComponent === 'card' && <CardComponent />}
//         {activeComponent === 'another' && <AnotherComponent />}
//       </div>
//     </div>
//   );
// }

// export default SecurityGraph;



import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import CardComponent from './CardComponent'; 
import AnotherComponent from './AnotherComponent'; 
import '../../Style_css/SecurityGraph.css';
import { FaBell, FaProjectDiagram, FaAngleDown, FaSave, FaRedo, FaEllipsisV } from 'react-icons/fa'; 

function SecurityGraph() {
  const [activeComponent, setActiveComponent] = useState('securityGraph'); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [searchHeader,setSearchHeader] = useState('');
  const [isSaved, setIsSaved] = useState(false); 
  const [apiData, setApiData] = useState(null); // State to store the API data

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === '/security-graph') {
      setActiveComponent('securityGraph');
    } else if (currentPath === '/card') {
      setActiveComponent('card');
    } else if (currentPath === '/another-component') {
      setActiveComponent('another');
    } else {
      setActiveComponent('securityGraph'); 
    }
  }, []);

  const handleClick = (component, path) => {
    setActiveComponent(component);
    window.history.pushState({}, '', path);
  };

  const handleSaveAs = () => {
    const dataToSave = { /* Your data here */ };
    const blob = new Blob([JSON.stringify(dataToSave)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false); 
    const [selectedProject, setSelectedProject] = useState(null); 
    const projects = ['Project 1', 'Project 2', 'Project 3'];

    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };

    const handleProjectSelect = (project) => {
      setSelectedProject(project);
      setDropdownVisible(false); 
      console.log(`Selected project: ${project}`); 
    };

    return (
      <header className="headerr">
        <div className="header-left">
          <div className="header-item" onClick={() => handleClick('securityGraph', '/security-graph')}>
            <FaProjectDiagram className="header-icon" />
            <span className="header-label">Home</span>
          </div>
          <div className="header-item project-dropdown">
            <div onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center' }}>
              <FaProjectDiagram className="header-icon" />
              <span className="header-label">Projects</span>
              <FaAngleDown className="down-arrow" style={{ marginLeft: '5px' }} />
            </div>
            {dropdownVisible && (
              <div className="dropdown-menu">
                {projects.map((project) => (
                  <div key={project} className="dropdown-item" onClick={() => handleProjectSelect(project)}>
                    {project}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="header-right">
          <input
            type="text"
            placeholder="Search..."
            value={searchHeader}
            onChange={(e) => setSearchHeader(e.target.value)}
          />
          <FaBell className="notification-icon" />
        </div>
      </header>
    );
  };

  const callLlmApi = async () => {
    try {
      console.log(searchTerm); // For debugging purposes
      const response = await axios.post('http://localhost:8000/api/llm', {
        prompt: searchTerm, // Change searchTerm to prompt
      });
  
      console.log('LLM Response:', response.data.content);
      setApiData(response.data.content); // Store the response data in state

    } catch (error) {
      if (error.response) {
        console.error('Error fetching LLM response:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error calling the API:', error.message);
      }
    }
  };

  return (
    <div className="main-container">
      <Header />
      <div className="header-container">
        <h1 className="heading">Security Graph</h1>
        <div className="right-buttons">
          <button onClick={handleSaveAs} className="save-button">
            <FaSave className="save-icon" /> Save As
          </button>
          <button onClick={handleRefresh} className="refresh-button">
            <FaRedo className="refresh-icon" /> 
          </button>
          <button className="options-button">
            <FaEllipsisV className="options-icon" />
          </button>
        </div>
      </div>
      <div className="left-buttons">
        <button onClick={() => handleClick('securityGraph', '/security-graph')}>Find</button>
        <button onClick={() => handleClick('card', '/card')}>Cloud Resource</button>
        <Link to="/another-component">
          <button>View</button>
        </Link>
      </div>
      <div className="body-search">
        <input
          type="text"
          placeholder="Search for anything in your cloud...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
        <button onClick={callLlmApi}>Search</button> {/* Button to trigger API call */}
      </div>
      <div className="component-display">
        {activeComponent === 'securityGraph' && (
          <div className="securitygraph">
            {/* Render the API data here */}
            {apiData && <div>{JSON.stringify(apiData)}</div>} {/* Display raw API data for now */}
          </div>
        )}
        {activeComponent === 'card' && <CardComponent />} {/* Pass the data to CardComponent */}
        {activeComponent === 'another' && <AnotherComponent />} {/* Pass the data to AnotherComponent */}
      </div>
    </div>
  );
}

export default SecurityGraph;
