import axios from "axios";
import { useEffect, useState } from "react";
import '../Style/ViewBus.css';
import { useNavigate } from "react-router-dom";

const ViewBus = () => {
    const navigate = useNavigate();
    const [buses, setBuses] = useState([]); // Renamed for clarity
    const [message, setMessage] = useState(""); // Added for feedback

    useEffect(() => {
        fetchBuses();
    }, []);

    const fetchBuses = () => {
        axios.get(`http://localhost:8080/api/bus`)
            .then((res) => {
                console.log(res.data);
                setBuses(res.data.data);
            })
            .catch((err) => {
                setMessage("⚠️ Failed to load buses: " + (err.response?.data?.message || err.message));
                console.error(err);
            });
    };

    function editNavigate(id) {
        navigate(`/adminhomepage/editbus/${id}`);
    }

    function removeBus(id, busNumber) {
        axios.delete(`http://localhost:8080/api/bus/${id}`)
            .then((res) => {
                setMessage(`✅ Bus Number ${busNumber} has been removed from the list`);
                fetchBuses(); // Refresh list without reload
                console.log(res.data);
            })
            .catch((err) => {
                setMessage("⚠️ Cannot remove this bus: " + (err.response?.data?.message || err.message));
                console.error(err);
            });
    }

    return (
        <div className="ViewBus">
            <h2>View Buses</h2>
            {message && <p>{message}</p>}
            {buses.length === 0 && <p>No buses available.</p>}
            {buses.map((item) => (
                <div className="bus_details" key={item.id}>
                    <h4>{item.name}</h4>
                    <i>Seats: <b>{item.availableSeats}</b></i> {/* Changed to availableSeats */}
                    <p>From: {item.from}</p>
                    <p>To: {item.to}</p>
                    <p>Date: {item.dateOfDeparture}</p>
                    <span>Bus Number: {item.busNumber}</span>
                    <button className="btn btn-warning" onClick={() => editNavigate(item.id)}>Edit</button>
                    <button className="btn btn-warning" onClick={() => removeBus(item.id, item.busNumber)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ViewBus;