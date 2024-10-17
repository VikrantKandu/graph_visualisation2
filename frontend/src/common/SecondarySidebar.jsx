import React, { useState } from 'react';
import './SecondarySidebar.css';

const SecondarySidebar = ({ menu, closeSidebar, isOpen }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Handle item click to set the selected item
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Dynamically render content based on selected menu
  const renderContent = () => {
    switch (menu) {
      case 'Dashboard':
        return (
          <ul>
            <li onClick={() => handleItemClick('Dashboard Overview')}>A: Dashboard Overview</li>
            <li onClick={() => handleItemClick('Dashboard Analytics')}>B: Dashboard Analytics</li>
            <li onClick={() => handleItemClick('Dashboard Reports')}>C: Dashboard Reports</li>
            <li onClick={() => handleItemClick('Dashboard Settings')}>D: Dashboard Settings</li>
          </ul>
        );
      case 'Pending Tasks':
        return (
          <ul>
            <li onClick={() => handleItemClick('Pending Task 1')}>A: Pending Task 1</li>
            <li onClick={() => handleItemClick('Pending Task 2')}>B: Pending Task 2</li>
            <li onClick={() => handleItemClick('Pending Task 3')}>C: Pending Task 3</li>
          </ul>
        );
      case 'Completed Tasks':
        return (
          <ul>
            <li onClick={() => handleItemClick('Completed Task 1')}>A: Completed Task 1</li>
            <li onClick={() => handleItemClick('Completed Task 2')}>B: Completed Task 2</li>
          </ul>
        );
      case 'Chats':
        return (
          <ul>
            <li onClick={() => handleItemClick('Chat 1')}>A: Chat 1</li>
            <li onClick={() => handleItemClick('Chat 2')}>B: Chat 2</li>
          </ul>
        );
      case 'Admin Users':
        return (
          <ul>
            <li onClick={() => handleItemClick('Admin User 1')}>A: Admin User 1</li>
            <li onClick={() => handleItemClick('Admin User 2')}>B: Admin User 2</li>
          </ul>
        );
      case 'Settings':
        return (
          <ul>
            <li onClick={() => handleItemClick('General Settings')}>A: General Settings</li>
            <li onClick={() => handleItemClick('Security Settings')}>B: Security Settings</li>
          </ul>
        );
      default:
        return <p>Select a menu to view details</p>;
    }
  };

  // Render details for the selected item
  const renderSelectedItemDetails = () => {
    if (!selectedItem) {
      return <p>Please select an item to view more details.</p>;
    }
    
    switch (selectedItem) {
      case 'Dashboard Overview':
        return <p>Details about Dashboard Overview...</p>;
      case 'Dashboard Analytics':
        return <p>Details about Dashboard Analytics...</p>;
      case 'Dashboard Reports':
        return <p>Details about Dashboard Reports...</p>;
      case 'Dashboard Settings':
        return <p>Details about Dashboard Settings...</p>;
      case 'Pending Task 1':
        return <p>Details about Pending Task 1...</p>;
      case 'Pending Task 2':
        return <p>Details about Pending Task 2...</p>;
      case 'Pending Task 3':
        return <p>Details about Pending Task 3...</p>;
      case 'Completed Task 1':
        return <p>Details about Completed Task 1...</p>;
      case 'Completed Task 2':
        return <p>Details about Completed Task 2...</p>;
      case 'Chat 1':
        return <p>Details about Chat 1...</p>;
      case 'Chat 2':
        return <p>Details about Chat 2...</p>;
      case 'Admin User 1':
        return <p>Details about Admin User 1...</p>;
      case 'Admin User 2':
        return <p>Details about Admin User 2...</p>;
      case 'General Settings':
        return <p>Details about General Settings...</p>;
      case 'Security Settings':
        return <p>Details about Security Settings...</p>;
      default:
        return <p>Details not available for the selected item.</p>;
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
      <div className="selected-item-details">
        {renderSelectedItemDetails()}
      </div>
    </div>
  );
};

export default SecondarySidebar;

