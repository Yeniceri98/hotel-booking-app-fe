import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AddRoom from './components/rooms/AddRoom';
import ExistingRooms from './components/rooms/ExistingRooms';

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<AddRoom />
				<ExistingRooms />
			</div>
		</BrowserRouter>
	);
};

export default App;
