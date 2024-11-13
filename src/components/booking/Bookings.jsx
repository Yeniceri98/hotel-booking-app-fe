import { useEffect, useState } from 'react';
import { getAllBookings, deleteBooking } from '../utils/ApiFunctions';
import BookingsTable from './BookingsTable';

const Bookings = () => {
	const [bookingInfo, setBookingInfo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		setTimeout(() => {
			getAllBookings()
				.then((data) => {
					setBookingInfo(data);
					setIsLoading(false);
				})
				.catch((error) => {
					setErrorMessage(error.message);
					setIsLoading(false);
				});
		}, 1000);
	}, []);

	console.log('bookingInfo: ', bookingInfo);

	const handleBookingCancellation = async (bookingId) => {
		try {
			await deleteBooking(bookingId);
			const data = await getAllBookings();
			setBookingInfo(data);
		} catch (error) {
			console.error('Error deleting booking:', error);
		}
	};

	return (
		<section className="container" style={{ backgroundColor: 'whitesmoke' }}>
			<h1 className="text-center mt-4">Existing Bookings</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					{errorMessage && <p className="text-danger">{errorMessage}</p>}
					{bookingInfo.length === 0 ? (
						<p>No bookings found.</p>
					) : (
						<BookingsTable
							bookingInfo={bookingInfo}
							handleBookingCancellation={handleBookingCancellation}
						/>
					)}
				</>
			)}
		</section>
	);
};

export default Bookings;
