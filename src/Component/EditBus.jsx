import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../Style/EditBus.css';

const EditBus = () => {
    const [name, setName] = useState("");
    const [busNumber, setBusNumber] = useState("");
    const [availableSeats, setAvailableSeats] = useState(""); // Changed from numberOfSeats
    const [costPerSeat, setCostPerSeat] = useState(""); // Added
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [dateOfDeparture, setDateOfDeparture] = useState("");
    const [message, setMessage] = useState(""); // Added for feedback
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bus/${id}`)
            .then((res) => {
                const bus = res.data.data;
                setName(bus.name);
                setBusNumber(bus.busNumber);
                setAvailableSeats(bus.availableSeats); // Changed from numberOfSeats
                setCostPerSeat(bus.costPerSeat); // Added
                setFrom(bus.from);
                setTo(bus.to);
                setDateOfDeparture(bus.dateOfDeparture);
            })
            .catch((err) => {
                setMessage("⚠️ Failed to load bus details: " + (err.response?.data?.message || err.message));
                console.error(err);
            });
    }, [id]);

    const updatedBus = {
        name,
        busNumber,
        availableSeats,
        costPerSeat,
        from,
        to,
        dateOfDeparture
    };

    function editBus(e) {
        e.preventDefault();
        axios.put(`http://localhost:8080/api/bus/${id}`, updatedBus)
            .then((res) => {
                setMessage("✅ Bus Details Edited Successfully!");
                console.log(res.data);
            })
            .catch((err) => {
                setMessage("⚠️ Failed to edit bus: " + (err.response?.data?.message || err.message));
                console.error(err);
            });
    }

    return (
        <div className="editbus">
            <h2>Edit Bus</h2>
            {message && <p>{message}</p>}
            <form onSubmit={editBus}>
                <label>Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                
                <label>Bus Number</label>
                <input type="text" required value={busNumber} onChange={(e) => setBusNumber(e.target.value)} placeholder="Enter bus number" />
                
                <label>Available Seats</label>
                <input type="number" required value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} placeholder="Enter available seats" min="0" />
                
                <label>Cost Per Seat</label>
                <input type="number" required value={costPerSeat} onChange={(e) => setCostPerSeat(e.target.value)} placeholder="Enter cost per seat" min="0" />
                
                <label>From Location</label>
                <input type="text" required value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Enter from location" />
                
                <label>To Location</label>
                <input type="text" required value={to} onChange={(e) => setTo(e.target.value)} placeholder="Enter to location" />
                
                <label>Date Of Departure</label>
                <input type="date" required value={dateOfDeparture} onChange={(e) => setDateOfDeparture(e.target.value)} />
                
                <button className="btn btn-danger" type="submit">Edit</button>
            </form>
        </div>
    );
}

export default EditBus;