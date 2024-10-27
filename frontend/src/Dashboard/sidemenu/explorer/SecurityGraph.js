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

  
  const navigate = useNavigate(); // Initialize the navigate function

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
    navigate(path); // Redirect to the specified path
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
          <div className="header-item" onClick={() => handleClick('securityGraph', '/dashboard')}>
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
