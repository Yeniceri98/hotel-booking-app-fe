import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const checkInDate = new Date(booking.checkInDate);
	const checkOutDate = new Date(booking.checkOutDate);
	const numOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

	const navigate = useNavigate();

	const handleConfirmBooking = () => {
		setIsProcessingPayment(true);
		setTimeout(() => {
			setIsProcessingPayment(false);
			setIsBookingConfirmed(true);
			onConfirm();
		}, 3000);
	};

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate('/booking-success');
		}
	}, [isBookingConfirmed, navigate]);

	return (
		<div className="card card-body mt-5">
			<h4 className="mb-4 text-center">Booking Summary</h4>
			<p>
				Fullname: <strong>{booking.guestName}</strong>
			</p>
			<p>
				Email: <strong>{booking.guestEmail}</strong>
			</p>
			<p>
				Check-in Date:{' '}
				<strong>{moment(booking.checkInDate).format('MMM Do YYYY')}</strong>
			</p>
			<p>
				Check-out Date:{' '}
				<strong>{moment(booking.checkOutDate).format('MMM Do YYYY')}</strong>
			</p>
			<p>
				Number of Days Booked: <strong>{numOfDays}</strong>
			</p>
			<p>
				Adult{booking.numOfAdults > 1 ? 's: ' : ': '} :{' '}
				<strong>{booking.numOfAdults}</strong>
			</p>
			<p>
				Children: <strong>{booking.numOfChildren}</strong>
			</p>

			{payment > 0 ? (
				<>
					<p>
						Total Payment: <strong>${payment}</strong>
					</p>

					{isFormValid && !isBookingConfirmed ? (
						<button
							className="btn btn-primary"
							onClick={handleConfirmBooking}
							disabled={isProcessingPayment}>
							{isProcessingPayment ? (
								<span
									className="spinner-border spinner-border-sm mr-2"
									role="status"
									aria-hidden="true">
									Booking Confirmed and redirecting to payment...
								</span>
							) : (
								<span>Confirm Booking</span>
							)}
						</button>
					) : isBookingConfirmed ? (
						<div className="d-flex justify-content-center align-items-center">
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					) : null}
				</>
			) : (
				<p className="text-danger">Payment is required</p>
			)}
		</div>
	);
};

export default BookingSummary;
