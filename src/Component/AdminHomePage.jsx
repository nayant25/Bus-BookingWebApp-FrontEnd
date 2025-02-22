import AdminNavbar from "./AdminNavbar";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBus from "./AddBus";
import ViewBus from "./ViewBus";
import EditBus from "./EditBus";
import AdminDashBoard from "./AdminDashBoard";

const AdminHomePage = () => {
    const navigate = useNavigate();
    const [adminName, setAdminName] = useState("");

    useEffect(() => {
        const storedAdmin = localStorage.getItem("adminName");
        if (storedAdmin) {
            setAdminName(storedAdmin);
        } else {
            alert("No admin found. Please login.");
            navigate("/adminlogin");
        }
    }, [navigate]);

    return (
        <div style={{ background: '#ecf0f1', minHeight: '100vh' }}>
            <AdminNavbar />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2 style={{ color: '#2c3e50' }}>Welcome, {adminName}!</h2>
            </div>
            <Routes>
                <Route path="/" element={<AdminDashBoard />} />
                <Route path="/addbus" element={<AddBus />} />
                <Route path="/viewbus" element={<ViewBus />} />
                <Route path="/editbus/:id" element={<EditBus />} />
            </Routes>
        </div>
    );
};

export default AdminHomePage;