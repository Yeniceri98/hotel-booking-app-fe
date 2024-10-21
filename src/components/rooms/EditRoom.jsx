/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { updateRoom, getRoomById, getRoomPhotoByRoomId } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector';
import { Buffer } from 'buffer';

const EditRoom = () => {
	const [room, setRoom] = useState({
		photo: '',
		roomType: '',
		roomPrice: '',
	});

	const [imagePreview, setImagePreview] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// Dynamic Routing
	const { roomId } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchRoom = async () => {
			try {
				const roomData = await getRoomById(roomId);
				const photo = await getRoomPhotoByRoomId(roomId);
				setRoom(roomData);
				setImagePreview(photo);
			} catch (error) {
				console.error(error);
			}
		};

		fetchRoom();
	}, [roomId]);

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setImagePreview(reader.result);
		};
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
				const updatedRoom = await getRoomById(roomId);
				setRoom(updatedRoom);
				setImagePreview(updateRoom.photo);
				navigate('/existing-rooms');
			} else {
				setErrorMessage('Failed to add room');
			}
		} catch (error) {
			setErrorMessage(error.message || 'Failed to add room');
		}

		setTimeout(() => {
			setErrorMessage('');
		}, 3000);
	};

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-8 bg-light p-4 rounded-3">
						<h2 className="mt-5 mb-2 text-center">Update the Room</h2>
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
								<div className="mt-4 d-flex justify-content-center">
									<img
										src={`data:image/jpeg;base64,${Buffer.from(imagePreview).toString(
											'base64'
										)}`}
										alt="Room Photo"
										width={400}
										height={400}
									/>
								</div>
							</div>
							<div className="d-grid d-flex justify-content-center mt-4">
								<button type="submit" className="btn btn-primary">
									Update
								</button>
							</div>
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
