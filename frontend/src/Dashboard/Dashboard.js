// // src/Dashboard/Dashboard.js
// import React from 'react';
// import './Dashboard.css';

// const Dashboard = ({isOpen}) => {
//   return (
//     <div className="dashboard">
    
//       <div className="dashboard-content">
//       <h1>Welcome to the Dashboard</h1>
//         <div className="card">
//           <h2>Card 1</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 2</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 3</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 1</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 2</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 3</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div><div className="card">
//           <h2>Card 1</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 2</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 3</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div><div className="card">
//           <h2>Card 1</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 2</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//         <div className="card">
//           <h2>Card 3</h2>
//           <p>This is some content inside a dashboard card.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React from 'react';
// import Card from './graph/Card'; // Adjust the import path as necessary
// import Cloud_Function from './graph/Cloud_Function'; // Adjust the import path as necessary
// import './Dashboard.css'; // Dashboard styles

// const Dashboard = () => {
//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="dashboard-cards">
//         <Card title="Cloud Function Graph">
//           <Cloud_Function />
//         </Card>

//         {/* You can add more cards here for different components */}
//         <Card title="Another Component">
//           {/* Another component can be placed here */}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



import React from 'react';
import Card from './graph/Card'; // Adjust the import path as necessary
import Cloud_Function from './graph/Cloud_Function'; // Adjust the import path as necessary
import Header from '../common/Header'; // Import the Header component
import './Dashboard.css'; // Dashboard styles

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header /> {/* Include the Header component */}
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <Card title="Cloud Function Graph">
          <Cloud_Function />
        </Card>

        {/* You can add more cards here for different components */}
        <Card title="Another Component">
          {/* Another component can be placed here */}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
