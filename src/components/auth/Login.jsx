import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
	const [errorMessage, setErrorMessage] = useState('');
	const [login, setLogin] = useState({
		email: '',
		password: '',
	});

	const { handleLogin } = useAuth();

	const handleInputChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await handleLogin(login);
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	return (
		<section className="container col-6 mt-5 mb-5">
			<h1 className="text-center">Login</h1>
			<form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
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
