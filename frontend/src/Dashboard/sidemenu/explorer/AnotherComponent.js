import React, { useState } from 'react';
import { FaProjectDiagram, FaAngleDown, FaBell, FaEye, FaTimes, FaPlus } from 'react-icons/fa'; // Import necessary icons
import SecurityHeader from './SecurityHeader';

const AnotherComponent = () => {
  const [cloudPlatform, setCloudPlatform] = useState('Amazon Web Services');
  const [region, setRegion] = useState('AP-SOUTHEAST-1');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchHeader, setSearchHeader] = useState('');
  const [boxes, setBoxes] = useState([]); // State for the boxes
  const projects = ['Project 1', 'Project 2', 'Project 3'];

  const handlePlatformChange = (event) => {
    setCloudPlatform(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProjectSelect = (project) => {
    console.log('Selected project:', project);
  };

  const handleClick = (routeName, url) => {
    console.log(`Navigating to ${routeName} with URL ${url}`);
  };

  const addBox = () => {
    setBoxes([...boxes, `New Box ${boxes.length + 1}`]); // Add a new box with a unique identifier
  };

  const removeBox = (index) => {
    setBoxes(boxes.filter((_, i) => i !== index)); // Remove the box at the given index
  };

  return (
    <div>
      <SecurityHeader />
      <div>
        <h1>Security Graph</h1>
      </div>
      <div style={containerStyle}>
        <div style={filterRowStyle}>
          <div style={filterStyle}>
            <label>FIND</label>
            <button style={filterButtonStyle}>Cloud Resource</button>
            <button style={removeButtonStyle}>X</button>
          </div>
          <div style={filterStyle}>
            <label>WHERE</label>
            <span>
              Cloud Platform equals 
              <select value={cloudPlatform} onChange={handlePlatformChange} style={dropdownStyle}>
                <option value="Amazon Web Services">Amazon Web Services</option>
                <option value="Google Cloud">Google Cloud</option>
                <option value="Azure">Azure</option>
              </select>
            </span>
            <span>
              Region equals 
              <select value={region} onChange={handleRegionChange} style={dropdownStyle}>
                <option value="AP-SOUTHEAST-1">AP-SOUTHEAST-1</option>
                <option value="US-WEST-1">US-WEST-1</option>
                <option value="EU-CENTRAL-1">EU-CENTRAL-1</option>
              </select>
              <FaEye style={{ marginLeft: '5px', cursor: 'pointer' }} /> {/* Eye icon */}
              <FaTimes style={{ marginLeft: '5px', cursor: 'pointer', color: 'red' }} /> {/* Cross icon */}
              <FaPlus onClick={addBox} style={{ marginLeft: '5px', cursor: 'pointer', color: 'green' }} /> {/* Add icon */}
            </span>
          </div>
        </div>
        
        {/* Render boxes */}
        <div style={{ marginTop: '10px' }}>
          {boxes.map((box, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '5px' }}>
              {box}
              <FaTimes onClick={() => removeBox(index)} style={{ float: 'right', cursor: 'pointer', color: 'red' }} /> {/* Remove box icon */}
            </div>
          ))}
        </div>

        <div style={viewStyle}>
          <button style={viewButtonStyle}>Table</button>
          <button style={viewButtonStyle}>Graph</button>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '10px',
  gap: '10px',
  marginLeft: '20px',
};

const filterRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
};

const filterStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
};

const filterButtonStyle = {
  padding: '5px 10px',
  cursor: 'pointer',
};

const removeButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'red',
  fontSize: '18px',
  cursor: 'pointer',
};

const dropdownStyle = {
  marginLeft: '5px',
  padding: '5px',
  fontSize: '14px',
};

const viewStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px'
};

const viewButtonStyle = {
  padding: '5px 15px',
  cursor: 'pointer',
  backgroundColor: '#e0e0e0',
  border: '1px solid #ccc'
};

export default AnotherComponent;
