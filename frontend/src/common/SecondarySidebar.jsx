// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaChartLine, FaCog } from 'react-icons/fa'; // Import icons from react-icons

// import './SecondarySidebar.css';

// const SecondarySidebar = ({ menu, closeSidebar, isOpen }) => {
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Handle item click to set the selected item
//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//   };

//   // Dynamically render content based on selected menu
//   const renderContent = () => {
//     switch (menu) {
//       case 'Dashboard':
//         return (
//           <ul>
//             <li onClick={() => handleItemClick('Dashboard')}>
//               <Link to="/security_graph">
//                 <FaChartLine className="menu-icon" /> Dashboard
//               </Link>
//             </li>
//             <li onClick={() => handleItemClick('Settings')}>
//               <Link to="/settings">
//                 <FaCog className="menu-icon" /> Settings
//               </Link>
//             </li>
//             {/* You can add more items here */}
//           </ul>
//         );
//         case 'Inventory':
//           return (
//             <ul>
//               <li onClick={() => handleItemClick('InventoryCloudService')}>
//               <Link to="/InventoryCloudService">
//                 <FaCog className="menu-icon" /> Cloud Service
//               </Link>
//             </li>
              
//               {/* You can add more items here */}
//             </ul>
//           );
//         case 'Explorer':
//         return (
//           <ul>
//             <li onClick={() => handleItemClick('Security Graph')}>
//               <Link to="/security_graph">
//                 <FaChartLine className="menu-icon" /> Security Graph
//               </Link>
//             </li>
//             <li onClick={() => handleItemClick('Security Graph')}>
//               <Link to="/security_graph">
//                 <FaChartLine className="menu-icon" /> Architecture
//               </Link>
//             </li>
//           </ul>
//         );
//       default:
//         return <p>Select a menu to view details</p>;
//     }
//   };

//   // Render details for the selected item
//   const renderSelectedItemDetails = () => {
//     if (!selectedItem) {
//       return <p>Please select an item to see details.</p>;
//     }
    
//     // Customize this content based on your application logic
//     return <p>Details for: {selectedItem}</p>;
//   };

//   return (
//     <div className={`secondary-sidebar ${isOpen ? 'attached' : 'detached'}`}>
//       <div className="secondary-sidebar-header">
//         <h2>{menu}</h2>
//         <button className="close-btn" onClick={closeSidebar}>Close</button>
//       </div>
//       <div className="secondary-sidebar-content">
//         {renderContent()}
//       </div>
//       <div className="selected-item-details">
//         {renderSelectedItemDetails()}
//       </div>
//     </div>
//   );
// };

// export default SecondarySidebar;






import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChartLine, FaCog } from 'react-icons/fa'; // Import icons from react-icons
import './SecondarySidebar.css';

const SecondarySidebar = ({ menu, closeSidebar, isOpen }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); // Use useNavigate

  // Handle item click to set the selected item and navigate
  const handleItemClick = (item, path) => {
    setSelectedItem(item);
    navigate(path); // Navigate to the specified path
  };

  // Dynamically render content based on selected menu
  const renderContent = () => {
    switch (menu) {
      case 'Dashboard':
        return (
          <ul>
            <li onClick={() => handleItemClick('Dashboard', '/dashboard')}>
              <FaChartLine className="menu-icon" /> Dashboard
            </li>
            <li onClick={() => handleItemClick('Settings', '/settings')}>
              <FaCog className="menu-icon" /> Settings
            </li>
          </ul>
        );
      case 'Inventory':
        return (
          <ul>
            <li onClick={() => handleItemClick('Cloud Service', '/InventoryCloudService')}>
              <FaCog className="menu-icon" /> Cloud Service
            </li>
          </ul>
        );
      case 'Explorer':
        return (
          <ul>
            <li onClick={() => handleItemClick('security_graph', '/security_graph')}>
              <FaChartLine className="menu-icon" /> Security Graph
            </li>
            <li onClick={() => handleItemClick('CloudFunction', '/cloudfunction')}>
              <FaChartLine className="menu-icon" /> Architecture
            </li>
          </ul>
        );
      default:
        return <p>Select a menu to view details</p>;
    }
  };

  // Render details for the selected item
  const renderSelectedItemDetails = () => {
    if (!selectedItem) {
      return <p>Please select an item to see details.</p>;
    }

    // Customize this content based on your application logic
    return <p>Details for: {selectedItem}</p>;
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
