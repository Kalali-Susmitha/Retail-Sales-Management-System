import React, { useState } from 'react';
import FilterBar from './FilterBar';
import TransactionTable from './TransactionTable'; 

const Dashboard = () => {
    // LIFTED STATE: State is defined here to be shared by FilterBar and TransactionTable
    const [queryParams, setQueryParams] = useState({
        search: '',
        page: 1,
        // Include default sort and ALL filter keys in initial state
        sort: 'date_newest', 
        
        // --- ADDED MISSING FILTER KEYS ---
        customer_region: '',
        gender: '',
        product_category: '',
        // ---------------------------------
        
        age_range: '',
        date_filter: '',
    });

    // Handler functions (handleSearchChange, handleFilterChange, handleClearAll, etc.) remain correct.

    const handleSearchChange = (event) => {
        setQueryParams(prev => ({ 
            ...prev, 
            search: event.target.value,
            page: 1 
        }));
    };

    // Handler for changing any filter (Region, Gender, Age Range, etc.)
    const handleFilterChange = (key, value) => {
        setQueryParams(prev => ({
            ...prev,
            [key]: value, 
            page: 1       
        }));
    };

    // HANDLER: Resets ALL search, filter, and page states
    const handleClearAll = () => {
        setQueryParams({
            search: '',
            page: 1,
            customer_region: '',
            gender: '',
            product_category: '',
            age_range: '',
            date_filter: '',
            sort: 'date_newest', 
        });
    };

    // Handler for moving to the next page
    const handleNextPage = () => {
        setQueryParams(prev => ({ 
            ...prev, 
            page: prev.page + 1 
        }));
    };

    // Handler for moving to the previous page
    const handlePrevPage = () => {
        setQueryParams(prev => ({ 
            ...prev, 
            page: Math.max(1, prev.page - 1) 
        }));
    };

    return (
        <div className="dashboard-content">
            {/* 1. Filter Bar */}
            <FilterBar 
                queryParams={queryParams} 
                onSearchChange={handleSearchChange}
                handleFilterChange={handleFilterChange}
                handleClearAll={handleClearAll}
            />

            {/* 2. Transaction Table */}
            <TransactionTable 
                queryParams={queryParams} 
                setQueryParams={setQueryParams}
                handleFilterChange={handleFilterChange} 
                handleNextPage={handleNextPage} 
                handlePrevPage={handlePrevPage} 
            />
        </div>
    );
};

export default Dashboard;