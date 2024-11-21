import { Link } from 'react-router-dom';

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2>Welcome to the Admin Panel</h2>
			<hr />
			<Link to="/existing-rooms">Existing Rooms</Link>
			<br />
			<Link to="/existing-bookings">Existing Bookings</Link> <br />
			<Link to="/search-room">Search Booked Rooms</Link>
		</section>
	);
};

export default Admin;
