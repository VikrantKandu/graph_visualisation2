// import React, { useState } from 'react';
// import './CloudArchitecture.css';

// const Cloud_Function = () => {
//   const [selectedAccount, setSelectedAccount] = useState('');
//   const [selectedRegion, setSelectedRegion] = useState('');

//   // Sample data for accounts and regions
//   const accounts = ['Account 1', 'Account 2', 'Account 3'];
//   const regions = ['us-east-1', 'us-west-1', 'eu-central-1'];

//   const handleAccountChange = (event) => {
//     setSelectedAccount(event.target.value);
//   };

//   const handleRegionChange = (event) => {
//     setSelectedRegion(event.target.value);
//   };

//   return (
//     <div className="cloud-container">
//       {/* Dropdowns for account and region selection */}
//       <div className="dropdowns">
//         <select value={selectedAccount} onChange={handleAccountChange}>
//           <option value="">Select AWS Account</option>
//           {accounts.map((account, index) => (
//             <option key={index} value={account}>
//               {account}
//             </option>
//           ))}
//         </select>

//         <select value={selectedRegion} onChange={handleRegionChange}>
//           <option value="">Select Region</option>
//           {regions.map((region, index) => (
//             <option key={index} value={region}>
//               {region}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Render main content only when both selections are made */}
//       {selectedAccount && selectedRegion && (
//         <>
//           {/* Virtual Cloud and VPC */}
//           <div className="virtual-cloud">
//             <h2>Virtual Cloud</h2>

//             {/* Top Boxes: Controlled Services and Monitoring along the VPC line */}
//             <div className="vpc-services">
//               {/* Controlled Services (IAM) */}
//               <div className="controlled-services">
//                 <h6>Controlled Services</h6>
//                 <div className="iam">IAM</div>
//               </div>

//               {/* Monitoring and Operations (CloudWatch) */}
//               <div className="monitoring-operations">
//                 <h6>Monitoring and Operations</h6>
//                 <div className="cloudwatch">CloudWatch (cw)</div>
//               </div>
//             </div>

//             {/* VPC + Region */}
//             <div className="vpc-region">
//               <h3>VPC (vpc + Region)</h3>

//               {/* Subnets (AZs) */}
//               <div className="subnets">
//                 <div className="subnet">Subnet (Subnet + AZs)</div>
//                 <div className="subnet">Subnet</div>
//                 <div className="subnet">Subnet</div>
//               </div>
//             </div>
//           </div>

//           {/* External Services (Outside VPC) */}
//           <div className="external-services">
//             <div className="outside-vpc-regional">
//               <h4>Outside VPC - Regional</h4>
//               <div className="dynamodb">DynamoDB</div>
//             </div>

//             <div className="outside-vpc-global">
//               <h4>Outside VPC - Across Regional</h4>
//               <div className="s3">S3</div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cloud_Function;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './CloudArchitecture.css';

// const Cloud_Function = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [controlledServices, setControlledServices] = useState([]);
//   const [monitoringServices, setMonitoringServices] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState('');
//   const [selectedRegion, setSelectedRegion] = useState('');
//   console.log(monitoringServices);
//   console.log(controlledServices);
//   // Fetch accounts from the API
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/accounts');
//         setAccounts(response.data);
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//       }
//     };
//     fetchAccounts();
//   }, []);

//   // Fetch regions for the selected account
//   useEffect(() => {
//     const fetchRegions = async () => {
//       if (selectedAccount) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/regions/${selectedAccount}`);
//           setRegions(response.data);
//           setSelectedRegion(''); // Reset region when account changes
//         } catch (error) {
//           console.error('Error fetching regions:', error);
//         }
//       }
//     };
//     fetchRegions();
//   }, [selectedAccount]);

//   // Fetch controlled services for the selected account and region
//   useEffect(() => {
//     const fetchControlledServices = async () => {
//       if (selectedAccount && selectedRegion) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/controlled-services/${selectedAccount}/${selectedRegion}`);
//           setControlledServices(response.data);
//         } catch (error) {
//           console.error('Error fetching controlled services:', error);
//         }
//       }
//     };
//     fetchControlledServices();
//   }, [selectedAccount, selectedRegion]);

//   // Fetch monitoring services for the selected account and region
//   useEffect(() => {
//     const fetchMonitoringServices = async () => {
//       if (selectedAccount && selectedRegion) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/monitoring-services/${selectedAccount}/${selectedRegion}`);
//           setMonitoringServices(response.data);
//         } catch (error) {
//           console.error('Error fetching monitoring services:', error);
//         }
//       }
//     };
//     fetchMonitoringServices();
//   }, [selectedAccount, selectedRegion]);

//   const handleAccountChange = (event) => {
//     setSelectedAccount(event.target.value);
//   };

//   const handleRegionChange = (event) => {
//     setSelectedRegion(event.target.value);
//   };

//   return (
//     <div className="cloud-container">
//       {/* Dropdowns for account and region selection */}
//       <div className="dropdowns">
//         <select value={selectedAccount} onChange={handleAccountChange}>
//           <option value="">Select AWS Account</option>
//           {accounts.map((account, index) => (
//             <option key={index} value={account.name}>
//               {account.name}
//             </option>
//           ))}
//         </select>

//         <select value={selectedRegion} onChange={handleRegionChange}>
//           <option value="">Select Region</option>
//           {regions.map((region, index) => (
//             <option key={index} value={region.name}>
//               {region.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Render main content only when both selections are made */}
//       {selectedAccount && selectedRegion && (
//         <>
//           {/* Virtual Cloud and VPC */}
//           <div className="virtual-cloud">
//             <h2>Virtual Cloud</h2>

//             {/* Top Boxes: Controlled Services and Monitoring along the VPC line */}
//             <div className="vpc-services">
//               {/* Controlled Services */}
//               <div className="controlled-services">
//                 <h6>Controlled </h6>
//                 {controlledServices.length > 0 ? (
//                   controlledServices.map((service, index) => (
//                     <div key={index} className="iam">{service.name || 'Unknown Service'}</div>
//                   ))
//                 ) : (
//                   <div>No controlled services found.</div>
//                 )}
//               </div>

//               {/* Monitoring and Operations */}
//               <div className="monitoring-operations">
//                 <h6>Monitoring</h6>
//                 {monitoringServices.length > 0 ? (
//                   monitoringServices.map((service, index) => (
//                     <div key={index} className="cloudwatch">{service.name || 'Unknown Service'}</div>
//                   ))
//                 ) : (
//                   <div>No monitoring services found.</div>
//                 )}
//               </div>
//             </div>

//             {/* VPC + Region */}
//             <div className="vpc-region">
//               <h3>VPC (vpc + Region)</h3>

//               {/* Subnets (AZs) */}
//               <div className="subnets">
//                 <div className="subnet">Subnet (Subnet + AZs)</div>
//                 <div className="subnet">Subnet</div>
//                 <div className="subnet">Subnet</div>
//               </div>
//             </div>
//           </div>

//           {/* External Services (Outside VPC) */}
//           <div className="external-services">
//             <div className="outside-vpc-regional">
//               <h4>Outside VPC - Regional</h4>
//               <div className="dynamodb">DynamoDB</div>
//             </div>

//             <div className="outside-vpc-global">
//               <h4>Outside VPC - Across Regional</h4>
//               <div className="s3">S3</div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cloud_Function;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Row, Col, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './CloudArchitecture.css';

// const Cloud_Function = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [controlledServices, setControlledServices] = useState([]);
//   const [monitoringServices, setMonitoringServices] = useState([]);
//   const [vpcs, setVpcs] = useState([]);
//   const [subnets, setSubnets] = useState([]);
//   const [externalServices, setExternalServices] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState('');
//   const [selectedRegion, setSelectedRegion] = useState('');
//   const [publicSubnets, setPublicSubnets] = useState([]);
//   const [privateSubnets, setPrivateSubnets] = useState([]);
//   // Fetch accounts from the API
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/accounts');
//         setAccounts(response.data);
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//       }
//     };
//     fetchAccounts();
//   }, []);

//   // Fetch regions for the selected account
//   useEffect(() => {
//     const fetchRegions = async () => {
//       if (selectedAccount) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/regions/${selectedAccount}`);
//           setRegions(response.data);
//           setSelectedRegion(''); // Reset region when account changes
//         } catch (error) {
//           console.error('Error fetching regions:', error);
//         }
//       }
//     };
//     fetchRegions();
//   }, [selectedAccount]);

//   // Fetch controlled services for the selected account and region
//   useEffect(() => {
//     const fetchControlledServices = async () => {
//       if (selectedAccount && selectedRegion) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/controlled-services/${selectedAccount}/${selectedRegion}`);
//           setControlledServices(response.data);
//         } catch (error) {
//           console.error('Error fetching controlled services:', error);
//         }
//       }
//     };
//     fetchControlledServices();
//   }, [selectedAccount, selectedRegion]);

//   // Fetch monitoring services for the selected account and region
//   useEffect(() => {
//     const fetchMonitoringServices = async () => {
//       if (selectedAccount && selectedRegion) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/monitoring-services/${selectedAccount}/${selectedRegion}`);
//           setMonitoringServices(response.data);
//         } catch (error) {
//           console.error('Error fetching monitoring services:', error);
//         }
//       }
//     };
//     fetchMonitoringServices();
//   }, [selectedAccount, selectedRegion]);

//   // Fetch VPCs for the selected account and region
//   useEffect(() => {
//     const fetchVpcs = async () => {
//       if (selectedAccount && selectedRegion) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/vpcs/${selectedAccount}/${selectedRegion}`);
//           setVpcs(response.data);
//         } catch (error) {
//           console.error('Error fetching VPCs:', error);
//         }
//       }
//     };
//     fetchVpcs();
//   }, [selectedAccount, selectedRegion]);

//   useEffect(() => {
//     const fetchSubnets = async () => {
//       if (selectedAccount && selectedRegion) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/subnets/${selectedAccount}/${selectedRegion}`);
//           setSubnets(response.data);

//           // Filter based on boolean type
//           setPublicSubnets(response.data.filter(subnet => subnet.type));
//           setPrivateSubnets(response.data.filter(subnet => !subnet.type));
//         } catch (error) {
//           console.error('Error fetching subnets:', error);
//           // Optionally set an error state to inform the user
//         }
//       }
//     };

//     fetchSubnets();
//   }, [selectedAccount, selectedRegion]);
//   // Fetch external services for the selected account
//   useEffect(() => {
//     const fetchExternalServices = async () => {
//       if (selectedAccount) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/external/${selectedAccount}`);
//           setExternalServices(response.data);
//         } catch (error) {
//           console.error('Error fetching external services:', error);
//         }
//       }
//     };
//     fetchExternalServices();
//   }, [selectedAccount]);

//   const handleAccountChange = (event) => {
//     setSelectedAccount(event.target.value);
//   };

//   const handleRegionChange = (event) => {
//     setSelectedRegion(event.target.value);
//   };

//   return (
//     <div className="cloud-container">
//       <div className="dropdowns">
//         <select value={selectedAccount} onChange={handleAccountChange}>
//           <option value="">Select AWS Account</option>
//           {accounts.map((account, index) => (
//             <option key={index} value={account.name}>
//               {account.name}
//             </option>
//           ))}
//         </select>

//         <select value={selectedRegion} onChange={handleRegionChange}>
//           <option value="">Select Region</option>
//           {regions.map((region, index) => (
//             <option key={index} value={region.name}>
//               {region.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedAccount && selectedRegion && (
//         <>
//           <div className="virtual-cloud">
//             <h2>Virtual Cloud</h2>

//             <div className="vpc-services">
//               <div className="controlled-services">
//                 <h6>Controlled</h6>
//                 <Container>
//                   {controlledServices.length > 0 ? (
//                     <Row>
//                       {controlledServices.map((service, index) => (
//                         <Col key={index} xs={12} sm={6} md={4} lg={3} className="service-box controlled-service">
//                           {service.name || 'Unknown Service'}
//                         </Col>
//                       ))}
//                     </Row>
//                   ) : (
//                     <Row>
//                       <Col>
//                         <div>No controlled services found.</div>
//                       </Col>
//                     </Row>
//                   )}
//                 </Container>
//               </div>

//               <div className="monitoring-operations">
//                 <h6>Monitoring</h6>
//                 {monitoringServices.length > 0 ? (
//                   monitoringServices.map((service, index) => (
//                     <div key={index} className="service-box monitoring-service">
//                       {service.name || 'Unknown Service'}
//                     </div>
//                   ))
//                 ) : (
//                   <div>No monitoring services found.</div>
//                 )}
//               </div>
//             </div>


//             {Array.isArray(vpcs) && vpcs.length > 0 ? (
//               vpcs.map((vpc, index) => (
//                 <div key={index}>
//                   {vpc || 'Unknown VPC'}
//                 </div>
//               ))
//             ) : (
//               <div>No VPCs found.</div>
//             )}

//             <div className="subnets-container">
//               <div className="public-subnets">
//                 <h3>Public Subnets</h3>
//                 {publicSubnets.length > 0 ? (
//                   publicSubnets.map(subnet => (
//                     <div key={subnet.name} className="subnet-box">
//                       {subnet.name || 'Unknown Public Subnet'}
//                     </div>
//                   ))
//                 ) : (
//                   <div>No public subnets found.</div>
//                 )}
//               </div>

//               <div className="private-subnets">
//                 <h3>Private Subnets</h3>
//                 {privateSubnets.length > 0 ? (
//                   privateSubnets.map(subnet => (
//                     <div key={subnet.name} className="subnet-box">
//                       {subnet.name || 'Unknown Private Subnet'}
//                     </div>
//                   ))
//                 ) : (
//                   <div>No private subnets found.</div>
//                 )}
//               </div>
//             </div>




//           </div>

//           <div className="external-services">
//             {Array.isArray(externalServices) && externalServices.length > 0 ? (
//               externalServices.map((service, index) => (
//                 <div key={index} className="service-box-external-service">
//                   {service || 'Unknown External Service'}
//                 </div>
//               ))
//             ) : (
//               <div>No external services found.</div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cloud_Function;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Row, Col, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './CloudArchitecture.css';

// const CloudArchitecture = () => {
//   const [accounts, setAccounts] = useState([]);
//   const [regions, setRegions] = useState([]);
//   const [controlledServices, setControlledServices] = useState([]);
//   const [monitoringServices, setMonitoringServices] = useState([]);
//   const [vpcs, setVpcs] = useState([]);
//   const [subnets, setSubnets] = useState([]);
//   const [externalServices, setExternalServices] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState('');
//   const [selectedRegions, setSelectedRegions] = useState([]);
//   const [publicSubnets, setPublicSubnets] = useState([]);
//   const [privateSubnets, setPrivateSubnets] = useState([]);

//   // Fetch accounts from the API
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/accounts');
//         setAccounts(response.data);
//       } catch (error) {
//         console.error('Error fetching accounts:', error);
//       }
//     };
//     fetchAccounts();
//   }, []);

//   // Fetch regions for the selected account
//   useEffect(() => {
//     const fetchRegions = async () => {
//       if (selectedAccount) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/regions/${selectedAccount}`);
//           setRegions(response.data);
//         } catch (error) {
//           console.error('Error fetching regions:', error);
//         }
//       }
//     };
//     fetchRegions();
//   }, [selectedAccount]);

//   // Fetch controlled services, monitoring services, VPCs, and subnets for selected account and regions
//   useEffect(() => {
//     const fetchDataForRegion = async () => {
//       if (selectedAccount && selectedRegions.length > 0) {
//         try {
//           const responses = await Promise.all(selectedRegions.map(region =>
//             Promise.all([
//               axios.get(`http://localhost:8000/api/controlled-services/${selectedAccount}/${region}`),
//               axios.get(`http://localhost:8000/api/monitoring-services/${selectedAccount}/${region}`),
//               axios.get(`http://localhost:8000/api/vpcs/${selectedAccount}/${region}`),
//               axios.get(`http://localhost:8000/api/subnets/${selectedAccount}/${region}`)
//             ])
//           ));

//           const newControlledServices = responses.flatMap(r => r[0].data);
//           const newMonitoringServices = responses.flatMap(r => r[1].data);
//           const newVpcs = responses.flatMap(r => r[2].data);
//           const newSubnets = responses.flatMap(r => r[3].data);

//           setControlledServices(newControlledServices);
//           setMonitoringServices(newMonitoringServices);
//           setVpcs(newVpcs);
//           setSubnets(newSubnets);

//           setPublicSubnets(newSubnets.filter(subnet => subnet.type));
//           setPrivateSubnets(newSubnets.filter(subnet => !subnet.type));
//         } catch (error) {
//           console.error('Error fetching data for regions:', error);
//         }
//       }
//     };

//     fetchDataForRegion();
//   }, [selectedAccount, selectedRegions]);

//   // Fetch external services for the selected account
//   useEffect(() => {
//     const fetchExternalServices = async () => {
//       if (selectedAccount) {
//         try {
//           const response = await axios.get(`http://localhost:8000/api/external/${selectedAccount}`);
//           setExternalServices(response.data);
//         } catch (error) {
//           console.error('Error fetching external services:', error);
//         }
//       }
//     };
//     fetchExternalServices();
//   }, [selectedAccount]);

//   const handleAccountChange = (event) => {
//     setSelectedAccount(event.target.value);
//     setSelectedRegions([]);
//     setControlledServices([]);
//     setMonitoringServices([]);
//     setVpcs([]);
//     setSubnets([]);
//     setPublicSubnets([]);
//     setPrivateSubnets([]);
//     setExternalServices([]);
//   };

//   const handleRegionChange = (event) => {
//     const value = event.target.value;
//     setSelectedRegions(prev =>
//       prev.includes(value) ? prev.filter(r => r !== value) : [...prev, value]
//     );
//   };

//   return (

//     <div className="cloud-container">
//       <div className="dropdowns">
//         <select value={selectedAccount} onChange={handleAccountChange}>
//           <option value="">Select AWS Account</option>
//           {accounts.map((account, index) => (
//             <option key={index} value={account.name}>
//               {account.name}
//             </option>
//           ))}
//         </select>

//         <select value={selectedRegions} onChange={handleRegionChange}>
//           <option value="">Select Region</option>
//           {regions.map((region, index) => (
//             <option key={index} value={region.name}>
//               {region.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedAccount && selectedRegions && (
//         <>
//           <div className="virtual-cloud">
//             <h2>Virtual Cloud</h2>

//             <div className="vpc-services">
//               <div className="controlled-services">
//                 <h6>Controlled</h6>
//                 <Container>
//                   {controlledServices.length > 0 ? (
//                     <Row>
//                       {controlledServices.map((service, index) => (
//                         <Col key={index} xs={12} sm={6} md={4} lg={3} className="service-box controlled-service">
//                           {service.name || 'Unknown Service'}
//                         </Col>
//                       ))}
//                     </Row>
//                   ) : (
//                     <Row>
//                       <Col>
//                         <div>No controlled services found.</div>
//                       </Col>
//                     </Row>
//                   )}
//                 </Container>
//               </div>

//               <div className="monitoring-operations">
//                 <h6>Monitoring</h6>
//                 {monitoringServices.length > 0 ? (
//                   monitoringServices.map((service, index) => (
//                     <div key={index} className="service-box monitoring-service">
//                       {service.name || 'Unknown Service'}
//                     </div>
//                   ))
//                 ) : (
//                   <div>No monitoring services found.</div>
//                 )}
//               </div>
//             </div>


//             {Array.isArray(vpcs) && vpcs.length > 0 ? (
//               vpcs.map((vpc, index) => (
//                 <div key={index}>
//                   {vpc || 'Unknown VPC'}
//                 </div>
//               ))
//             ) : (
//               <div>No VPCs found.</div>
//             )}

//             <div className="subnets-container">
//               <div className="public-subnets">
//                 <h3>Public Subnets</h3>
//                 {publicSubnets.length > 0 ? (
//                   publicSubnets.map(subnet => (
//                     <div key={subnet.name} className="subnet-box">
//                       {subnet.name || 'Unknown Public Subnet'}
//                     </div>
//                   ))
//                 ) : (
//                   <div>No public subnets found.</div>
//                 )}
//               </div>

//               <div className="private-subnets">
//                 <h3>Private Subnets</h3>
//                 {privateSubnets.length > 0 ? (
//                   privateSubnets.map(subnet => (
//                     <div key={subnet.name} className="subnet-box">
//                       {subnet.name || 'Unknown Private Subnet'}
//                     </div>
//                   ))
//                 ) : (
//                   <div>No private subnets found.</div>
//                 )}
//               </div>
//             </div>




//           </div>

//           <div className="external-services">
//             {Array.isArray(externalServices) && externalServices.length > 0 ? (
//               externalServices.map((service, index) => (
//                 <div key={index} className="service-box-external-service">
//                   {service || 'Unknown External Service'}
//                 </div>
//               ))
//             ) : (
//               <div>No external services found.</div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CloudArchitecture;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CloudArchitecture.css';

const CloudArchitecture = () => {
  const [accounts, setAccounts] = useState([]);
  const [regions, setRegions] = useState([]);
  const [controlledServices, setControlledServices] = useState([]);
  const [monitoringServices, setMonitoringServices] = useState([]);
  const [newVpcs, setVpcs] = useState([]);
  const [subnets, setSubnets] = useState([]);
  const [externalServices, setExternalServices] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [publicSubnets, setPublicSubnets] = useState([]);
  const [privateSubnets, setPrivateSubnets] = useState([]);
  console.log(newVpcs);
  // Fetch accounts from the API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  // Fetch regions for the selected account
  useEffect(() => {
    const fetchRegions = async () => {
      if (selectedAccount) {
        try {
          const response = await axios.get(`http://localhost:8000/api/regions/${selectedAccount}`);
          setRegions(response.data);
        } catch (error) {
          console.error('Error fetching regions:', error);
        }
      }
    };
    fetchRegions();
  }, [selectedAccount]);

  // Fetch controlled services, monitoring services, VPCs, and subnets for selected account and regions
  useEffect(() => {
    const fetchDataForRegion = async () => {
      if (selectedAccount && selectedRegions.length > 0) {
        try {
          const responses = await Promise.all(
            selectedRegions.map(region =>
              Promise.all([
                axios.get(`http://localhost:8000/api/controlled-services/${selectedAccount}/${region}`),
                axios.get(`http://localhost:8000/api/monitoring-services/${selectedAccount}/${region}`),
                axios.get(`http://localhost:8000/api/vpcs/${selectedAccount}/${region}`),
                axios.get(`http://localhost:8000/api/subnets/${selectedAccount}/${region}`)
              ])
            )
          );

          const newControlledServices = responses.flatMap(r => r[0].data);
          const newMonitoringServices = responses.flatMap(r => r[1].data);
          const newVpcs = responses.flatMap(r => r[2].data);
          const newSubnets = responses.flatMap(r => r[3].data);
          console.log(newSubnets);
          setControlledServices(newControlledServices);
          setMonitoringServices(newMonitoringServices);
          setVpcs(newVpcs);
          setSubnets(newSubnets);
          // console.log(setSubnets);
          setPublicSubnets(newSubnets.filter(subnet => subnet.type));
          setPrivateSubnets(newSubnets.filter(subnet => !subnet.type));
        } catch (error) {
          console.error('Error fetching data for regions:', error);
        }
      }
    };

    fetchDataForRegion();
  }, [selectedAccount, selectedRegions]);

  // Fetch external services for the selected account
  useEffect(() => {
    const fetchExternalServices = async () => {
      if (selectedAccount) {
        try {
          const response = await axios.get(`http://localhost:8000/api/external/${selectedAccount}`);
          setExternalServices(response.data);
        } catch (error) {
          console.error('Error fetching external services:', error);
        }
      }
    };
    fetchExternalServices();
  }, [selectedAccount]);

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
    setSelectedRegions([]);
    setControlledServices([]);
    setMonitoringServices([]);
    setVpcs([]);
    setSubnets([]);
    setPublicSubnets([]);
    setPrivateSubnets([]);
    setExternalServices([]);
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    setSelectedRegions(prev =>
      prev.includes(value) ? prev.filter(r => r !== value) : [...prev, value]
    );
  };

  return (
    <div className="cloud-container">
      <div className="dropdowns">
        <select value={selectedAccount} onChange={handleAccountChange}>
          <option value="">Select AWS Account</option>
          {accounts.map((account, index) => (
            <option key={index} value={account.name}>
              {account.name}
            </option>
          ))}
        </select>

        <select value={selectedRegions} onChange={handleRegionChange} multiple>
          <option value="">Select Region</option>
          {regions.map((region, index) => (
            <option key={index} value={region.name}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      {selectedAccount && selectedRegions.length > 0 && (
        <>
          <div className="virtual-cloud">
            <h2>Virtual Cloud</h2>

            <div className="vpc-services">
              <div className="controlled-services">
                {/* <h6>Controlled</h6> */}
                <Container fluid>
                  {controlledServices.length > 0 ? (
                    <Row
                      style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        gap: '20px',
                        overflowX: 'auto',
                        width: '100%', // Make Row take the full width of the screen
                        height: 'auto', // Set to auto to avoid fixed height issues
                        alignItems: 'flex-start', // Align items to the top for better layout
                        padding: '10px',
                      }}
                    >
                      {controlledServices.map((service, index) => (
                        <div
                          key={index}
                          className="service-box controlled-service"
                          style={{
                            minWidth: '100px', // Set a more spacious minimum width for better readability
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            textAlign: 'center',
                          }}
                        >
                          {service.name || 'Unknown Service'}
                        </div>
                      ))}
                    </Row>
                  ) : (
                    <Row>
                      <Col>
                        <div>No controlled services found.</div>
                      </Col>
                    </Row>
                  )}
                </Container>


              </div>

              <div className="monitoring-operations">
                {/* <h6>Monitoring</h6> */}
                {monitoringServices.length > 0 ? (
                  monitoringServices.map((service, index) => (
                    <div key={index} className="service-box monitoring-service">
                      {service.name || 'Unknown Service'}
                    </div>
                  ))
                ) : (
                  <div>No monitoring services found.</div>
                )}
              </div>
            </div>


            {newVpcs.length > 0 ? (
              newVpcs.map(newVpcs => (
                <div key={newVpcs} >
                  {newVpcs || 'Unknown Public Vpcs'}
                </div>
              ))
            ) : (
              <div>No public subnets found.</div>
            )}

            <div className="subnets-container">
              <div className="public-subnets">
                <h3>Public</h3>
                {publicSubnets.length > 0 ? (
                  publicSubnets.map(subnet => (
                    <div key={subnet.name} className="subnet-box">
                      {subnet.name || 'Unknown Public Subnet'}
                    </div>
                  ))
                ) : (
                  <div>No public subnets found.</div>
                )}
              </div>

              <div className="private-subnets">
                <h3>Private</h3>
                {privateSubnets.length > 0 ? (
                  privateSubnets.map(subnet => (
                    <div key={subnet.name} className="subnet-box">
                      {subnet.name || 'Unknown Private Subnet'}
                    </div>
                  ))
                ) : (
                  <div>No private subnets found.</div>
                )}
              </div>
            </div>



          </div>

          <div className="external-services">
            {Array.isArray(externalServices) && externalServices.length > 0 ? (
              externalServices.map((service, index) => (
                <div key={index} className="service-box-external-service">
                  {service || 'Unknown External Service'}
                </div>
              ))
            ) : (
              <div>No external services found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CloudArchitecture;
