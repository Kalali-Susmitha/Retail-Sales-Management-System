import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Retail Sales Management System</h1>
      {/* Removed the <div className="profile"> element here
          to eliminate the "User Name" display from the navigation bar.
      */}
    </div>
  );
};

export default Navbar;