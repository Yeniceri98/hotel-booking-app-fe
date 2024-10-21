import { useState } from 'react';
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddRoom = () => {
	const [newRoom, setNewRoom] = useState({
		photo: '',
		roomType: '',
		roomPrice: '',
	});

	const [imagePreview, setImagePreview] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	const handleRoomInputChange = (e) => {
		const { name, value } = e.target;

		if (name === 'roomPrice') {
			const parsedValue = !isNaN(value) ? parseInt(value) : '';
			setNewRoom({ ...newRoom, [name]: parsedValue });
		} else {
			setNewRoom({ ...newRoom, [name]: value });
		}
	};

	const handleImageChange = (e) => {
		const selectedImage = e.target.files[0];
		setImagePreview(URL.createObjectURL(selectedImage));
		setNewRoom({ ...newRoom, photo: selectedImage });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const result = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);

			if (result) {
				setNewRoom({ photo: '', roomType: '', roomPrice: '' });
				setImagePreview('');
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
					<div className="col-md-6 col-lg-8 bg-light p-4 rounded-3 text-center">
						<h2 className="mt-5 mb-2">Add a New Room</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4 mt-4">
								<label htmlFor="roomType" className="form-label">
									Room Type
								</label>
								<div>
									<RoomTypeSelector
										handleRoomInputChange={handleRoomInputChange}
										newRoom={newRoom}
									/>
								</div>
							</div>
							<div className="mb-4 mt-4">
								<label htmlFor="roomPrice" className="form-label">
									Room Price
								</label>
								<input
									type="number"
									className="form-control"
									id="roomPrice"
									name="roomPrice"
									onChange={handleRoomInputChange}
									value={newRoom.roomPrice}
									required
								/>
							</div>
							<div className="mb-4 mt-4">
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
									<div className="mt-4">
										<img
											src={imagePreview}
											alt="Room"
											className="img-fluid"
											style={{ maxWidth: '100%', maxHeight: '100%' }}
										/>
									</div>
								)}
							</div>
							<div className="d-grid d-flex justify-content-center mt-5">
								<button type="submit" className="btn btn-primary">
									Add Room
								</button>
							</div>
							<Link to="/existing-rooms">
								<button type="button" className="btn btn-secondary mt-4">
									Go Back to Existing Rooms
								</button>
							</Link>
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

export default AddRoom;
