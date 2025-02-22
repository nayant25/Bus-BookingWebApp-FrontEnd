import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import TicketBookingPage from './TicketBookingPage';
import { useNavigate } from 'react-router-dom';

const UserHomePage = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (storedUser) {
            setUserName(storedUser);
        } else {
            alert("No user found. Please login.");
            navigate("/userlogin");
        }
    }, [navigate]);

    return (
        <div style={{ background: '#ecf0f1', minHeight: '100vh' }}>
            <UserNavbar />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ color: '#2c3e50' }}>Welcome, {userName}!</h2>
            </div>
            <Routes>
                <Route path="/" element={<div><p>Your Dashboard</p></div>} />
                <Route path="/ticket-booking" element={<TicketBookingPage />} />
            </Routes>
        </div>
    );
};

export default UserHomePage;