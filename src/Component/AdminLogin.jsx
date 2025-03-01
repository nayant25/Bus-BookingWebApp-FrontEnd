import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Backspace' || event.keyCode === 8) {
                if (document.activeElement.tagName !== 'INPUT') {
                    event.preventDefault();
                    navigate('/');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    function verifyAdmin(e) {
        e.preventDefault();
        axios.post("http://localhost:8080/api/admins/verify-by-email", { email, password }, {
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                setMessage("✅ Admin Login Successful!");
                localStorage.setItem("adminName", res.data.data.name);
                localStorage.setItem("adminId", res.data.data.id);
                setTimeout(() => navigate('/adminhomepage'), 1000);
            })
            .catch((err) => {
                setMessage("⚠️ Login Failed: " + (err.response?.data?.message || err.message));
                console.error("Login Error:", err.response?.data || err);
            });
    }

    return (
        <div className="admin-login-container">
            <div className="login-card">
                <div className="logo">
                    <img 
                        src="https://img.freepik.com/premium-vector/travel-bus-logo-vector-illustration_600323-357.jpg" 
                        alt="Yatra Logo" 
                    />
                    <h2>Admin Portal</h2>
                </div>
                {message && <p className="message">{message}</p>}
                <form onSubmit={verifyAdmin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="signup-link">
                    New Admin? <Link to="/adminsignup">Register Here</Link>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;