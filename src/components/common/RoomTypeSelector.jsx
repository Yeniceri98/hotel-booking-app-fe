import { useState, useEffect } from 'react';
import { getRoomTypes } from '../utils/ApiFunctions';

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
	const [roomTypes, setRoomTypes] = useState([]);
	const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
	const [newRoomType, setNewRoomType] = useState('');

	useEffect(() => {
		getRoomTypes().then((data) => {
			setRoomTypes(data);
		});
	}, []);

	const handleNewRoomTypeChange = (e) => {
		setNewRoomType(e.target.value);
	};

	const handleAddRoomType = () => {
		if (newRoomType.trim() !== '') {
			setRoomTypes([...roomTypes, newRoomType]);
			setNewRoomType('');
			setShowNewRoomTypeInput(false);
		}
	};

	return (
		<>
			{roomTypes.length > 0 ? (
				<select
					id="roomType"
					name="roomType"
					className="form-select"
					value={newRoom.roomType}
					onChange={(e) => {
						if (e.target.value === 'Add New') {
							setShowNewRoomTypeInput(true);
						} else {
							handleRoomInputChange(e);
						}
					}}>
					<option value="">Select a room type</option>
					<option value="Add New">Add New Room Type</option>
					{roomTypes.map((type, index) => (
						<option key={index} value={type}>
							{type}
						</option>
					))}
				</select>
			) : (
				<div>Loading room types...</div>
			)}
			{showNewRoomTypeInput && (
				<div className="input-group mt-2">
					<input
						className="form-control"
						type="text"
						placeholder="Enter new room type"
						value={newRoomType}
						onChange={handleNewRoomTypeChange}
					/>
					<button className="btn btn-hotel" onClick={handleAddRoomType}>
						Add
					</button>
				</div>
			)}
		</>
	);
};

export default RoomTypeSelector;
