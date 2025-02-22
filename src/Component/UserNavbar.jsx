import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import '../Style/UserNavbar.css';

const UserNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        navigate("/userlogin");
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
                <Link to="/userhomepage" className="nav-link">Dashboard</Link>
                <Link to="/ticket-booking" className="nav-link">Book Tickets</Link>
            </div>
            <div className="account">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        User Menu
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => navigate("/userhomepage")}>Dashboard</Dropdown.Item>
                        <Dropdown.Item onClick={() => navigate("/ticket-booking")}>Book Tickets</Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default UserNavbar;