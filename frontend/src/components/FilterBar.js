import React from 'react';

// Component receives props from Dashboard.js
const FilterBar = ({ queryParams, onSearchChange, handleFilterChange, handleClearAll }) => {
  
  // Generic handler for all select/dropdown filters
  const handleSelectChange = (key, event) => {
      handleFilterChange(key, event.target.value);
  };
  
  // Handler for Sort By selection
  const handleSortChange = (event) => {
      handleFilterChange('sort', event.target.value); 
  };
  
  // MOCK OPTIONS for Dropdowns
  const regionOptions = ['East', 'West', 'North', 'South', 'Central'];
  const productCategoryOptions = ['Electronics', 'Clothing', 'Beauty']; 
  const ageRangeOptions = ['18-25', '26-40', '41-60', '60+'];
  
  // The structure is now:
  // [Filters] [Tags Placeholder] [Payment Method Placeholder] [Sort Dropdown] [Search Bar]
  // This structure matches the mockups and ensures maximum horizontal spacing.

  return (
    <div className="filter-bar-container">
        
        {/* CRITICAL: The main filter row container */}
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', /* Distribute space horizontally */
            alignItems: 'center',
            marginBottom: '15px',
            gap: '10px' /* General spacing between major elements */
        }}>
            
            {/* 1. LEFT SIDE: PRIMARY FILTERS (Region, Gender, Age, Category, Clear All) */}
            <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '10px' }}>
                
                {/* --- REGION DROP DOWN --- */}
                <select 
                    onChange={(e) => handleSelectChange('customer_region', e)} 
                    value={queryParams.customer_region || ''}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Region</option>
                    {regionOptions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>

                {/* --- GENDER DROP DOWN --- */}
                <select 
                    onChange={(e) => handleSelectChange('gender', e)} 
                    value={queryParams.gender || ''}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                
                {/* --- AGE RANGE DROP DOWN --- */}
                <select 
                    onChange={(e) => handleSelectChange('age_range', e)} 
                    value={queryParams.age_range || ''}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Age Range</option>
                    {ageRangeOptions.map(range => (
                        <option key={range} value={range}>{range}</option>
                    ))}
                </select>

                {/* --- PRODUCT CATEGORY DROP DOWN --- */}
                <select 
                    onChange={(e) => handleSelectChange('product_category', e)} 
                    value={queryParams.product_category || ''}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Product Category</option>
                    {productCategoryOptions.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                
                {/* --- CLEAR ALL BUTTON --- */}
                <button 
                    onClick={handleClearAll}
                    style={{ 
                        padding: '8px 12px', 
                        backgroundColor: '#dc3545', 
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Clear All
                </button>
            </div>


            {/* 2. RIGHT SIDE: SEARCH BAR AND SORTING CONTROLS */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                
                {/* --- SORT DROPDOWN --- */}
                <select 
                    onChange={handleSortChange}
                    value={queryParams.sort || 'date_newest'}
                    style={{ 
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        minWidth: '200px'
                    }}
                >
                  <option value="date_newest">Sort By: Date (Newest)</option>
                  <option value="date_oldest">Sort By: Date (Oldest)</option>
                  <option value="customer_name_asc">Sort By: Customer Name (A-Z)</option>
                  <option value="amount_high">Sort By: Amount (High)</option>
                </select>

                {/* --- SEARCH INPUT FIELD --- */}
                <input
                    type="text"
                    placeholder="Name, Phone no. or ID"
                    value={queryParams.search}
                    onChange={onSearchChange}
                    className="search-input"
                    style={{ 
                        width: '300px', 
                        padding: '8px 12px', 
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

        </div>
        
        {/* Note: The mockups do not show the "Sort By" control on a separate line 
           when the search bar is pushed right; they are consolidated. 
           If you need the "Sort By" line separate, we can revert that specific styling.
        */}
    </div>
  );
};

export default FilterBar;