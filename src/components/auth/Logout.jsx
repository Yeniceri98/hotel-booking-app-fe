import { logoutUser } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logoutUser();
			console.log('Logout successful');
			navigate('/login');
		} catch (error) {
			console.error('Logout failed:', error.message);
		}
	};

	return (
		<li>
			<button className="nav-link text-dark btn btn-link" onClick={handleLogout}>
				Logout
			</button>
		</li>
	);
};
export default Logout;
