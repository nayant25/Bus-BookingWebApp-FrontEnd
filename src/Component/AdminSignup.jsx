import React, { useState } from "react";
import '../Style/AdminSignup.css';
import axios from "axios";

const AdminSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gst_number, setGstNumber] = useState("");
    const [travels_name, setTravelsName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const data = { name, email, password, phone, gst_number, travels_name };

    function createAdmin(e) {
        e.preventDefault();
        axios.post('http://localhost:8080/api/admins', data, {
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                setMessage("✅ Admin Registered Successfully!");
                console.log(res.data);
            })
            .catch((err) => {
                setMessage("⚠️ Registration Failed: " + (err.response?.data?.message || err.message));
                console.error(err);
            });
    }

    return (
        <div className="signup">
            <h2>Admin Signup</h2>
            {message && <p>{message}</p>}
            <form onSubmit={createAdmin}>
                <label>Name</label>
                <input type="text" placeholder='Enter the Name' required value={name} onChange={(e) => setName(e.target.value)} />
                
                <label>Email</label>
                <input type="email" placeholder='Enter the Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <label>Phone</label>
                <input type="tel" placeholder='Enter the Phone' required value={phone} onChange={(e) => setPhone(e.target.value)} />
                
                <label>GST Number</label>
                <input type="text" placeholder='Enter the GST Number' required value={gst_number} onChange={(e) => setGstNumber(e.target.value)} />
                
                <label>Travels Name</label>
                <input type="text" placeholder='Enter the Travels Name' required value={travels_name} onChange={(e) => setTravelsName(e.target.value)} />
                
                <label>Password</label>
                <input type="password" placeholder='Enter the Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button className="btn btn-danger">Register</button>
            </form>
        </div>
    );
}

export default AdminSignup;