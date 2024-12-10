import { useState } from 'react';
import { registerUser } from '../utils/ApiFunctions';
import { Link } from 'react-router-dom';

const Registration = () => {
	const [registration, setRegistration] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const handleInputChange = (e) => {
		setRegistration({
			...registration,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegistration = async (e) => {
		e.preventDefault();

		try {
			const response = await registerUser(registration);

			if (response) {
				setSuccessMessage(
					<>
						Registration successful! Please{' '}
						<Link to="/login" className="text-decoration-none">
							login
						</Link>{' '}
						to continue...
					</>
				);
				setErrorMessage('');
				setRegistration({
					firstName: '',
					lastName: '',
					email: '',
					password: '',
				});
			}
		} catch (error) {
			setErrorMessage('Registration failed! Please try again...', error.message);
			setSuccessMessage('');
			setRegistration({
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			});
		}
	};

	return (
		<section className="container col-6 mt-5 mb-5">
			<h1 className="text-center">Register</h1>
			<form
				onSubmit={handleRegistration}
				className="p-4 border rounded shadow-sm bg-light">
				<div className="mb-3">
					<label htmlFor="firstName" className="form-label">
						First Name
					</label>
					<input
						type="firstName"
						id="firstName"
						name="firstName"
						value={registration.firstName}
						className="form-control"
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="lastName" className="form-label">
						Last Name
					</label>
					<input
						type="lastName"
						id="lastName"
						name="lastName"
						value={registration.lastName}
						className="form-control"
						onChange={handleInputChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={registration.email}
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
						value={registration.password}
						className="form-control"
						onChange={handleInputChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary w-100">
					Register
				</button>
			</form>
			{errorMessage && <p className="alert alert-danger mt-3">{errorMessage}</p>}
			{successMessage && <p className="alert alert-success mt-3">{successMessage}</p>}
		</section>
	);
};

export default Registration;
