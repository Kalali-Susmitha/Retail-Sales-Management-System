// File: TransactionTable.js

import React, { useEffect, useState, useMemo } from "react";
import "../styles/TransactionTable.css";

// Define all columns and their corresponding data keys in the JSON file.
// NOTE: "Region" and "Product Category" are used for filtering but NOT displayed here 
// as they are not visible in the screenshot's table body.
const TABLE_COLUMNS = [
    { title: "Trans. ID", key: "Transaction ID" },
    { title: "Date", key: "Date" },
    { title: "Customer ID", key: "Customer ID" },
    { title: "Customer Name", key: "Customer Name" },
    { title: "Phone", key: "Phone Number" }, // Key used in data
    { title: "Gender", key: "Gender" },
    { title: "Age", key: "Age" },
    { title: "Product Name", key: "Product Name" },
    { title: "Qty", key: "Quantity" },
    { title: "Final Amount", key: "Final Amount" },
];


const TransactionTable = ({ queryParams, setQueryParams }) => {
    const [salesData, setSalesData] = useState([]);

    // Load Sales JSON - Unchanged
    useEffect(() => {
        fetch("/sales.json")
            .then((res) => res.json())
            .then((data) => setSalesData(data))
            .catch((err) => console.error("Error loading JSON:", err));
    }, []);

    // Function to filter, search, and sort the data (wrapped in useMemo)
    const processedData = useMemo(() => {
        let filtered = salesData;
        const { search, customer_region, gender, product_category, age_range, sort } = queryParams;

        // 1. --- SEARCH FILTER ---
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(item => 
                item["Customer Name"].toLowerCase().includes(searchLower) ||
                item["Phone Number"].toString().includes(searchLower) ||
                item["Customer ID"].toLowerCase().includes(searchLower)
            );
        }

        // 2. --- DROPDOWN FILTERS (These rely on keys that may not be displayed but must exist in sales.json) ---
        if (customer_region) {
            filtered = filtered.filter(item => item["Customer Region"] === customer_region);
        }
        if (gender) {
            filtered = filtered.filter(item => item["Gender"] === gender);
        }
        if (product_category) {
            filtered = filtered.filter(item => item["Product Category"] === product_category);
        }
        
        // 3. --- AGE RANGE FILTER ---
        if (age_range) {
            filtered = filtered.filter(item => {
                const age = parseInt(item["Age"]);
                if (age_range === '60+') {
                    return age >= 60;
                }
                const [min, max] = age_range.split('-').map(Number);
                return age >= min && age <= max;
            });
        }

        // 4. --- SORTING ---
        let sorted = [...filtered].sort((a, b) => { 
            switch (sort) {
                case 'date_oldest':
                    return new Date(a["Date"]) - new Date(b["Date"]);
                case 'customer_name_asc':
                    return a["Customer Name"].localeCompare(b["Customer Name"]);
                case 'amount_high':
                    return parseFloat(b["Final Amount"]) - parseFloat(a["Final Amount"]); 
                case 'date_newest':
                default:
                    return new Date(b["Date"]) - new Date(a["Date"]);
            }
        });

        return sorted;
    }, [salesData, queryParams]);


    // ---- PAGINATION ----
    const recordsPerPage = 10;
    const currentPage = queryParams.page || 1;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;

    const paginatedData = processedData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(processedData.length / recordsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }));
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }));
        }
    };

    return (
        <div className="transaction-table-container">

            {/* ---- TABLE HEADER: Mapped to display visible columns ---- */}
            <div className="table-header">
                {TABLE_COLUMNS.map((col, index) => (
                    <div className="col" key={index}>{col.title}</div>
                ))}
            </div>

            {/* ---- TABLE BODY: Mapped to render data for visible columns ---- */}
            <div className="table-body">
                {paginatedData.length === 0 ? (
                    <div className="placeholder-text">No data found</div>
                ) : (
                    paginatedData.map((item, index) => (
                        <div className="table-row" key={index}>
                            {TABLE_COLUMNS.map((col, colIndex) => (
                                <div className="col" key={colIndex}>
                                    {col.key === "Final Amount" ? `₹ ${item[col.key]}` : item[col.key]}
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>

            {/* ---- PAGINATION ---- */}
            <div className="pagination-controls">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Previous
                </button>

                <span>Page {currentPage} of {totalPages}</span>

                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionTable;