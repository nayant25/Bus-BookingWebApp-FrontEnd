import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Component/LandingPage';
import AdminLogin from './Component/AdminLogin';
import UserLogin from './Component/UserLogin';
import AdminSignup from './Component/AdminSignup';
import UserSignup from './Component/UserSignup';
import AdminHomePage from './Component/AdminHomePage';
import UserHomePage from './Component/UserHomePage';
import TicketBookingPage from './Component/TicketBookingPage';
import PageNotFound from './Component/PageNotFound';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/adminlogin" element={<AdminLogin />} />
                    <Route path="/userlogin" element={<UserLogin />} />
                    <Route path="/adminsignup" element={<AdminSignup />} />
                    <Route path="/usersignup" element={<UserSignup />} />
                    <Route path="/adminhomepage/*" element={<AdminHomePage />} />
                    <Route path="/userhomepage/*" element={<UserHomePage />} />
                    <Route path="/ticket-booking" element={<TicketBookingPage />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;