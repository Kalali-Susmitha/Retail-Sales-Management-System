import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;