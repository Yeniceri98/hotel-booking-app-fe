import { useState } from 'react';
import { getBookingByConfirmationCode, deleteBooking } from '../utils/ApiFunctions';

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [bookingInfo, setBookingInfo] = useState({
		bookingId: '',
		room: { id: '' },
		bookingConfirmationCode: '',
		checkInDate: '',
		checkOutDate: '',
		guestName: '',
		guestEmail: '',
		numOfAdults: 0,
		numOfChildren: 0,
	});

	const clearBookingInfo = {
		bookingId: '',
		room: { id: '' },
		bookingConfirmationCode: '',
		checkInDate: '',
		checkOutDate: '',
		guestName: '',
		guestEmail: '',
		numOfAdults: 0,
		numOfChildren: 0,
	};

	const handleInputChange = (e) => {
		setConfirmationCode(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');
		setSuccessMessage('');
		try {
			setIsLoading(true);
			const data = await getBookingByConfirmationCode(confirmationCode);
			setBookingInfo(data);
		} catch (error) {
			setErrorMessage(error.message);
			setBookingInfo(clearBookingInfo);
		} finally {
			setIsLoading(false);
		}
	};

	const handleBookingCancellation = async () => {
		try {
			await deleteBooking(bookingInfo.bookingId);
			setBookingInfo(clearBookingInfo);
			setSuccessMessage(
				`Booking has been cancelled successfully with this confirmation code: ${bookingInfo.bookingConfirmationCode}`
			);
			setConfirmationCode('');
			setErrorMessage('');
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h1>Find Booking</h1>
				<form onSubmit={handleFormSubmit}>
					<input
						type="text"
						value={confirmationCode}
						onChange={handleInputChange}
						className="form-control mt-3"
						placeholder="Enter confirmation code"
					/>
					<div className="d-flex justify-content-center">
						<button type="submit" className="btn btn-primary mt-3">
							Find Booking
						</button>
					</div>
				</form>
				{errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
				{isLoading && <p>Loading...</p>}
				{bookingInfo && (
					<div className="mt-5">
						<h2>Booking Information:</h2>
						<div className="mt-3">
							<p>Booking ID: {bookingInfo.bookingId}</p>
							<p>Room Number: {bookingInfo.room.id}</p>
							<p>Check-in Date: {bookingInfo.checkInDate}</p>
							<p>Check-out Date: {bookingInfo.checkOutDate}</p>
							<p>Guest Name: {bookingInfo.guestName}</p>
							<p>Guest Email: {bookingInfo.guestEmail}</p>
							<p>Number of Adults: {bookingInfo.numOfAdults}</p>
							<p>Number of Children: {bookingInfo.numOfChildren}</p>
						</div>
						<div className="d-flex justify-content-center">
							<button className="btn btn-danger mt-3" onClick={handleBookingCancellation}>
								Cancel Booking
							</button>
						</div>
						{successMessage && (
							<div className="alert alert-success mt-3 fade show">{successMessage}</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default FindBooking;
