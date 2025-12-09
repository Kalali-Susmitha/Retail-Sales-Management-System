// Function to handle filtering, searching, and pagination
const processSalesData = (data, query) => {
    let filteredData = [...data];

    // 1. GLOBAL SEARCH
    if (query.search) {
        const searchTerm = query.search.toLowerCase();
        
        filteredData = filteredData.filter(record => {
            const nameMatch = record['Customer Name']?.toLowerCase().includes(searchTerm);
            const phoneMatch = record['Phone Number']?.includes(searchTerm);
            const idMatch = record['Transaction ID']?.includes(searchTerm);
            
            return nameMatch || phoneMatch || idMatch;
        });
    }

    // 2. FILTERING BLOCK
    
    // Filter by Region
    if (query.customer_region) {
        const regionFilter = query.customer_region;
        filteredData = filteredData.filter(record => {
            return record['Customer Region'] === regionFilter;
        });
    }

    // Filter by Gender
    if (query.gender) {
        const genderFilter = query.gender;
        filteredData = filteredData.filter(record => {
            return record.Gender?.toLowerCase() === genderFilter.toLowerCase();
        });
    }

    // Filter by Product Category
    if (query.product_category) {
        const productFilter = query.product_category;
        filteredData = filteredData.filter(record => {
            return record['Product Category'] === productFilter;
        });
    }
    
    // Filter by Age Range
    if (query.age_range) {
        filteredData = filteredData.filter(record => {
            const age = parseInt(record.Age);
            const [minStr, maxStr] = query.age_range.split('-');
            const min = parseInt(minStr);
            const max = maxStr ? parseInt(maxStr) : Infinity; 
            
            if (isNaN(age)) return false; 
            return age >= min && age <= max;
        });
    }

    // Date Filter Logic REMOVED

    // 3. SORTING LOGIC 
    if (query.sort) {
        if (query.sort === 'customer_name_asc') {
            filteredData.sort((a, b) => {
                const nameA = a['Customer Name']?.toUpperCase() || '';
                const nameB = b['Customer Name']?.toUpperCase() || '';
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
        }
        else if (query.sort === 'date_newest') {
            filteredData.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        }
        else if (query.sort === 'date_oldest') {
            filteredData.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        }
        else if (query.sort === 'amount_high') {
            filteredData.sort((a, b) => {
                const amountA = parseFloat(a['Final Amount']?.replace(/[^0-9.-]+/g,"")) || 0;
                const amountB = parseFloat(b['Final Amount']?.replace(/[^0-9.-]+/g,"")) || 0;
                return amountB - amountA; 
            });
        }
    }
    
    // 4. PAGINATION SETUP
    const pageSize = 10;
    const page = parseInt(query.page) || 1;
    
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    const currentPage = Math.max(1, Math.min(page, totalPages || 1)); 

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        page: currentPage,
        pageSize: pageSize,
        totalItems: totalItems,
        totalPages: totalPages
    };
};

module.exports = {
    processSalesData,
};