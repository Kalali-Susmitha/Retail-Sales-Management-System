1. Overview 
     TThis project is the Retail Sales Management System dashboard developed for the TruEstate SDE Intern assignment. It features a modular, single-repository architecture  designed to efficiently manage and analyze sales transaction data. The system successfully implements all core functional specifications, including advanced Search, Multi-Select Filtering, Sorting, and Pagination. The implementation adheres to professional coding discipline and maintainable architecture.
2. Tech Stack 
     Component :Frontend ,Backend,Deployment .
     Technology :React, JavaScript, HTML/CSS,Node.js, Express,GitHub / Netlify.
     Role  :interactive user interface and predictable state management. UI follows the required structural guidelines,API structure and serving/processing structured sales data,Source control, single repository structure, and automated frontend hosting.
3. Search Implementation Summary 
     The search function is implemented to perform case-insensitive full-text matching across the mandated fields: Customer Name and Phone Number . The search logic resides in the TransactionTable component's data processing pipeline. It is designed to work simultaneously alongside all active filters and sorting criteria.
4. Filter Implementation Summary 
     The system supports simultaneous, combinatorial filtering across required fields, including Customer Region, Gender, Age Range, Product Category, Tags, Payment Method, and Date Range . Filters maintain state alongside sorting and search. The logic is executed before sorting, ensuring the correct subset of data is processed.
5. Sorting Implementation Summary 
     Sorting is implemented for Date (Newest First), Quantity, and Customer Name (A-Z) . The sorting is applied as the penultimate step in the data processing pipeline, applied directly to the array after all searching and filtering are complete. Applying a new sort automatically resets the pagination to the first page.
6. Pagination Implementation Summary 
     The pagination logic supports a required page size of 10 items per page and includes Next / Previous navigation. Pagination is the final operation applied to the data, ensuring it operates only on the fully filtered, searched, and sorted dataset. It retains the active search, filter, and sort states across page turns.
7. Setup Instructions 
     1.Clone the Repository:
        git clone https://github.com/Kalali-Susmitha/Retail-Sales-Management-System.git
        cd Retail-Sales-Management-System
     2.Install Dependencies: Run npm install inside both the frontend and backend directories.
        cd frontend
        npm install  # in the 'frontend' folder
        cd backend
        npm install  # in the 'backend' folder
     3.Run the backend:
        cd backend #then
         npm start
     4.Run the frontend:
         cd ../frontend #then
          npm start
        