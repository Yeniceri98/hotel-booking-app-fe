import { useState, useEffect } from 'react';
import DateSlider from '../common/DateSlider';

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
	const [filteredBookings, setFilteredBookings] = useState(bookingInfo);

	const filterBookings = (startDate, endDate) => {
		let filtered = bookingInfo;

		if (startDate && endDate) {
			filtered = bookingInfo.filter((booking) => {
				const checkInDate = new Date(booking.checkInDate);
				const checkOutDate = new Date(booking.checkOutDate);
				return (
					checkInDate >= startDate && checkOutDate <= endDate && checkOutDate > startDate
				);
			});
		}
		setFilteredBookings(filtered);
	};

	useEffect(() => {
		setFilteredBookings(bookingInfo);
	}, [bookingInfo]);

	return (
		<section className="p-4">
			<DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />

			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr>
						<th>Booking ID</th>
						<th>Room ID</th>
						<th>Room Type</th>
						<th>Check-in Date</th>
						<th>Check-out Date</th>
						<th>Guest Name</th>
						<th>Guest Email</th>
						<th>Adults</th>
						<th>Children</th>
						<th>Confirmation Code</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredBookings.map((booking) => (
						<tr key={booking.id}>
							<td>{booking.bookingId}</td>
							<td>{booking.room.id}</td>
							<td>{booking.room.roomType}</td>
							<td>{booking.checkInDate}</td>
							<td>{booking.checkOutDate}</td>
							<td>{booking.guestName}</td>
							<td>{booking.guestEmail}</td>
							<td>{booking.numOfAdults}</td>
							<td>{booking.numOfChildren}</td>
							<td>{booking.bookingConfirmationCode}</td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => handleBookingCancellation(booking.bookingId)}>
									Cancel Booking
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{filteredBookings.length === 0 && <p>No bookings found...</p>}
		</section>
	);
};

export default BookingsTable;
