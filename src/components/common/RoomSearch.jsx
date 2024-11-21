import { useState } from 'react';
import RoomSearchResult from './RoomSearchResult';
import moment from 'moment/moment';
import { getAvailableRooms } from '../utils/ApiFunctions';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import RoomTypeSelector from './RoomTypeSelector';

const RoomSearch = () => {
	const [searchQuery, setSearchQuery] = useState({
		checkInDate: '',
		checkOutDate: '',
		roomType: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [availableRooms, setAvailableRooms] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = (e) => {
		e.preventDefault();
		const checkIn = moment(searchQuery.checkInDate);
		const checkOut = moment(searchQuery.checkOutDate);

		if (!checkIn.isValid() || !checkOut.isValid()) {
			setErrorMessage('Please enter valid date range');
			return;
		} else if (checkOut.isSameOrBefore(checkIn)) {
			setErrorMessage(
				'Check-out date cannot be the same or before from the check-in date'
			);
			return;
		}

		setIsLoading(true);

		setTimeout(() => {
			getAvailableRooms(
				searchQuery.checkInDate,
				searchQuery.checkOutDate,
				searchQuery.roomType
			)
				.then((response) => {
					setAvailableRooms(response);
					console.log('Available rooms:', response);
				})
				.catch((err) => {
					setErrorMessage(err.message);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, 1000);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const checkIn = moment(searchQuery.checkInDate);
		const checkOut = moment(searchQuery.checkOutDate);

		if (checkIn.isValid() && checkOut.isValid()) {
			setErrorMessage('');
		}

		setSearchQuery({
			...searchQuery,
			[name]: value,
		});
	};

	const handleClearSearch = () => {
		setSearchQuery({
			checkInDate: '',
			checkOutDate: '',
			roomType: '',
		});
	};

	return (
		<Container className="mt-5 mb-5 py-5 shadow">
			<Form onSubmit={handleSearch}>
				<Row className="justify-content-center">
					<Col xs={12} md={4}>
						<Form.Group controlId="checkInDate">
							<Form.Label>Check-in Date</Form.Label>
							<Form.Control
								type="date"
								name="checkInDate"
								value={searchQuery.checkInDate}
								onChange={handleInputChange}
								min={moment().format('YYYY-MM-DD')}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={4}>
						<Form.Group controlId="checkOutDate">
							<Form.Label>Check-out Date</Form.Label>
							<Form.Control
								type="date"
								name="checkOutDate"
								value={searchQuery.checkOutDate}
								onChange={handleInputChange}
								min={moment().format('YYYY-MM-DD')}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={4}>
						<Form.Group controlId="roomType">
							<Form.Label>Room Type</Form.Label>
							<div className="d-flex">
								<RoomTypeSelector
									handleRoomInputChange={handleInputChange}
									newRoom={searchQuery}
								/>
								<Button variant="secondary" type="submit">
									Search
								</Button>
							</div>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			{isLoading ? (
				<p className="text-center mt-4">Finding available rooms...</p>
			) : (
				<RoomSearchResult
					results={availableRooms || []}
					clearSearch={handleClearSearch}
				/>
			)}
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
		</Container>
	);
};

export default RoomSearch;
