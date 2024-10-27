// const express = require('express');
// const { getResources, getLLMResponse, login, getServices,getAllItemsAPI, getAllServiceNamesAPI,cloud_function,send_node_data, runQuery, architecture,fetchAccounts,fetchRegionsForAccount,fetchControlledServicesForRegion,fetchMonitoringServicesForRegion
//  } = require('../controller/resourceController'); // Ensure the path is correct
// const router = express.Router();
// router.post('/llm', getLLMResponse);
// router.get('/resources', getResources);
// router.post('/login', login);
// router.get('/cloudService', getServices);
// router.get('/cloud_function',cloud_function);
// router.post('/send-node-data',send_node_data);
// router.post('/runquery',runQuery)

// // Add new route for retrieving service names from DynamoDB
// router.get('/dynamodb/services', getAllServiceNamesAPI);
// router.get('/dynamodb/all-items',getAllItemsAPI);


// // Route to get all accounts
// router.get('/accounts', fetchAccounts);

// // Route to get regions for a specific account
// router.get('/regions/:accountName', fetchRegionsForAccount);

// // Route to get controlled services for a specific account and region
// router.get('/controlled-services/:accountName/:regionName', fetchControlledServicesForRegion);

// // Route to get monitoring services for a specific account and region
// router.get('/monitoring-services/:accountName/:regionName', fetchMonitoringServicesForRegion);


// router.get('/architecture', architecture);


// module.exports = router;



const express = require('express');
const {
  getResources,
  getLLMResponse,
  login,
  getServices,
  getAllItemsAPI,
  getAllServiceNamesAPI,
  cloud_function,
  send_node_data,
  runQuery,
  architecture,
  fetchAccounts,
  fetchRegionsForAccount,
  fetchControlledServicesForRegion,
  fetchMonitoringServicesForRegion,
  getVpcs,
  getSubnets,
  getExternalServices,
  fetchRegionsForMultipleAccounts
} = require('../controller/resourceController'); // Ensure the path is correct

const router = express.Router();

// LLM Endpoint
router.post('/llm', getLLMResponse);

// Resource Management
router.get('/resources', getResources);
router.post('/login', login);
router.get('/cloudService', getServices);
router.get('/cloud_function', cloud_function);
router.post('/send-node-data', send_node_data);
router.post('/runquery', runQuery);

// DynamoDB Services
router.get('/dynamodb/services', getAllServiceNamesAPI);
router.get('/dynamodb/all-items', getAllItemsAPI);

// AWS Account Management
router.get('/accounts', fetchAccounts);
router.get('/regions/:accountName', fetchRegionsForAccount);
router.get('/controlled-services/:accountName/:regionName', fetchControlledServicesForRegion);
router.get('/monitoring-services/:accountName/:regionName', fetchMonitoringServicesForRegion);
router.get('/vpcs/:accountName/:regionName', getVpcs);
router.get('/subnets/:accountName/:regionName', getSubnets);
router.get('/external/:accountName', getExternalServices);

router.post('/accounts/regions', fetchRegionsForMultipleAccounts);
router.get('/architecture', architecture);

module.exports = router;
