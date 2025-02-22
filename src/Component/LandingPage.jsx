import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/LandingPage.css'; // New CSS file

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="landing-content">
                <div className="logo">
                    <img 
                        src="https://img.freepik.com/premium-vector/travel-bus-logo-vector-illustration_600323-357.jpg" 
                        alt="Yatra Logo" 
                    />
                    <h1>Yatra</h1>
                </div>
                <p className="tagline">Travel Made Simple</p>
                <div className="options">
                    <div className="option-card user-card">
                        <h2>User</h2>
                        <p>Book your tickets and explore destinations.</p>
                        <div className="buttons">
                            <Link to="/userlogin" className="btn login-btn">Login</Link>
                            <Link to="/usersignup" className="btn signup-btn">Sign Up</Link>
                        </div>
                    </div>
                    <div className="option-card admin-card">
                        <h2>Admin</h2>
                        <p>Manage buses and oversee operations.</p>
                        <div className="buttons">
                            <Link to="/adminlogin" className="btn login-btn">Login</Link>
                            <Link to="/adminsignup" className="btn signup-btn">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;