const { getProcessedSalesData } = require('../services/salesService');

const getSalesData = (req, res) => {
    try {
        // --- 1. Safely Extract and Default All Query Parameters ---
        // Provide defaults for ALL keys expected by the frontend URL and the backend processing logic.
        const { 
            // Pagination/Sorting
            search: searchTerm = '',         
            page = 1,
            sort: sortBy = 'Date', 
            sortOrder = 'desc',
            
            // Filter Keys (must match frontend/queryUtils naming conventions)
            customer_region = '',
            gender = '',
            product_category = '',
            age_range = '',
            date_filter = ''
        } = req.query;

        // --- 2. Construct the Flat Query Object for the Service Layer ---
        // This is the clean, simple object structure that queryUtils.js is designed to process.
        const queryParams = {
            searchTerm,
            sortBy,
            sortOrder,
            page: parseInt(page, 10), // Ensure page is an integer
            
            // Pass filter keys directly
            customer_region,
            gender,
            product_category,
            age_range,
            date_filter
        };

        // --- 3. Call the Service Layer ---
        const result = getProcessedSalesData(queryParams);

        // --- 4. Send Successful Response ---
        res.status(200).json(result);
    } catch (error) {
        // CRITICAL: Catch any error thrown by the service or utility layers.
        console.error('Final API Crash in salesController:', error);
        
        // Send a generic, safe 500 status back to the frontend
        res.status(500).json({ error: 'Failed to fetch sales data' });
    }
};

module.exports = { getSalesData };