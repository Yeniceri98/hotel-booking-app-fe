import { useState, useEffect } from 'react';
import { addBooking, getRoomById } from '../utils/ApiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import BookingSummary from './BookingSummary';
import BookingRoomPreview from './BookingRoomPreview';

const BookingForm = () => {
	const [isValidated, setIsValidated] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [roomPrice, setRoomPrice] = useState(0);
	const [booking, setBooking] = useState({
		guestName: '',
		guestEmail: '',
		checkInDate: '',
		checkOutDate: '',
		numOfAdults: 0,
		numOfChildren: 0,
	});

	const { roomId } = useParams();
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setBooking({ ...booking, [name]: value });
		setErrorMessage('');
	};

	const getRoomPriceById = async (roomId) => {
		try {
			const response = await getRoomById(roomId);
			setRoomPrice(response.roomPrice);
		} catch (error) {
			throw new Error(error.message);
		}
	};

	useEffect(() => {
		getRoomPriceById(roomId);
	}, [roomId]);

	const calculatePayment = () => {
		const checkInDate = new Date(booking.checkInDate);
		const checkOutDate = new Date(booking.checkOutDate);
		const numberOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
		const price = roomPrice ? roomPrice : 0;
		return numberOfDays * price;
	};

	const isGuestCountValid = () => {
		const adultCount = parseInt(booking.numOfAdults);
		const childrenCount = parseInt(booking.numOfChildren);
		const totalGuestCount = adultCount + childrenCount;
		return totalGuestCount >= 1 && adultCount >= 1;
	};

	const isCheckoutDateValid = () => {
		const checkInDate = new Date(booking.checkInDate);
		const checkOutDate = new Date(booking.checkOutDate);

		if (checkInDate > checkOutDate) {
			setErrorMessage('Check-out date cannot be before check-in date');
			return false;
		} else {
			setErrorMessage('');
			return true;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.currentTarget;

		if (
			form.checkValidity() === false ||
			!isGuestCountValid() ||
			!isCheckoutDateValid()
		) {
			e.stopPropagation();
		} else {
			setIsSubmitted(true);
		}

		setIsValidated(true);
	};

	const handleFormSubmit = async () => {
		try {
			const bookingResponse = await addBooking(roomId, booking);
			setIsSubmitted(true);
			navigate('/booking-success', { state: { message: bookingResponse, error: '' } });
		} catch (error) {
			setErrorMessage(error.message);
			navigate('/booking-success', { state: { message: '', error: error.message } });
		}
	};

	return (
		<div className="container mb-5">
			<div className="row">
				<div className="col-md-6 col-sm-6 col-xs-12 mt-5">
					<BookingRoomPreview />
				</div>
				<div className="col-md-6 col-sm-6 col-xs-12">
					<div className="card card-body mt-5 align-items-center">
						<h4 className="card-title">Reserve Room</h4>
						<Form noValidate validated={isValidated} onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label className="hotel-color mt-3">Fullname</Form.Label>
								<Form.Control
									required
									type="text"
									name="guestName"
									value={booking.guestName}
									onChange={handleInputChange}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter your name
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label className="hotel-color mt-3">Email</Form.Label>
								<Form.Control
									required
									type="email"
									name="guestEmail"
									value={booking.guestEmail}
									onChange={handleInputChange}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter your email
								</Form.Control.Feedback>
							</Form.Group>
							<fieldset style={{ border: '2px' }}>
								<legend className="mt-5">Lodging Period</legend>
								<div className="col-6">
									<Form.Label className="hotel-color mt-1" htmlFor="checkInDate">
										Check-in Date
									</Form.Label>
									<Form.Control
										required
										type="date"
										name="checkInDate"
										value={booking.checkInDate}
										placeholder="Check-in Date"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please select a check in date.
									</Form.Control.Feedback>
								</div>
								<div className="col-6">
									<Form.Label className="hotel-color mt-3" htmlFor="checkOutDate">
										Check-out Date
									</Form.Label>
									<Form.Control
										required
										type="date"
										name="checkOutDate"
										value={booking.checkOutDate}
										placeholder="Check-out Date"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please select a check in date.
									</Form.Control.Feedback>
								</div>
								{errorMessage && (
									<p className="error-message text-danger">{errorMessage}</p>
								)}
							</fieldset>
							<fieldset style={{ border: '2px' }}>
								<legend className="mt-5">Number of Guest</legend>
								<div className="row">
									<div className="col-6 mt-1">
										<Form.Label htmlFor="numOfAdults" className="hotel-color">
											Adults
										</Form.Label>
										<Form.Control
											required
											type="number"
											id="numOfAdults"
											name="numOfAdults"
											value={booking.numOfAdults}
											min={1}
											placeholder="0"
											onChange={handleInputChange}
										/>
										<Form.Control.Feedback type="invalid">
											Please select at least 1 adult.
										</Form.Control.Feedback>
									</div>
									<div className="col-6 mt-1">
										<Form.Label htmlFor="numOfChildren" className="hotel-color">
											Children
										</Form.Label>
										<Form.Control
											required
											type="number"
											id="numOfChildren"
											name="numOfChildren"
											value={booking.numOfChildren}
											placeholder="0"
											min={0}
											onChange={handleInputChange}
										/>
										<Form.Control.Feedback type="invalid">
											Select 0 if no children
										</Form.Control.Feedback>
									</div>
								</div>
							</fieldset>
							<div className="fom-group mt-4 mb-2 text-center">
								<button type="submit" className="btn-hotel">
									Continue
								</button>
							</div>
						</Form>
					</div>
				</div>
				<div className="col-md-12 col-sm-12 col-xs-12">
					{isSubmitted && (
						<BookingSummary
							booking={booking}
							payment={calculatePayment()}
							onConfirm={handleFormSubmit}
							isFormValid={isValidated}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default BookingForm;
