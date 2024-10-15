const express = require('express');
const { getResources } = require('../controller/resourceController');

const router = express.Router();

router.get('/resources', getResources); // Ensure this matches the path you're accessing

module.exports = router;
