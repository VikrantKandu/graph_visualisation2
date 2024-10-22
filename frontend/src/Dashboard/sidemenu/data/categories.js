// src/data/categories.js
import ListAltIcon from '@mui/icons-material/ListAlt';
import StarIcon from '@mui/icons-material/Star';
import ComputerIcon from '@mui/icons-material/Computer';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings'; // For Configuration
import SecurityIcon from '@mui/icons-material/Security'; // For Identity and Secrets
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'; // For Networking

export const categories = [
  { name: 'Popular', icon: <StarIcon /> },
  { name: 'Application', icon: <ComputerIcon /> },
  { name: 'Configuration', icon: <SettingsIcon /> }, // Updated for Configuration
  { name: 'Data', icon: <CloudIcon /> },
  { name: 'Identity', icon: <SecurityIcon /> }, // Updated for Identity
  { name: 'Management', icon: <ComputerIcon /> },
  { name: 'Networking', icon: <NetworkCheckIcon /> }, // Updated for Networking
  { name: 'Secrets', icon: <SecurityIcon /> }, // Updated for Secrets
  { name: 'Vulnerability', icon: <StorageIcon /> },
];
