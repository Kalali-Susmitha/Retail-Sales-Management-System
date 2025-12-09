import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            
            <h2 className="sidebar-header">
                Susmitha
            </h2>
            
            <ul>
                {/* 1. Dashboard Link: Uses <a> for functionality and classes for styling */}
                <li>
                    <a href="/" className="nav-item nav-text-link active">
                        Dashboard
                    </a>
                </li>
                
                {/* 2. Other Links (using the same style structure) */}
                <li>
                    <a href="/profile" className="nav-item nav-text-link">Profile</a>
                </li>
                <li>
                    <a href="/settings" className="nav-item nav-text-link">Settings</a>
                </li>
                <li>
                    <a href="/logout" className="nav-item nav-text-link">Logout</a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;