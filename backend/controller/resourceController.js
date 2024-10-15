const neo4j = require('neo4j-driver');
const connectdb = require('../config/db');

const driver = connectdb();

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

module.exports = {
    getResources,
};
