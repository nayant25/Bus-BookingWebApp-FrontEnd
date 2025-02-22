import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TicketBookingPage = () => {
    const [busId, setBusId] = useState("");
    const [userId, setUserId] = useState("");
    const [numberOfSeats, setNumberOfSeats] = useState("");
    const navigate = useNavigate();

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/tickets/${busId}/${userId}/${numberOfSeats}`);
            alert("Booking Successful! Ticket ID: " + response.data.id);
            console.log(response.data);

            // Redirect user to booking confirmation page
            navigate("/userhomepage");  // Change this to the correct route
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking failed. Please try again.");
        }
    };

    return (
        <div className="booking-container">
            <h2>Book Your Ticket</h2>
            <form onSubmit={handleBooking}>
                <label>Bus ID:</label>
                <input type="text" value={busId} onChange={(e) => setBusId(e.target.value)} required />

                <label>User ID:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />

                <label>Number of Seats:</label>
                <input type="number" value={numberOfSeats} onChange={(e) => setNumberOfSeats(e.target.value)} required />

                <button type="submit">Book Ticket</button>
            </form>
        </div>
    );
};

export default TicketBookingPage;
