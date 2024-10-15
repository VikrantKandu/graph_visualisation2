const neo4j = require('neo4j-driver');
require('dotenv').config();

let driver;

const connectdb = () => {
    if (!driver) { // Prevent multiple connections
        try {
            const neo4jUri = process.env.NEO4J_URI;
            const neo4jUser = process.env.NEO4J_USER;
            const neo4jPassword = process.env.NEO4J_PASSWORD;

            driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
            console.log('Successfully connected to Neo4j');
        } catch (error) {
            console.error('Failed to connect to Neo4j:', error);
            process.exit(1);
        }
    }
    return driver; // Return the driver instance
};

module.exports = connectdb;
