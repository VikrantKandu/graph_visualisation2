const express = require("express");
const connectdb = require('./config/db');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();

// Connect to the database
connectdb();

app.use(express.json()); // Middleware to parse JSON requests
app.use('/api', resourceRoutes); // Use the routes under /api

const port = process.env.PORT || 6000;

const server = app.listen(port, (err) => {
    if (err) {
        console.log(`Error in server listening: ${err}`);
        return;
    }
    console.log(`Server listening at http://localhost:${port}`);
});
