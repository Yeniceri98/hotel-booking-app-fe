import React, { useEffect, useState } from 'react';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import { Col, Row } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ExistingRooms = () => {
	const [rooms, setRooms] = useState([{ id: '', roomType: '', roomPrice: '' }]);
	const [currentPage, setCurrentPage] = useState(1);
	const [roomsPerPage] = useState(8);
	const [isLoading, setIsLoading] = useState(false);
	const [filteredRooms, setFilteredRooms] = useState([
		{ id: '', roomType: '', roomPrice: '' },
	]);
	const [selectedRoomType, setSelectedRoomType] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	useEffect(() => {
		fetchRooms();
	}, []);

	const fetchRooms = async () => {
		setIsLoading(true);
		try {
			const result = await getAllRooms();
			setRooms(result);
			setIsLoading(false);
		} catch (error) {
			setErrorMessage(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (selectedRoomType === '') {
			setFilteredRooms(rooms);
		} else {
			const filteredRooms = rooms.filter((room) => room.roomType === selectedRoomType);
			setFilteredRooms(filteredRooms);
		}
		setCurrentPage(1);
	}, [rooms, selectedRoomType]);

	const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleDelete = async (roomId) => {
		try {
			const response = await deleteRoom(roomId);
			if (response.status === 200) {
				setSuccessMessage(`Room No ${roomId} was deleted`);
				fetchRooms();
			} else {
				throw new Error(`Error deleting room: ${response.statusText}`);
			}
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
		const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
		return Math.ceil(totalRooms / roomsPerPage);
	};

	const indexOfLastRoom = currentPage * roomsPerPage;
	const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
	const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

	return (
		<>
			{isLoading ? (
				<p>Loading existing rooms</p>
			) : (
				<>
					<section className="mt-5 mb-5 container">
						<h2 className="mt-4 mb-4 text-center">Existing Rooms</h2>

						<Row>
							<Col md={6} className="mb-2 md-mb-0">
								<RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
							</Col>
							<Col md={6} className="d-flex justify-content-end mb-4 md-mb-0">
								<Link to={'/add-room'}>
									<FaPlus /> Add Room
								</Link>
							</Col>
						</Row>

						<table className="table table-bordered table-hover">
							<thead>
								<tr className="text-center">
									<th>ID</th>
									<th>Room Type</th>
									<th>Room Price</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{currentRooms.map((room) => (
									<tr key={room.id} className="text-center">
										<td>{room.id}</td>
										<td>{room.roomType}</td>
										<td>{room.roomPrice}</td>
										<td className="gap-2 d-flex justify-content-center">
											<Link to={`/edit-room/${room.id}`}>
												<span className="btn btn-warning btn-sm">
													<FaEdit />
												</span>
											</Link>
											<button
												className="btn btn-danger btn-sm ml-5"
												onClick={() => handleDelete(room.id)}>
												<FaTrashAlt />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						<RoomPaginator
							currentPage={currentPage}
							totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
							onPageChange={handlePaginationClick}
						/>
					</section>

					{successMessage && (
						<div className="alert alert-success mt-3">{successMessage}</div>
					)}
					{errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
				</>
			)}
		</>
	);
};

export default ExistingRooms;
