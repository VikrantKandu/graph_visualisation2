// src/data/resources.js
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';
import DataObjectIcon from '@mui/icons-material/DataObject';
import StorageIcon from '@mui/icons-material/Storage';
import DatasetIcon from '@mui/icons-material/Dataset';

export const resources = [
  { category: 'Compute', name: 'Virtual Machine', details: 'A Virtual Machine is a software emulation of a physical computer.', icon: <ComputerIcon /> },
  { category: 'Compute', name: 'Virtual Machine Image', details: 'An image used to boot up Virtual Machines.', icon: <ComputerIcon /> },
  { category: 'Compute', name: 'Container', details: 'A lightweight package of software that includes everything needed to run it.', icon: <ComputerIcon /> },
  { category: 'Compute', name: 'Load Balancer', details: 'Distributes network or application traffic across a number of servers.', icon: <ComputerIcon /> },
  { category: 'Compute', name: 'Serverless Function', details: 'Event-driven execution environment for running code.', icon: <ComputerIcon /> },
  { category: 'Data', name: 'Bucket', details: 'A bucket is used to store objects in a cloud platform.', icon: <StorageIcon /> },
  { category: 'Data', name: 'Data Warehouse', details: 'A centralized repository for storing and analyzing data.', icon: <DataObjectIcon /> },
  { category: 'Data', name: 'Data Stream', details: 'A real-time stream of data for analytics and monitoring.', icon: <DataObjectIcon /> },
  { category: 'Data', name: 'Database', details: 'An organized collection of structured information.', icon: <DataObjectIcon /> },
  { category: 'AI', name: 'AI Dataset', details: 'A dataset used for machine learning and AI training.', icon: <DatasetIcon /> },
  { category: 'AI', name: 'Machine Learning Model', details: 'A mathematical model trained on data to make predictions.', icon: <DatasetIcon /> },
  { category: 'AI', name: 'Neural Network', details: 'A series of algorithms that attempt to recognize underlying relationships in a set of data.', icon: <DatasetIcon /> },
  { category: 'Networking', name: 'Virtual Private Cloud', details: 'A secure private cloud that exists within a public cloud.', icon: <CloudIcon /> },
  { category: 'Networking', name: 'VPN Gateway', details: 'A network node that connects two different networks using a secure connection.', icon: <CloudIcon /> },
  { category: 'Security', name: 'Identity and Access Management', details: 'Framework for business processes that facilitates the management of electronic identities.', icon: <CloudIcon /> },
  { category: 'Security', name: 'Web Application Firewall', details: 'A security system that monitors and controls incoming and outgoing network traffic.', icon: <CloudIcon /> },
  { category: 'Storage', name: 'Object Storage', details: 'Storing data as objects rather than as files or blocks.', icon: <StorageIcon /> },
  { category: 'Storage', name: 'Block Storage', details: 'A data storage model that breaks data into blocks and stores them separately.', icon: <StorageIcon /> },
  { category: 'Storage', name: 'File Storage', details: 'A storage architecture that allows data to be stored as files.', icon: <StorageIcon /> },
];
