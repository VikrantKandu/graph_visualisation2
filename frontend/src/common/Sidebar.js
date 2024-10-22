// // src/common/Sidebar.js

// import React, { useState } from 'react'; 
// import logo from '../assets/vik.png';
// import { FaAngleLeft, FaAngleRight, FaChartBar, FaClipboardList, FaComments, FaWrench, FaUserShield, FaCog } from 'react-icons/fa';
// import './Sidebar.css';
// import SecondarySidebar from './SecondarySidebar'; // Import secondary sidebar

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
//   const [currentMenu, setCurrentMenu] = useState('');

//   // Function to handle opening the secondary sidebar
//   const openSecondarySidebar = (menu) => {
//     setCurrentMenu(menu);
//     setIsSecondaryOpen(true);
//   };

//   const closeSecondarySidebar = () => {
//     setIsSecondaryOpen(false);
//     setCurrentMenu('');
//   };


//   return (
//     <div className="sidebar-container">
//       {/* Primary Sidebar */}
//       <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//         <button className="toggle-btn" onClick={toggleSidebar}>
//           {isOpen ? <FaAngleLeft /> : <FaAngleRight />}
//         </button>
//            {/* Logo Section */}
//         <div className="logo-section">
//           <img src={logo} alt="Logo" className="sidebar-logo" />
//         </div>
//         <ul className="menu-list">
//           <li className="menu-item" onClick={() => openSecondarySidebar('Dashboard')}>
//             <FaChartBar /> {isOpen && <span className="menu-text">Dashboard</span>}
//           </li>
//           <li className="menu-item" onClick={() => openSecondarySidebar('Pending Tasks')}>
//             <FaClipboardList /> {isOpen && <span className="menu-text">Pending Tasks</span>}
//           </li>
//           <li className="menu-item" onClick={() => openSecondarySidebar('Completed Tasks')}>
//             <FaWrench /> {isOpen && <span className="menu-text">Completed Tasks</span>}
//           </li>
//           <li className="menu-item" onClick={() => openSecondarySidebar('Chats')}>
//             <FaComments /> {isOpen && <span className="menu-text">Chats</span>}
//           </li>
//           <li className="menu-item" onClick={() => openSecondarySidebar('Admin Users')}>
//             <FaUserShield /> {isOpen && <span className="menu-text">Admin Users</span>}
//           </li>
//           <li className="menu-item" onClick={() => openSecondarySidebar('Settings')}>
//             <FaCog /> {isOpen && <span className="menu-text">Settings</span>}
//           </li>
//         </ul>
//       </div>

//       {/* Secondary Sidebar: Opens on the right side of the Primary Sidebar */}
//       {isSecondaryOpen && (
//         <SecondarySidebar 
//           menu={currentMenu} 
//           closeSidebar={closeSecondarySidebar} 
//           isOpen={isOpen} // Pass the isOpen prop for dynamic adjustment
//         />
//       )}
//     </div>
//   );
// };

// export default Sidebar;




import React, { useState } from 'react';
import logo from '../assets/vik.png';
import { FaAngleLeft, FaAngleRight, FaChartBar, FaClipboardList, FaCompass, FaWrench, FaUserShield, FaCog, FaFolderOpen, FaSearch, FaFileAlt, FaShieldAlt } from 'react-icons/fa';
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
              <span className="menu-text">{isOpen && "Dashboard"}</span>
            </div>
          </li>

          <li className="menu-item" onClick={() => openSecondarySidebar('Issues')}>
            <FaClipboardList /> {isOpen && <span className="menu-text">Issues</span>}
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Findings')}>
            <FaFileAlt /> {isOpen && <span className="menu-text">Findings</span>}
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Inventory')}>
            <FaFolderOpen /> {isOpen && <span className="menu-text">Inventory</span>}
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Explorer')}>
            <FaCompass /> {isOpen && <span className="menu-text">Explorer</span>}
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Policies')}>
            <FaShieldAlt /> {isOpen && <span className="menu-text">Policies</span>}
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Reports')}>
            <FaFileAlt /> {isOpen && <span className="menu-text">Reports</span>}
          </li>
          <li className="menu-item" onClick={() => openSecondarySidebar('Settings')}>
            <FaCog /> {isOpen && <span className="menu-text">Settings</span>}
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
