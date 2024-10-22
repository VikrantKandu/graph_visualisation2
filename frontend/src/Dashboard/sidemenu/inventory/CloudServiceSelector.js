// // src/CloudServiceSelector.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useTable } from 'react-table';
// import '../../Style_css/CloudServiceSelector.css';
// const CloudServiceSelector = () => {
//   const [selectedCloud, setSelectedCloud] = useState('');
//   const [data, setData] = useState([]);
  
//   const handleSelectChange = async (event) => {
//     const cloudType = event.target.value;
//     setSelectedCloud(cloudType);
//     console.log(cloudType);
//     if (cloudType) {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/cloudService?cloud=${cloudType}`);
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//   };

//   const columns = React.useMemo(
//     () => [
//       { Header: 'Name', accessor: 'name' },
//       { Header: 'Type', accessor: 'type' },
//       { Header: 'Resource', accessor: 'resource' },
//     ],
//     []
//   );

//   const tableInstance = useTable({ columns, data });

//   return (
//     <div>
//       <h1>Select a Cloud Provider</h1>
//       <select onChange={handleSelectChange} value={selectedCloud}>
//         <option value="">Select...</option>
//         <option value="AWS">AWS</option>
//         <option value="Azure">Azure</option>
//         <option value="GCP">GCP</option>
//       </select>

//       {data.length > 0 && (
//         <table {...tableInstance.getTableProps()} style={{ marginTop: '20px', width: '100%' }}>
//           <thead>
//             {tableInstance.headerGroups.map(headerGroup => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                   <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...tableInstance.getTableProps()}>
//             {tableInstance.rows.map(row => {
//               tableInstance.prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map(cell => (
//                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CloudServiceSelector;

// import '../../Style_css/CloudServiceSelector.css';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useTable } from 'react-table';

// const CloudServiceSelector = () => {
//   const [selectedCloud, setSelectedCloud] = useState('');
//   const [selectedType, setSelectedType] = useState('');
//   const [data, setData] = useState([]);

//   const handleSelectChange = (event) => {
//     const cloudType = event.target.value;
//     setSelectedCloud(cloudType);
//     // Reset type when cloud provider changes
//     setSelectedType('');
//     setData([]); // Clear previous data
//   };

//   const handleTypeChange = async (event) => {
//     const type = event.target.value;
//     setSelectedType(type);
    
//     // Fetch data only if both selections are made
//     if (selectedCloud && type) {
//       await fetchData(selectedCloud, type);
//     }
//   };

//   const fetchData = async (cloudType, type) => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/cloudService?cloud=${cloudType}&type=${type}`);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const columns = React.useMemo(
//     () => [
//       { Header: 'Name', accessor: 'name' },
//       { Header: 'Type', accessor: 'type' },
//       { Header: 'Resource', accessor: 'resource' },
//     ],
//     []
//   );

//   const tableInstance = useTable({ columns, data });

//   return (
//     <div>
//       <h1>Select a Cloud Provider</h1>
//       <select onChange={handleSelectChange} value={selectedCloud}>
//         <option value="">Select...</option>
//         <option value="AWS">AWS</option>
//         <option value="Azure">Azure</option>
//         <option value="GCP">GCP</option>
//       </select>

//       {selectedCloud && (
//         <select onChange={handleTypeChange} value={selectedType}>
//           <option value="">Select Type...</option>
//           <option value="node">Node</option>
//           <option value="relation">Relation</option>
//           <option value="both">Both</option>
//         </select>
//       )}

//       {data.length > 0 && (
//         <table {...tableInstance.getTableProps()} style={{ marginTop: '20px', width: '100%' }}>
//           <thead>
//             {tableInstance.headerGroups.map((headerGroup, headerIndex) => (
//               <tr {...headerGroup.getHeaderGroupProps()} key={`header-${headerIndex}`}>
//                 {headerGroup.headers.map((column, columnIndex) => (
//                   <th {...column.getHeaderProps()} key={`header-col-${columnIndex}`}>
//                     {column.render('Header')}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...tableInstance.getTableBodyProps()}>
//             {tableInstance.rows.map((row, rowIndex) => {
//               tableInstance.prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
//                   {row.cells.map((cell, cellIndex) => (
//                     <td {...cell.getCellProps()} key={`cell-${rowIndex}-${cellIndex}`}>
//                       {cell.render('Cell')}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CloudServiceSelector;








// import '../../Style_css/CloudServiceSelector.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useTable } from 'react-table';

// const CloudServiceSelector = () => {
//   const [selectedCloud, setSelectedCloud] = useState('');
//   const [selectedType, setSelectedType] = useState('');
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(''); // Added state for search input

//   const handleSelectChange = (event) => {
//     const cloudType = event.target.value;
//     setSelectedCloud(cloudType);
//     setSelectedType('');
//     setData([]);
//   };

//   const handleTypeChange = async (event) => {
//     const type = event.target.value;
//     setSelectedType(type);
    
//     // Fetch data only if both selections are made
//     if (selectedCloud && type) {
//       await fetchData(selectedCloud, type, searchTerm); // Passing search term to API call
//     }
//   };

//   // Function to handle search input change
//   const handleSearchChange = (event) => {
//     const term = event.target.value;
//     setSearchTerm(term);

//     // Re-fetch data with the updated search term
//     if (selectedCloud && selectedType) {
//       fetchData(selectedCloud, selectedType, term);
//     }
//   };

//   const fetchData = async (cloudType, type, search = '') => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/cloudService`, {
//         params: {
//           cloud: cloudType,
//           type: type,
//           search: search // Added search parameter to the request
//         }
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const columns = React.useMemo(
//     () => [
//       { Header: 'Name', accessor: 'name' },
//       { Header: 'Type', accessor: 'type' },
//       { Header: 'Resource', accessor: 'resource' },
//     ],
//     []
//   );

//   const tableInstance = useTable({ columns, data });

//   return (
//     <div>
//       <h1>Select a Cloud Provider</h1>
//       <select onChange={handleSelectChange} value={selectedCloud}>
//         <option value="">Select...</option>
//         <option value="AWS">AWS</option>
//         <option value="Azure">Azure</option>
//         <option value="GCP">GCP</option>
//       </select>

//       {selectedCloud && (
//         <select onChange={handleTypeChange} value={selectedType}>
//           <option value="">Select Type...</option>
//           <option value="node">Node</option>
//           <option value="relation">Relation</option>
//           <option value="both">Both</option>
//         </select>
//       )}

//       {/* Search box */}
//       {selectedCloud && selectedType && (
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           style={{ marginTop: '10px' }}
//         />
//       )}

//       {data.length > 0 && (
//         <table {...tableInstance.getTableProps()} style={{ marginTop: '20px', width: '100%' }}>
//           <thead>
//             {tableInstance.headerGroups.map((headerGroup, headerIndex) => (
//               <tr {...headerGroup.getHeaderGroupProps()} key={`header-${headerIndex}`}>
//                 {headerGroup.headers.map((column, columnIndex) => (
//                   <th {...column.getHeaderProps()} key={`header-col-${columnIndex}`}>
//                     {column.render('Header')}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...tableInstance.getTableBodyProps()}>
//             {tableInstance.rows.map((row, rowIndex) => {
//               tableInstance.prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
//                   {row.cells.map((cell, cellIndex) => (
//                     <td {...cell.getCellProps()} key={`cell-${rowIndex}-${cellIndex}`}>
//                       {cell.render('Cell')}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default CloudServiceSelector;





// import React, { useState } from 'react';
// import axios from 'axios';
// import { useTable } from 'react-table';
// import '../../Style_css/CloudServiceSelector.css';

// const CloudServiceSelector = () => {
//   const [selectedCloud, setSelectedCloud] = useState('');
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSelectChange = async (event) => {
//     const cloudType = event.target.value;
//     setSelectedCloud(cloudType);
//     setData([]); // Clear previous data
//     setError(''); // Clear previous error

//     if (cloudType) {
//       setLoading(true); // Start loading
//       try {
//         const response = await axios.get(`http://localhost:8000/api/dynamodb/services?cloud=${cloudType}`);
//         setData(response.data);

//         // Check if data is empty and set error message accordingly
//         if (response.data.length === 0) {
//           setError(`No data available for ${cloudType}`); // Set error message
//         } else {
//           setError(''); // Clear error if data is present
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError('Failed to fetch data. Please try again.');
//       }
//       setLoading(false); // End loading
//     }
//   };

//   const columns = React.useMemo(
//     () => [
//       { Header: 'Name', accessor: 'ServiceName' }, // Match to actual data key
//       { Header: 'Type', accessor: 'Type' },         // Match to actual data key
//       { Header: 'Category', accessor: 'Category' }, // Match to actual data key
//     ],
//     []
//   );

//   const tableInstance = useTable({ columns, data });

//   return (
//     <div className="cloud-service-selector">
//       <h1>Select a Cloud Provider</h1>
//       <select onChange={handleSelectChange} value={selectedCloud}>
//         <option value="">Select...</option>
//         <option value="AWS">AWS</option>
//         <option value="Azure">Azure</option>
//         <option value="GCP">GCP</option>
//       </select>

//       {/* Show error if something went wrong */}
//       {error && <p className="error-message">{error}</p>}

//       {/* Loading state */}
//       {loading && <p>Loading...</p>}

//       {/* Table rendering */}
//       {data.length > 0 ? (
//         <table {...tableInstance.getTableProps()} style={{ marginTop: '20px', width: '100%' }}>
//           <thead>
//             {tableInstance.headerGroups.map(headerGroup => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                   <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...tableInstance.getTableBodyProps()}>
//             {tableInstance.rows.map(row => {
//               tableInstance.prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map(cell => (
//                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       ) : (
//         !loading && selectedCloud && !error && <p>No data available for {selectedCloud}</p>
//       )}
//     </div>
//   );
// };

// export default CloudServiceSelector;



import React, { useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import '../../Style_css/CloudServiceSelector.css';

const CloudServiceSelector = () => {
  const [selectedCloud, setSelectedCloud] = useState('');
  const [selectedType, setSelectedType] = useState(''); // State for selected type
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectChange = (event) => {
    const cloudType = event.target.value;
    setSelectedCloud(cloudType);
    setData([]); // Clear previous data
    setError(''); // Clear previous error

    // Fetch data only if both cloudType and selectedType are set
    if (cloudType && selectedType) {
      fetchData(cloudType, selectedType);
    }
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    setData([]); // Clear previous data
    setError(''); // Clear previous error

    // Fetch data only if both cloudType and selectedType are set
    if (selectedCloud && type) {
      fetchData(selectedCloud, type); // Fetch data based on selected cloud and type
    }
  };

  const fetchData = async (cloudType, type) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`http://localhost:8000/api/dynamodb/services?cloud=${cloudType}&type=${type}`);
      
      console.log('API Response:', response.data); // Log the API response for debugging

      setData(response.data);

      // Check if data is empty and set error message accordingly
      if (response.data.length === 0) {
        setError(`No data available for ${cloudType} with type ${type}`); // Set error message
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Name', accessor: 'ServiceName' },
      { Header: 'Type', accessor: 'Type' },
      { Header: 'Category', accessor: 'Category' },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  return (
    <div className="cloud-service-selector">
      <h1>Select a Cloud Provider</h1>
      <select onChange={handleSelectChange} value={selectedCloud}>
        <option value="">Select Cloud...</option>
        <option value="AWS">AWS</option>
        <option value="Azure">Azure</option>
        <option value="GCP">GCP</option>
      </select>

      <select onChange={handleTypeChange} value={selectedType} disabled={!selectedCloud}>
        <option value="">Select Type...</option>
        <option value="Resource">Resource</option>
        <option value="Relation">Relation</option>
        <option value="Both">Both</option>
      </select>

      {/* Show error if something went wrong */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Table rendering */}
      {data.length > 0 ? (
        <table {...tableInstance.getTableProps()} style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            {tableInstance.headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...tableInstance.getTableBodyProps()}>
            {tableInstance.rows.map(row => {
              tableInstance.prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !loading && selectedCloud && selectedType && !error && <p>No data available for {selectedCloud} with type {selectedType}</p>
      )}
    </div>
  );
};

export default CloudServiceSelector;
