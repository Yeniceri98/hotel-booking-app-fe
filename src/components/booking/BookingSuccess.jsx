import { useLocation } from 'react-router-dom';

const BookingSuccess = () => {
	const location = useLocation();
	const message = location.state?.message;
	const error = location.state?.error;
	console.log('message: ', message);
	console.log('error: ', error);

	return (
		<div className="container">
			<header>
				<div className="mt-5">
					{message ? (
						<div>
							<h3 className="text-success">Booking Success!</h3>
							<p className="text-success">
								Booking ID: {message.bookingId}
								<br />
								Check-in Date: {message.checkInDate}
								<br />
								Check-out Date: {message.checkOutDate}
								<br />
								Booking Confirmation Code: {message.bookingConfirmationCode}
							</p>
						</div>
					) : (
						<div>
							<h3 className="text-danger">Booking Failed!</h3>
							<p className="text-danger">{error}</p>
						</div>
					)}
				</div>
			</header>
		</div>
	);
};

export default BookingSuccess;
