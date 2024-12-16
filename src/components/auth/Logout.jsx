import { useAuth } from '../context/AuthProvider';

const Logout = () => {
	const { handleLogout } = useAuth();

	return (
		<li>
			<button className="nav-link text-dark btn btn-link" onClick={handleLogout}>
				Logout
			</button>
		</li>
	);
};
export default Logout;
