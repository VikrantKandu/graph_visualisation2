const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from 'public' directory

// Set Neo4j connection details
const neo4jUri = 'neo4j+s://7d76c4ea.databases.neo4j.io:7687'; // Replace with your Neo4j URI
const neo4jUser = 'neo4j'; // Replace with your Neo4j username
const neo4jPassword = 'JZXfDTU7pl8wOPfrnaUujXnX8zvanhYn_bn5j53NeXg'; // Replace with your Neo4j password

// Ensure environment variables are set
if (!neo4jUri || !neo4jUser || !neo4jPassword) {
  console.error('Neo4j connection details are missing!');
  process.exit(1); // Exit if details are not set
}

// Initialize Neo4j driver
let driver;
try {
  driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
  console.log('Successfully connected to Neo4j');
} catch (error) {
  console.error('Failed to connect to Neo4j:', error);
  process.exit(1);
}

// Login API route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Start a new session
    const session = driver.session();

    try {
        // Query the login node with the provided email and password
        const result = await session.run(
            'MATCH (l:login {email: $email, password: $password}) RETURN l',
            { email, password }
        );

        // Check if a matching record was found
        if (result.records.length > 0) {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    } finally {
        // Close the session after the query completes
        await session.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
