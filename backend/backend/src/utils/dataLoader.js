// backend/src/utils/queryUtils.js

const processSalesData = (salesData, query = {}) => {
    
    // 1. START WITH FULL DATASET - SAFEST CHECK
    let filteredData = (Array.isArray(salesData) ? salesData.slice() : []);

    // --- 2. GLOBAL SEARCH (Functionality for Search Bar) ---
    if (query.searchTerm && query.searchTerm.trim() !== '') {
        const searchTermLower = query.searchTerm.toLowerCase();
        
        filteredData = filteredData.filter(item => {
            // Check for search term across relevant fields for highlighting/filtering
            const customerName = item['Customer Name'] || '';
            const phoneNumber = item['Phone Number'] || '';
            const transactionId = item['Transaction ID'] || '';

            return String(customerName).toLowerCase().includes(searchTermLower) ||
                   String(phoneNumber).includes(searchTermLower) ||
                   String(transactionId).toLowerCase().includes(searchTermLower);
        });
    }
    
    // --- 3. FILTERING (Functionality for Dropdowns: Gender, Region, etc.) ---
    const specificFilterKeys = [
        'customer_region', 
        'gender', 
        'product_category',
        'age_range', // Age Range will be handled separately below for its logic
    ];
    
    // Handle simple equality filters (Region, Gender, Category)
    specificFilterKeys.forEach(fieldKey => {
        const value = query[fieldKey];

        if (value && typeof value === 'string' && value.trim() !== '') {
            // Convert frontend key (customer_region) to data key (Customer Region)
            const dataKey = fieldKey.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');

            filteredData = filteredData.filter(item => (item[dataKey] === value));
        }
    });

    // Handle Age Range Filter (Range Logic)
    if (query.age_range && query.age_range.trim() !== '') {
        const range = query.age_range; 
        const [minStr, maxStr] = range.split('-');
        const min = parseInt(minStr, 10);
        const max = maxStr ? parseInt(maxStr, 10) : Infinity;

        filteredData = filteredData.filter(item => {
            const age = parseInt(item['Age'], 10);
            return (!isNaN(min) && age >= min) && 
                   (max !== Infinity ? age <= max : true);
        });
    }
    
    // --- 4. SORTING LOGIC ---
    const sortMapping = {
        'Transaction ID': 'Transaction ID', 
        'Date': 'Date', 
        'Final Amount': 'Final Amount', 
        'customer_name': 'Customer Name'
    };
    
    const clientSortKey = query.sort || 'Transaction ID'; 
    const dataSortKey = sortMapping[clientSortKey] || clientSortKey;
    const sortOrder = (query.sortOrder || 'desc').toLowerCase(); 

    filteredData.sort((a, b) => {
        let valA = a[dataSortKey] || ''; 
        let valB = b[dataSortKey] || '';

        if (dataSortKey === 'Date') {
            valA = new Date(valA || 0);
            valB = new Date(valB || 0);
        } else if (dataSortKey === 'Final Amount') {
             valA = parseFloat(valA || 0);
             valB = parseFloat(valB || 0);
        } else {
             // For strings (Names, IDs), use localeCompare
             if (sortOrder === 'asc') {
                 return String(valA).localeCompare(String(valB));
             } else {
                 return String(valB).localeCompare(String(valA));
             }
        }
        
        // For numbers/dates
        const comparison = (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
        return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    // --- 5. PAGINATION ---
    const pageSize = 10;
    const page = parseInt(query.page) || 1;
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (page - 1) * pageSize;
    
    const paginatedData = filteredData.slice(skip, skip + pageSize); 

    return {
        data: paginatedData,
        page: page,
        pageSize: pageSize,
        totalItems: totalItems,
        totalPages: totalPages
    };
};

module.exports = {
    processSalesData,
};