import { useState } from "react";
import "../Style/addbus.css";
import axios from "axios";

const AddBus = () => {
    const [name, setName] = useState("");
    const [busNumber, setBusNumber] = useState("");
    const [availableSeats, setAvailableSeats] = useState(""); // Changed from numberOfSeats
    const [costPerSeat, setCostPerSeat] = useState(""); // Added
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [dateOfDeparture, setDateOfDeparture] = useState("");
    const [message, setMessage] = useState(""); // Added for feedback

    const data = {
        name,
        busNumber,
        availableSeats,
        costPerSeat,
        from,
        to,
        dateOfDeparture
    };

    const adminId = localStorage.getItem("adminId"); // Changed from parsing "Admin" object

    function addBus(e) {
        e.preventDefault();
        if (!adminId) {
            setMessage("⚠️ Please log in as admin first.");
            return;
        }
        axios.post(`http://localhost:8080/api/bus/${adminId}`, data)
            .then((res) => {
                setMessage("✅ Bus Added Successfully!");
                console.log(res.data);
            })
            .catch((err) => {
                const errorMsg = err.response?.data?.message || err.message || "Unknown error";
                setMessage("⚠️ Failed to add bus: " + errorMsg);
                console.error("Error adding bus:", err.response?.data || err);
            });
    }

    return (
        <div className="addbus">
            <h2>Add Bus</h2>
            {message && <p>{message}</p>}
            <form onSubmit={addBus}>
                <label>Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                
                <label>Bus Number</label>
                <input type="text" required value={busNumber} onChange={(e) => setBusNumber(e.target.value)} placeholder="Enter bus number" />
                
                <label>Available Seats</label>
                <input type="number" required value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} placeholder="Enter available seats" min="1" />
                
                <label>Cost Per Seat</label>
                <input type="number" required value={costPerSeat} onChange={(e) => setCostPerSeat(e.target.value)} placeholder="Enter cost per seat" min="0" />
                
                <label>From Location</label>
                <input type="text" required value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Enter from location" />
                
                <label>To Location</label>
                <input type="text" required value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter to location" />
                
                <label>Date Of Departure</label>
                <input type="date" required value={dateOfDeparture} onChange={(e) => setDateOfDeparture(e.target.value)} />
                
                <button type="submit" id="addbusbutton">Add Bus</button>
            </form>
        </div>
    );
}

export default AddBus;