// // src/App.js

// import Layout from './common/Layout';
// // import Users from './components/Users';  // Assume you have this component
// import Login from './login/Login';
// import Dashboard from './Dashboard/Dashboard';
// // import Settings from './components/Settings';  // Assume you have this component
// import './App.css'; // Main app styles


// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';



// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = (status) => {
//     setIsAuthenticated(status);
//   };

//   return (
//     <Router>
//       {isAuthenticated ? (
//         <Layout>
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             {/* <Route path="/users" element={<Users />} />
//             <Route path="/settings" element={<Settings />} /> */}
//             <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Redirect to dashboard if no match */}
//           </Routes>
//         </Layout>
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </Router>
//   );
// }

// export default App;

// src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './common/Layout';
// import Login from './login/Login';
// import Dashboard from './Dashboard/Dashboard';
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = (status) => {
//     setIsAuthenticated(status);
//   };

//   return (
//     <Router>
//       {isAuthenticated ? (
//         <Layout>
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Redirect to dashboard if no match */}
//           </Routes>
//         </Layout>
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </Router>
//   );
// }

// export default App;


// src/App.js
// src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './common/Layout';
// import Login from './login/Login';
// import Dashboard from './Dashboard/Dashboard';
// import Sidebar from './common/Sidebar'; // Import Sidebar
// import './App.css'; // Main app styles

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const handleLogin = (status) => {
//     setIsAuthenticated(status);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <Router>
//       {isAuthenticated ? (
//         <Layout>
//           <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> {/* Pass props to Sidebar */}
//           <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="*" element={<Navigate to="/dashboard" />} />
//             </Routes>
//           </div>
//         </Layout>
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </Router>
//   );
// }

// export default App;



import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import Dashboard from './Dashboard/Dashboard';
import Sidebar from './common/Sidebar'; // Import Sidebar
import SecurityGraph from './Dashboard/sidemenu/explorer/SecurityGraph';
import AnotherComponent from './Dashboard/sidemenu/explorer/AnotherComponent';
import CloudServiceSelector from './Dashboard/sidemenu/inventory/CloudServiceSelector';
import Cloud_Function from './Dashboard/sidemenu/explorer/Architecture/Cloud_Function';

import './App.css'; // Main app styles

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
        {/* <Sidebar /> */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
           {/* Pass props to Sidebar */}
          <div className={`dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
              <Route path="/security_graph" element={<SecurityGraph />} />
              <Route path="/another-component" element={<AnotherComponent />} />
              <Route path="/InventoryCloudService" element={<CloudServiceSelector />} />
              <Route path="/cloudfunction" element={<Cloud_Function />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
}

export default App;
