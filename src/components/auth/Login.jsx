import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser } from '../utils/ApiFunctions';

const Login = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		// Clear any previous login data (if exists)
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('userRole');

		const success = await loginUser(login);

		if (success) {
			const token = success.token;
			const decodedToken = jwtDecode(token);
			localStorage.setItem('token', token);
			localStorage.setItem('userId', decodedToken.id);
			localStorage.setItem('userRole', decodedToken.roles.join(','));
			console.log('Token: ', token);
			console.log('Decoded Token: ', decodedToken);
			navigate('/profile');
		} else {
			setErrorMessage('Invalid credentials! Please try again...');
		}
	};

	return (
		<section className="container col-6 mt-5 mb-5">
			<h1 className="text-center">Login</h1>
			<form onSubmit={handleLogin} className="p-4 border rounded shadow-sm bg-light">
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						className="form-control"
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						className="form-control"
						onChange={handleInputChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary w-100">
					Login
				</button>
			</form>
			{errorMessage && <p className="alert alert-danger mt-3">{errorMessage}</p>}
			<div className="text-center mt-3">
				Don't have an account?{' '}
				<a href="/register" className="text-decoration-none">
					Register
				</a>
			</div>
		</section>
	);
};

export default Login;
