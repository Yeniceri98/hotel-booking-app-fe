import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddRoom from './components/rooms/AddRoom';
import ExistingRooms from './components/rooms/ExistingRooms';
import HomePage from './components/home/HomePage';
import EditRoom from './components/rooms/EditRoom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import RoomList from './components/rooms/RoomList';
import Admin from './components/admin/Admin';
import BookingForm from './components/booking/BookingForm';
import BookingSuccess from './components/booking/BookingSuccess';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/edit-room/:roomId" element={<EditRoom />} />
				<Route path="/existing-rooms" element={<ExistingRooms />} />
				<Route path="/add-room" element={<AddRoom />} />
				<Route path="/browse-all-rooms" element={<RoomList />} />
				<Route path="/book-room/:roomId" element={<BookingForm />} />
				<Route path="/booking-success" element={<BookingSuccess />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
