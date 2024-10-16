import { useState } from 'react';

const RoomFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState('');

	const handleSelectChange = (e) => {
		const selectedRoomType = e.target.value;
		setFilter(selectedRoomType);

		const filteredRooms = data.filter(
			(room) => room.roomType.toLowerCase() === selectedRoomType.toLowerCase()
		);
		setFilteredData(filteredRooms);
	};

	const clearFilter = () => {
		setFilter('');
		setFilteredData(data);
	};

	// Unique Room Types
	const roomTypes = data ? ['', ...new Set(data.map((room) => room.roomType))] : [];

	return (
		<div className="input-group mb-3">
			<span className="input-group-text" id="room-type-filter">
				Filter Rooms
			</span>
			<select className="form-select" onChange={handleSelectChange} value={filter}>
				{roomTypes.map((roomType, index) => (
					<option key={index} value={roomType}>
						{roomType}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
		</div>
	);
};

export default RoomFilter;
