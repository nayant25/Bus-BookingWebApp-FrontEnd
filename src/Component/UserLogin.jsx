import { useState, useEffect } from 'react'; // Added useEffect
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/UserLogin.css';

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // Handle backspace key press to go back to landing page
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Backspace' || event.keyCode === 8) {
                // Prevent default backspace behavior (e.g., deleting input) only if not in input field
                if (document.activeElement.tagName !== 'INPUT') {
                    event.preventDefault();
                    navigate('/');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [navigate]);

    function verifyUser(e) {
        e.preventDefault();
        axios.post("http://localhost:8080/api/users/verify-by-email", { email, password }, {
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                setMessage("✅ User Login Successful!");
                if (res.data && res.data.data) {
                    localStorage.setItem("userName", res.data.data.name);
                    localStorage.setItem("userId", res.data.data.id);
                    setTimeout(() => navigate('/userhomepage'), 1000);
                } else {
                    setMessage("⚠️ Unexpected response from server.");
                }
            })
            .catch((err) => {
                setMessage("⚠️ Login Failed: " + (err.response?.data?.message || err.message));
                console.error("Login Error:", err.response?.data || err);
            });
    }

    return (
        <div className="user-login-container">
            <div className="login-card">
                <div className="logo">
                    <img 
                        src="https://img.freepik.com/premium-vector/travel-bus-logo-vector-illustration_600323-357.jpg" 
                        alt="Yatra Logo" 
                    />
                    <h2>User Portal</h2>
                </div>
                {message && <p className="message">{message}</p>}
                <form onSubmit={verifyUser}>
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
                    New User? <Link to="/usersignup">Register Here</Link>
                </p>
            </div>
        </div>
    );
};

export default UserLogin;