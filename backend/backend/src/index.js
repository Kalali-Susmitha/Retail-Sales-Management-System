const express = require('express');
const cors = require('cors');
// CRITICAL FIX: Destructuring is correct for loadData
const { loadData } = require('./utils/dataLoader'); 
require('dotenv').config();

// Initialize Express App
const app = express();
const port = process.env.PORT || 3000; 

// Middleware
// *** CRITICAL FINAL FIX: Explicit CORS Configuration ***
const corsOptions = {
  // Explicitly allow the frontend running on port 3001
  origin: 'http://localhost:3001', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
app.use(cors(corsOptions)); // Apply the fixed CORS options
app.use(express.json());

// Routes
const salesRoutes = require('./routes/salesRoutes');
app.use('/api/sales', salesRoutes);

// Basic Health Check Route
app.get('/', (req, res) => {
  res.send('TruEstate Sales API is running and data loading is complete.');
});

// START DATA LOADING AND THEN START SERVER
loadData()
  .then(() => {
    app.listen(port, () => {
      console.log(`[Setup] Data loading complete. Starting server...`);
      console.log(`[Server] Server listening on http://localhost:${port}`);
      console.log(`[Server] Access API at http://localhost:${port}/api/sales`);
    });
  })
  .catch((err) => {
    console.error("[Setup] Fatal Error: Failed to load sales data and start server.", err);
    process.exit(1); 
  });