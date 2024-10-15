// src/common/SecondarySidebar.js

import React from 'react';
import './SecondarySidebar.css';

const SecondarySidebar = ({ menu, closeSidebar, isOpen }) => {
  // Dynamically render content based on selected menu
  const renderContent = () => {
    switch (menu) {
      case 'Dashboard':
        return (
          <ul>
            <li>A: Dashboard Overview</li>
            <li>B: Dashboard Analytics</li>
            <li>C: Dashboard Reports</li>
            <li>D: Dashboard Settings</li>
          </ul>
        );
      case 'Pending Tasks':
        return (
          <ul>
            <li>A: Pending Task 1</li>
            <li>B: Pending Task 2</li>
            <li>C: Pending Task 3</li>
          </ul>
        );
      case 'Completed Tasks':
        return (
          <ul>
            <li>A: Completed Task 1</li>
            <li>B: Completed Task 2</li>
          </ul>
        );
      case 'Chats':
        return (
          <ul>
            <li>A: Chat 1</li>
            <li>B: Chat 2</li>
          </ul>
        );
      case 'Admin Users':
        return (
          <ul>
            <li>A: Admin User 1</li>
            <li>B: Admin User 2</li>
          </ul>
        );
      case 'Settings':
        return (
          <ul>
            <li>A: General Settings</li>
            <li>B: Security Settings</li>
          </ul>
        );
      default:
        return <p>Select a menu to view details</p>;
    }
  };

  return (
    <div className={`secondary-sidebar ${isOpen ? 'attached' : 'detached'}`}>
      <div className="secondary-sidebar-header">
        <h2>{menu}</h2>
        <button className="close-btn" onClick={closeSidebar}>Close</button>
      </div>
      <div className="secondary-sidebar-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default SecondarySidebar;
