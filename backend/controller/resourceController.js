const neo4j = require('neo4j-driver');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const connectdb = require('../config/db');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
const driver = connectdb();
const session = driver.session();
// Configure AWS with credentials and session token
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN, // Include session token
});

// Initialize DynamoDB Document Client
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Function to retrieve all items from the DynamoDB table
const getAllItemsAPI = async (req, res) => {
    const params = {
        TableName: 'EnabledServices',
    };

    try {
        const data = await dynamodb.scan(params).promise();
        // console.log('All Items:', JSON.stringify(data.Items, null, 2)); // Log all items
        res.json(data.Items); // Send all items back in JSON format
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Failed to retrieve services' });
    }
};

// Function to retrieve service names based on cloud and type
const getAllServiceNamesAPI = async (req, res) => {
    const { cloud, type } = req.query; // Destructure both cloud and type from query
    // Create the params for DynamoDB query
    const params = {
        TableName: 'EnabledServices',
        FilterExpression: '#type = :cloudType AND #serviceType = :serviceType',
        ExpressionAttributeNames: {
            '#type': 'Type', // Map the placeholder for cloud type
            '#serviceType': 'Category', // Assuming 'Category' is the name of the service type field
        },
        ExpressionAttributeValues: {
            ':cloudType': cloud, // Value for cloud filtering
            ':serviceType': type, // Value for service type filtering
        },
    };

    try {
        const data = await dynamodb.scan(params).promise();
        // console.log('DynamoDB Response:', JSON.stringify(data, null, 2)); // Log the response
        res.json(data.Items); // Send filtered items back in JSON format
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Failed to retrieve services' });
    }
};


//getresource

const getResources = async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.run('MATCH (n:Resource) RETURN n');
        const resources = result.records.map(record => record.get('n').properties);
        res.json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await session.close();
    }
};

// Controller function for LLM API call
const getLLMResponse = async (req, res) => {
    const { prompt } = req.body;

    // Validate that prompt exists in the request body
    if (!prompt) {
        return res.status(400).json({ success: false, message: 'Prompt is required' });
    }

    // Check if the LLM_API_KEY is set
    if (!process.env.LLM_API_KEY) {
        return res.status(500).json({ success: false, message: 'LLM_API_KEY is not set' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.LLM_API_KEY}`, // Ensure LLM_API_KEY is set in your environment variables
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Specify the model you want to use
                messages: [{ role: "user", content: prompt }], // Format the message as required by OpenAI API
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error fetching LLM response:', errorData);
            return res.status(response.status).json({ success: false, message: errorData.error.message });
        }

        const data = await response.json();
        const content = data.choices[0].message.content; // Extract only the content from the response
        res.json({ success: true, content });
    } catch (error) {
        console.error('Error fetching LLM response:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
  
const getServices = async (req, res) => {
    const cloudType = req.query.cloud;
    const types = req.query.type;
    const search = req.query.search || ''; // Add search term
  
    const session = driver.session();
    try {
      let query;
      let params = { cloudType, types }; // Ensure types is passed as a parameter


      // Normalize the search term to lowercase
      const searchLower = search.toLowerCase();
      params.search = searchLower; // Update params to use the lowercase search term

  
      if (types === 'node') {
        query = `
          MATCH (v:ServiceList {type: $cloudType, resource: $types}) 
          WHERE v.name CONTAINS $search
          RETURN v.name AS name, v.type AS type, "node" AS resource
        `;
      } else if (types === 'relation') {
        query = `
          MATCH (v:ServiceList {type: $cloudType, resource: $types})
          WHERE v.name CONTAINS $search
          RETURN v.name AS name, v.type AS type, "relation" AS resource
        `;
      } else if (types === 'both') {
        query = `
          MATCH (v:ServiceList {type: $cloudType}) 
          WHERE v.name CONTAINS $search
          RETURN v.name AS name, v.type AS type, v.resource AS resource
        `;
        delete params.types; // Remove the 'types' parameter if it's not needed
      }
  
      params.search = search;
  
      const result = await session.run(query, params);
      const services = result.records.map(record => ({
        name: record.get('name'),
        type: record.get('type'),
        resource: record.get('resource'),
      }));
  
      res.json(services);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    } finally {
      await session.close();
    }
  };
  
  
  

// login
const login = async (req, res) => {
    const { email, password } = req.body;
    const session = driver.session();

    try {
        const result = await session.run(
            'MATCH (l:login {email: $email}) RETURN l',
            { email }
        );

        // console.log('Result:', result.records); // Log the result

        if (result.records.length > 0) {
            const user = result.records[0].get('l').properties; // Access the properties of the node
            // console.log('User:', user); // Log the user object
            
            if (user.password === password) {
                res.status(200).json({ success: true });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    } finally {
        await session.close();
    }
};


//architecture

const cloud_function= async (req, res) => {
    const session = driver.session();
    try {
      const result = await session.run(`
        MATCH (cloudFunc:Resource {name: "cloud_function"})-[rel1:CONNECTED_TO {attribute: "functions.serviceAccountEmail"}]->(serviceAccount:Resource {name: "function-sa@project-id.iam.gserviceaccount.com"}),
              (iamCloudFunc:Resource {name: "iam_cloud_function"})-[rel2:CONNECTED_TO {attribute: "accounts.email"}]->(serviceAccount)
        WITH cloudFunc, iamCloudFunc, serviceAccount
        MATCH (cloudFunc)-[rel3:CONNECTED_TO]-(connectedNodes)
        WITH cloudFunc, iamCloudFunc, serviceAccount, rel3, connectedNodes
        MATCH (iamCloudFunc)-[rel4:CONNECTED_TO]-(connectedNodes2)
        RETURN cloudFunc, iamCloudFunc, serviceAccount, rel3, rel4, connectedNodes, connectedNodes2
      `);
      // console.warn(result.records);
      if (result.records.length === 0) {
        console.warn('No records found for the given query.');
        return res.json({ nodes: [], links: [] });
      }
  
      const nodesMap = new Map(); // Declare a Map to hold unique nodes
      const links = [];
  
      result.records.forEach(record => {
        // Process cloudFunc node
        const cloudFunc = record.get('cloudFunc');
        const cloudFuncId = cloudFunc.identity.toString();
        const cloudFuncLabel = cloudFunc.properties.name || 'Unnamed Function';
        const cloudFuncVersion = cloudFunc.properties.version.low || 'Unnamed Function';
        nodesMap.set(cloudFuncId, { id: cloudFuncId, label: cloudFuncLabel, version: cloudFuncVersion });
  
        // Process iamCloudFunc node
        const iamCloudFunc = record.get('iamCloudFunc');
        const iamCloudFuncId = iamCloudFunc.identity.toString();
        const iamCloudFuncLabel = iamCloudFunc.properties.name || 'Unnamed IAM Function';
        const iamCloudFuncVersion = iamCloudFunc.properties.version.low || 'Unnamed IAM Function';
        nodesMap.set(iamCloudFuncId, { id: iamCloudFuncId, label: iamCloudFuncLabel, version: iamCloudFuncVersion });
  
        // Process serviceAccount node
        const serviceAccount = record.get('serviceAccount');
        let serviceAccountId = null;
  
        if (serviceAccount) {
          serviceAccountId = serviceAccount.identity.toString();
          const serviceAccountLabel = serviceAccount.properties.name || 'Unnamed Service Account';
          const serviceAccountVersion = serviceAccount.properties.version.low || 'Unnamed Service Account';
          nodesMap.set(serviceAccountId, { id: serviceAccountId, label: serviceAccountLabel, version: serviceAccountVersion });
          links.push({ source: cloudFuncId, target: serviceAccountId });
          links.push({ source: iamCloudFuncId, target: serviceAccountId });
        } else {
          console.warn('Service account not found for cloud function:', cloudFuncLabel);
        }
  
        // Process connected nodes from cloudFunc
        const connectedNodes = record.get('connectedNodes');
        if (connectedNodes) {
          const nodesArray = Array.isArray(connectedNodes) ? connectedNodes : [connectedNodes];
          nodesArray.forEach(node => {
            const connectedNodeId = node.identity.toString();
            const connectedNodeLabel = node.properties.name || 'Unnamed Node';
            const connectedNodeVersion = node.properties.version.low || 'Unnamed Node';
            nodesMap.set(connectedNodeId, { id: connectedNodeId, label: connectedNodeLabel, version: connectedNodeVersion });
            links.push({ source: cloudFuncId, target: connectedNodeId });
          });
        }
  
        // Process connected nodes from iamCloudFunc
        const connectedNodes2 = record.get('connectedNodes2');
        if (connectedNodes2) {
          const nodesArray2 = Array.isArray(connectedNodes2) ? connectedNodes2 : [connectedNodes2];
          nodesArray2.forEach(node => {
            const connectedNodeId = node.identity.toString();
            const connectedNodeLabel = node.properties.name || 'Unnamed Node';
            const connectedNodeVersion = node.properties.version.low || 'Unnamed Node';
            nodesMap.set(connectedNodeId, { id: connectedNodeId, label: connectedNodeLabel, version: connectedNodeVersion });
            links.push({ source: iamCloudFuncId, target: connectedNodeId });
          });
        }
      });
  
      // Convert Map values back to an array for the response
      const nodes = Array.from(nodesMap.values());
  
      res.json({ nodes, links });
    } catch (error) {
      console.error('Error fetching cloud_function data:', error);
      res.status(500).json({ error: error.message });
    } finally {
      await session.close();
    }
  };



const send_node_data= async (req, res) => {
    const session = driver.session();
    try {
      // Make sure req.label exists and sanitize it if necessary
      const result = await session.run(
        `MATCH (startNode:Resource {name: $startNodeName}), 
              (endNode:Resource {name: 'iam_cloud_function'})
         MATCH path = shortestPath((startNode)-[*]-(endNode))
         RETURN path`,
        { startNodeName: req.body.label } // use parameterized queries to avoid injection
      );
  
      // Process the result as needed
      const path = result.records.length > 0 ? result.records[0].get('path') : null;
      // console.log("---------Path-------->".path)
  
      // Return the path or some other response
      if (path) {
        res.json({ message: 'Path found', path });
      } else {
        res.status(404).send('No path found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching path from Neo4j');
    } finally {
      await session.close();
    }
  };  

  /**
 * Run a Cypher query in Neo4j.
 * @param {string} query - The Cypher query string.
 * @param {object} parameters - The parameters to pass into the query.
 * @returns {Promise<Array>} - The result of the query as an array of records.
 */
const runQuery = async (req, res) => {
  const session = driver.session(); // Create a session

  try {
    // Get the Cypher query and parameters from the request body
    const { query, parameters } = req.body;

    // Validate the query input
    if (!query) {
      return res.status(400).send({ error: 'Query is required in the request body.' });
    }

    // Execute the query
    const result = await session.run(query, parameters || {});

    // Extract the result as an array of objects
    const records = result.records.map(record => record.toObject());

    // Send the result back as JSON
    res.json(records);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send({ error: 'An error occurred while executing the query.' });
  } finally {
    await session.close(); // Always close the session
  }
};



const architecture = async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (n) RETURN DISTINCT labels(n) AS labels, count(n) AS count');
    const records = result.records.map(record => ({
      labels: record.get('labels'),
      count: record.get('count')
    }));
    res.json({
      totalCount: records.length,
      data: records,
    });
  } catch (error) {
    console.error('Error fetching data from Neo4j:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await session.close();
  }
};

//

// Fetch all accounts
const fetchAccounts = async (req, res) => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (a:Account) RETURN a');
    const accounts = result.records.map(record => record.get('a').properties);
    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching accounts');
  } finally {
    session.close();
  }
};

// Fetch regions for a specific account
const fetchRegionsForAccount = async (req, res) => {
  const { accountName } = req.params;
  console.log(accountName);
  const session = driver.session();
  try {
    const result = await session.run('MATCH (a:Account {name: $accountName})-[:HAS_REGION]->(r:Region) RETURN r', {
      accountName,
    });
    const regions = result.records.map(record => record.get('r').properties);
    res.json(regions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching regions');
  } finally {
    session.close();
  }
};

// Fetch controlled services for a specific account and region
const fetchControlledServicesForRegion = async (req, res) => {
  const { accountName, regionName } = req.params;
  const session = driver.session();
  try {
    const result = await session.run(
      'MATCH (a:Account {name: $accountName})-[:HAS_REGION]->(r:Region {name: $regionName})-[:HAS_CONTROLLED_SERVICE]->(s:ControlledService) RETURN s',
      { accountName, regionName }
    );
    const services = result.records.map(record => record.get('s').properties);
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching controlled services');
  } finally {
    session.close();
  }
};

// Fetch monitoring services for a specific account and region
const fetchMonitoringServicesForRegion = async (req, res) => {
  const { accountName, regionName } = req.params;
  const session = driver.session();
  try {
    const result = await session.run(
      'MATCH (a:Account {name: $accountName})-[:HAS_REGION]->(r:Region {name: $regionName})-[:HAS_MONITORING_SERVICE]->(s:MonitoringService) RETURN s',
      { accountName, regionName }
    );
    const services = result.records.map(record => record.get('s').properties);
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching monitoring services');
  } finally {
    session.close();
  }
};


const getVpcs = async (req, res) => {
  const { accountName, regionName } = req.params;
  try {
    const result = await session.run(
      'MATCH (a:Account {name: $accountName})-[:HAS_REGION]->(r:Region {name: $regionName})<-[:HAS_REGION]-(vpc:VPC) RETURN vpc.name AS name',
      { accountName, regionName }
    );
    const vpcs = result.records.map(record => record.get('name'));
    res.json(vpcs);
    console.log(vpcs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching VPCs' });
  }
};

const getSubnets = async (req, res) => {
  const { accountName, regionName } = req.params;
  const session = driver.session(); // Assuming `driver` is your Neo4j driver
  try {
    const result = await session.run(
      'MATCH (a:Account {name: $accountName})-[:HAS_REGION]->(r:Region {name: $regionName})<-[:HAS_REGION]-(vpc:VPC)-[:HAS_SUBNET]->(subnet:Subnet) RETURN subnet.name AS name,subnet.public AS type',
      { accountName, regionName }
    );

    const subnets = result.records.map(record => ({
      name: record.get('name'),
      type: record.get('type')
    }));
    res.json(subnets);
    console.log(subnets);
  } catch (error) {
    console.error('Error fetching subnets:', error);
    res.status(500).json({ error: 'Error fetching subnets' });
  } finally {
    session.close(); // Always close the session
  }
};


const getExternalServices = async (req, res) => {
  const { accountName } = req.params;
  try {
    const result = await session.run(
      'MATCH (a:Account {name: $accountName})-[:USES_EXTERNAL_SERVICE]->(es:ExternalService) RETURN es.name AS name',
      { accountName }
    );
    const services = result.records.map(record => record.get('name'));
    res.json(services);
    console.log(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching external services' });
  }
};

// 
const fetchRegionsForMultipleAccounts = async (req, res) => {
  const { accountNames } = req.body; // Expecting an array of account names in the request body
  const session = driver.session();
  
  try {
    const result = await session.run(
      'MATCH (a:Account)-[:HAS_REGION]->(r:Region) WHERE a.name IN $accountNames RETURN a.name AS accountName, r',
      { accountNames }
    );

    const accountRegions = result.records.reduce((acc, record) => {
      const accountName = record.get('accountName');
      const region = record.get('r').properties;

      if (!acc[accountName]) {
        acc[accountName] = [];
      }
      acc[accountName].push(region);
      return acc;
    }, {});

    res.json(accountRegions);
  } catch (error) {
    console.error('Error fetching regions for multiple accounts:', error);
    res.status(500).send('Error fetching regions for multiple accounts');
  } finally {
    session.close();
  }
};


module.exports = {
    getResources,login,getLLMResponse,getServices,getAllServiceNamesAPI,getAllItemsAPI,cloud_function,send_node_data,runQuery,
    architecture,fetchMonitoringServicesForRegion,fetchControlledServicesForRegion,fetchRegionsForAccount,fetchAccounts,getVpcs,getSubnets,getExternalServices,fetchRegionsForMultipleAccounts
};









