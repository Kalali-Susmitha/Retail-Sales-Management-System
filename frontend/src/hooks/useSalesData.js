import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/sales';

const useSalesData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // This state holds all parameters for S/F/S/P (Search/Filter/Sort/Pagination)
  const [query, setQuery] = useState({
    page: 1,
    pageSize: 10,
    search: '',
    sortField: 'Date',
    sortOrder: 'desc',
    // Placeholder for filter arrays (must match backend expected keys):
    region: [],
    gender: [],
    category: [],
    tags: [],
    payment: [],
    minAge: undefined,
    maxAge: undefined,
    minDate: undefined,
    maxDate: undefined,
  });
  
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Convert the query object into URL search parameters
      const params = new URLSearchParams(query).toString();
      
      // Make API call to the backend
      const response = await axios.get(`${API_BASE_URL}?${params}`);
      
      // Update state with data and metadata from the backend response
      setData(response.data.data);
      setTotalItems(response.data.totalItems);
      
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
      setData([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [query]); // Re-run effect whenever query parameters change

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return all state and setters needed by the components
  return { data, loading, totalItems, query, setQuery, fetchData };
};

export default useSalesData;