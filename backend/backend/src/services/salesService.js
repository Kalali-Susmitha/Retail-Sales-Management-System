const utils = require('../utils/queryUtils');
const { getSalesDataArray } = require('../utils/dataLoader'); 

const getProcessedSalesData = (query) => {
    try {
        const salesData = getSalesDataArray(); 
        
        // CRITICAL DIAGNOSTIC CHECK: Ensure data is an array before processing
        if (!Array.isArray(salesData) || salesData.length === 0) {
            console.warn("DIAGNOSTIC: Data is not available as a valid array (length 0 or invalid type). Returning empty set.");
            return { data: [], page: 1, pageSize: 10, totalItems: 0, totalPages: 0 };
        }

        // --- Execution continues only if data is confirmed to be an array ---
        // This is the line that will crash if the logic fails
        const result = utils.processSalesData(salesData, query); 
        return result;

    } catch (error) {
        // CATCH: If queryUtils.processSalesData crashes, catch it here 
        // and return a successful empty array object instead of crashing the API.
        console.error("FINAL CRASH POINT (Service Layer):", error);
        return { data: [], page: 1, pageSize: 10, totalItems: 0, totalPages: 0 };
    }
};

module.exports = {
    getProcessedSalesData, 
};