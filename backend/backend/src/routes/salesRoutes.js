// backend/src/routes/salesRoutes.js

const express = require('express');
const router = express.Router();
const { processSalesData } = require('../utils/queryUtils'); 

// CRITICAL: This route handler is synchronized with queryUtils.js
router.get('/', async (req, res) => {
    try {
        // Calls the single-argument, async processSalesData function
        const result = await processSalesData(req.query); 
        res.json(result);
    } catch (error) {
        // This catch block handles the 500 status error
        console.error("Error processing sales data:", error);
        res.status(500).json({ error: 'Failed to fetch sales data' });
    }
});

module.exports = router;