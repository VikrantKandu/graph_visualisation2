import React, { useState } from 'react';
import logo from '../assets/vik.png';
import { FaAngleLeft, FaAngleRight, FaChartBar, FaClipboardList, FaCompass, FaCog, FaFolderOpen, FaFileAlt, FaShieldAlt } from 'react-icons/fa';
import './Sidebar.css';
import SecondarySidebar from './SecondarySidebar'; // Import secondary sidebar

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('');

  // Function to handle opening the secondary sidebar
  const openSecondarySidebar = (menu) => {
    setCurrentMenu(menu);
    setIsSecondaryOpen(true);
  };

  const closeSecondarySidebar = () => {
    setIsSecondaryOpen(false);
    setCurrentMenu('');
  };

  return (
    <div className="sidebar-container">
      {/* Primary Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
        </button>
        {/* Logo Section */}
        <div className="logo-section">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>
        <ul className="menu-list">
          <li className="menu-item" onClick={() => openSecondarySidebar('Dashboard')}>
            <div className="menu-content">
              <FaChartBar className="menu-icon" />
              {isOpen && <span className="menu-text">Dashboard</span>}
              {/* <span className="menu-text">{isOpen && "Dashboard"}</span> */}
            </div>
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Issues')}>
            <div className="menu-content">
              <FaClipboardList className="menu-icon" />
              {isOpen && <span className="menu-text">Issues</span>}
            </div>
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Findings')}>
            <div className="menu-content">
              <FaFileAlt className="menu-icon" />
              {isOpen && <span className="menu-text">Findings</span>}
            </div>
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Inventory')}>
            <div className="menu-content">
              <FaFolderOpen className="menu-icon" />
              {isOpen && <span className="menu-text">Inventory</span>}
            </div>
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Explorer')}>
            <div className="menu-content">
              <FaCompass className="menu-icon" />
              {isOpen && <span className="menu-text">Explorer</span>}
            </div>
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Policies')}>
            <div className="menu-content">
              <FaShieldAlt className="menu-icon" />
              {isOpen && <span className="menu-text">Policies</span>}
            </div>
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Reports')}>
            <div className="menu-content">
              <FaFileAlt className="menu-icon" />
              {isOpen && <span className="menu-text">Reports</span>}
            </div>
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Settings')}>
            <div className="menu-content">
              <FaCog className="menu-icon" />
              {isOpen && <span className="menu-text">Settings</span>}
            </div>
          </li>
        </ul>
      </div>

      {/* Secondary Sidebar: Opens on the right side of the Primary Sidebar */}
      {isSecondaryOpen && (
        <SecondarySidebar
          menu={currentMenu}
          closeSidebar={closeSecondarySidebar}
          isOpen={isOpen} // Pass the isOpen prop for dynamic adjustment
        />
      )}
    </div>
  );
};

export default Sidebar;
