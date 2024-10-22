// const express = require('express');
// const { getResources, getLLMResponse, login, getServices, getServicesFromDynamoDB } = require('../controller/resourceController'); // Make sure the path is correct
// const router = express.Router();


// // Route for LLM API call
// router.post('/llm', getLLMResponse);
// router.get('/resources', getResources); // Ensure this matches the path you're accessing
// router.post('/login', login);
// router.get('/cloudService',getServices);

// // Add new routes for DynamoDB and Neo4j service retrieval
// router.get('/dynamodb/services', getServicesFromDynamoDB);
// module.exports = router;


const express = require('express');
const { getResources, getLLMResponse, login, getServices,getAllItemsAPI, getAllServiceNamesAPI,cloud_function,send_node_data } = require('../controller/resourceController'); // Ensure the path is correct
const router = express.Router();

// Route for LLM API call
router.post('/llm', getLLMResponse);
router.get('/resources', getResources);
router.post('/login', login);
router.get('/cloudService', getServices);
router.get('/cloud_function',cloud_function);
router.post('/send-node-data',send_node_data);


// Add new route for retrieving service names from DynamoDB
router.get('/dynamodb/services', getAllServiceNamesAPI);
router.get('/dynamodb/all-items',getAllItemsAPI);
module.exports = router;
