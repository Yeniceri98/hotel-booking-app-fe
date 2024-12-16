import React, { useState, createContext, useContext } from 'react';
import { loginUser, logoutUser } from '../utils/ApiFunctions';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async (login) => {
		try {
			const success = await loginUser(login);
			if (success) {
				const token = success.token;
				const decodedToken = jwtDecode(token);

				localStorage.setItem('token', token);
				localStorage.setItem('userId', decodedToken.id);
				localStorage.setItem('userRole', decodedToken.roles.join(','));

				setUser(decodedToken);
				navigate('/profile');
			} else {
				throw new Error('Invalid credentials');
			}
		} catch (error) {
			console.error('Login Error:', error.message);
			throw error;
		}
	};

	const handleLogout = async () => {
		try {
			await logoutUser();
			localStorage.clear();
			console.log('Logout successful');
			setUser(null);
			navigate('/login');
		} catch (error) {
			console.log(error.message);
			throw error;
		}
	};

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}

	return context;
};
