import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/TicketBookingPage.css';

const TicketBookingPage = () => {
    const [buses, setBuses] = useState([]);
    const [formData, setFormData] = useState({
        busId: '',
        numberOfSeats: 1
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/api/bus')
            .then(response => {
                if (response.data && response.data.data) {
                    setBuses(response.data.data);
                } else {
                    setMessage("⚠️ No buses available or invalid response from server.");
                    console.error("Unexpected API response:", response.data);
                }
            })
            .catch(error => {
                setMessage("⚠️ Error fetching buses: " + (error.message || "Unknown error"));
                console.error('Error fetching buses:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setMessage("⚠️ User not logged in. Please log in to book a ticket.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/api/tickets/${formData.busId}/${userId}/${formData.numberOfSeats}`);
            setMessage("🎉 Booking Successful! Ticket ID: " + response.data.data.id);
            console.log("Booking Response:", response.data);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message || "Unknown error";
            setMessage("⚠️ Booking failed: " + errorMsg);
            console.error('Booking Error:', error.response?.data || error);
        }
        setLoading(false);
    };

    return (
        <div className="TicketBookingPage">
            <h2>🚌 Book Your Ticket</h2>
            {message && <p className="booking-message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Select Bus:
                    <select name="busId" value={formData.busId} onChange={handleChange} required>
                        <option value="">Choose a Bus</option>
                        {buses.length > 0 ? (
                            buses.map(bus => (
                                <option key={bus.id} value={bus.id}>
                                    {bus.name} - {bus.from} to {bus.to} (Seats: {bus.availableSeats})
                                </option>
                            ))
                        ) : (
                            <option disabled>No buses available</option>
                        )}
                    </select>
                </label>
                <label>
                    Number of Seats:
                    <input 
                        type="number" 
                        name="numberOfSeats" 
                        value={formData.numberOfSeats} 
                        min="1" 
                        onChange={handleChange} 
                        required 
                    />
                </label>
                <button type="submit" disabled={!formData.busId || loading}>
                    {loading ? "Booking..." : "Book Now"}
                </button>
            </form>
        </div>
    );
};

export default TicketBookingPage;