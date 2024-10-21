import React, { useState, useEffect } from 'react';
import { updateRoom, getRoomById, getAllRooms } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector';

const EditRoom = () => {
	const [room, setRoom] = useState({
		photo: '',
		roomType: '',
		roomPrice: '',
	});

	const [imagePreview, setImagePreview] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// Dynamic Routing
	const { roomId } = useParams();

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId);
				setRoom(roomData);
				setImagePreview(roomData.photo);
			} catch (error) {
				console.error(error);
			}
		};

		fetchRoom();
	}, [roomId]);

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		setImagePreview(URL.createObjectURL(selectedImage));
		setRoom({ ...room, photo: selectedImage });
	};

	const handleRoomInputChange = (e) => {
		const { name, value } = e.target;

		if (name === 'roomPrice') {
			const parsedValue = !isNaN(value) ? parseInt(value) : '';
			setRoom({ ...room, [name]: parsedValue });
		} else {
			setRoom({ ...room, [name]: value });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const result = await updateRoom(roomId, room);

			if (result) {
				setSuccessMessage('Room updated successfully');
				const updatedRoom = await getRoomById(roomId);
				setRoom(updatedRoom);
				setImagePreview(updateRoom.photo);
			} else {
				setErrorMessage('Failed to add room');
			}
		} catch (error) {
			setErrorMessage(error.message || 'Failed to add room');
		}

		setTimeout(() => {
			setSuccessMessage('');
			setErrorMessage('');
		}, 3000);
	};

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-8 bg-light p-4 rounded-3">
						<h2 className="mt-5 mb-2">Add a New Room</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-3 mt-4">
								<label htmlFor="roomType" className="form-label">
									Room Type
								</label>
								<div>
									<RoomTypeSelector
										handleRoomInputChange={handleRoomInputChange}
										newRoom={room}
									/>
								</div>
							</div>
							<div className="mb-3 mt-4">
								<label htmlFor="roomPrice" className="form-label">
									Room Price
								</label>
								<input
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									onChange={handleRoomInputChange}
									value={room.roomPrice}
									required
								/>
							</div>
							<div className="mb-3 mt-4">
								<label htmlFor="photo" className="form-label">
									Room Photo
								</label>
								<input
									type="file"
									className="form-control"
									id="photo"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<div className="mt-2">
										<img
											src={imagePreview}
											alt="Room"
											className="img-fluid"
											style={{ maxWidth: '400px', maxHeight: '400px' }}
										/>
									</div>
								)}
							</div>
							<div className="d-grid d-flex justify-content-center mt-5">
								<button type="submit" className="btn btn-primary">
									Add Room
								</button>
							</div>
							{successMessage && (
								<div className="alert alert-success mt-3">{successMessage}</div>
							)}
							{errorMessage && (
								<div className="alert alert-danger mt-3">{errorMessage}</div>
							)}
						</form>
					</div>
				</div>
			</section>
		</>
	);
};
export default EditRoom;
