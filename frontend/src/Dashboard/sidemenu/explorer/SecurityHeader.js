import React, { useState } from 'react';
import { FaProjectDiagram, FaAngleDown, FaBell } from 'react-icons/fa';
import './CSS/SecurityHeader.css'; // Import the CSS file

const SecurityHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchHeader, setSearchHeader] = useState('');
  const projects = ['Security Project 1', 'Security Project 2', 'Security Project 3'];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProjectSelect = (project) => {
    console.log('Selected project:', project);
  };

  const handleClick = (routeName, url) => {
    console.log(`Navigating to ${routeName} with URL ${url}`);
  };

  return (
    <header className="security-header">
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

export default SecurityHeader;
