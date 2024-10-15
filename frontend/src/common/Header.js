import React, { useContext, useState } from 'react';
import './Header.css';
import logo from '../assets/vik.png'; // Replace with the correct path to your predefined PNG logo
import { ThemeContext } from '../context/ThemeContext';
// import profileImage from '../assets/profile.png'; // Ensure the path to your profile image is correct
import { FaSun, FaMoon,FaSearch } from 'react-icons/fa'; // Import icons for dark/light mode

const Header = ({ toggleSidebar, userEmail }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false); // New state for theme dropdown
  const [searchTerm, setSearchTerm] = useState('');

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
    setThemeDropdownOpen(false); // Close theme dropdown when profile is opened
  };

  const handleThemeDropdownToggle = () => {
    setThemeDropdownOpen(!themeDropdownOpen);
    setDropdownOpen(false); // Close profile dropdown when theme is opened
  };

  const handleOptionClick = (option) => {
    if (option === "logout") {
      console.log("User logged out"); // Replace with actual logout logic
    } else if (option === "profile") {
      console.log("Navigate to Profile"); // Replace with actual navigation logic
    } else if (option === "light") {
      if (theme === 'dark') toggleTheme(); // Toggle to light if currently dark
    } else if (option === "dark") {
      if (theme === 'light') toggleTheme(); // Toggle to dark if currently light
    }
    setDropdownOpen(false); // Close the profile dropdown after an option is selected
    setThemeDropdownOpen(false); // Close the theme dropdown after an option is selected
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Implement search logic if needed
  };
  return (
    <nav className="navbar header">
      <a className="navbar-brand" href="#" onClick={toggleSidebar}>
        <img src={logo} alt="Company Logo" className="header-logo" />
        Admin Panel
      </a>
      <h1 className="header-title">Dashboard</h1>

      {/* Search Bar */}
       {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch className="search-icon" /> {/* Search icon here */}
      </div>


      <div className="navbar-right">
        {/* Profile Image with Dropdown */}
        <div className="profile-container">
          <img
            src={logo}
            alt="Profile"
            className="profile-image"
            onClick={handleDropdownToggle}
          />
          {dropdownOpen && (
            <div className="dropdown">
              <p className="dropdown-item">{userEmail}</p>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={() => handleOptionClick("profile")}>Profile</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" onClick={() => handleOptionClick("logout")}>Logout</a>
            </div>
          )}
        </div>

        {/* Dark/Light Mode Dropdown */}
        <div className="theme-container">
          <button className="theme-toggle-btn" onClick={handleThemeDropdownToggle}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          {themeDropdownOpen && (
            <div className="dropdown">
              <a className="dropdown-item" onClick={() => handleOptionClick("light")}>
                <FaSun className="theme-toggle-icon" /> Light Mode
              </a>
              <a className="dropdown-item" onClick={() => handleOptionClick("dark")}>
                <FaMoon className="theme-toggle-icon" /> Dark Mode
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;




// // src/common/Header.js
// import React, { useContext } from 'react';
// import { ThemeContext } from '../context/ThemeContext';
// import './Header.css';

// const Header = ({ toggleSidebar }) => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <nav className="header">
//       {/* <button className="toggle-btn" onClick={toggleSidebar}>
//         Toggle Sidebar
//       </button> */}
//       <h1 className="header-title">Dashboard</h1>
//       <button className="theme-toggle-btn" onClick={toggleTheme}>
//         {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
//       </button>
//     </nav>
//   );
// };

// export default Header;
