import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddRoom from './components/rooms/AddRoom';
import ExistingRooms from './components/rooms/ExistingRooms';
import Home from './components/home/Home';
import EditRoom from './components/rooms/EditRoom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const App = () => {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/edit-room/:roomId" element={<EditRoom />} />
				<Route path="/existing-rooms" element={<ExistingRooms />} />
				<Route path="/add-room" element={<AddRoom />} />
			</Routes>
			<Footer />
		</Router>
	);
};

export default App;
