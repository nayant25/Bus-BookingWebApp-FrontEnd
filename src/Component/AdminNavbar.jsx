import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import '../Style/AdminNavbar.css';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("adminName");
        navigate("/adminlogin");
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img 
                    src="https://img.freepik.com/premium-vector/travel-bus-logo-vector-illustration_600323-357.jpg" 
                    alt="Yatra Logo" 
                    style={{ height: "50px" }}
                />
            </div>
            <div className="nav-links">
                <Link to="/adminhomepage" className="nav-link">Dashboard</Link>
                <Link to="/adminhomepage/addbus" className="nav-link">Add Bus</Link>
                <Link to="/adminhomepage/viewbus" className="nav-link">View Buses</Link>
            </div>
            <div className="account">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Admin Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("/adminhomepage")}>Dashboard</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/adminhomepage/addbus")}>Add Bus</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/adminhomepage/viewbus")}>View Buses</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default AdminNavbar;