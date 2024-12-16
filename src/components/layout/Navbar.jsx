/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Logout from '../auth/Logout';

const Navbar = () => {
	const [showAccount, setShowAccount] = useState(false);

	const handleAccountClick = () => {
		setShowAccount(!showAccount);
	};

	const isLoggedIn = localStorage.getItem('token');

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand text-light">
					Hotel Booking App
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/existing-rooms" className="nav-link text-light">
								Existing Rooms
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/add-room" className="nav-link text-light">
								Add Room
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/browse-all-rooms" className="nav-link text-light">
								Browse All Rooms
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/admin" className="nav-link text-light">
								Admin
							</Link>
						</li>
					</ul>
					<ul className="d-flex navbar-nav">
						<li className="nav-item">
							<Link to="/find-booking" className="nav-link text-light">
								Find my booking
							</Link>
						</li>
						<li className="nav-item dropdown">
							<a
								className={`nav-link text-light dropdown-toggle ${
									showAccount ? 'show' : ''
								}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								Account
							</a>
							<ul
								className={`dropdown-menu text-dark ${showAccount ? 'show' : ''}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link to="/login" className="nav-link text-dark">
											Login
										</Link>
									</li>
								)}
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
