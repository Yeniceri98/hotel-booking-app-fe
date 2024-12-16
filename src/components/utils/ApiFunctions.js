import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:8080/api',
});

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
};

export const getHeader = () => {
	const token = localStorage.getItem('token');
	console.log('getHeader() token: ', token);

	if (!token) {
		throw new Error('No token found. Please log in again.');
	}

	return {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	};
};

export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData();
	formData.append('photo', photo);
	formData.append('roomType', roomType);
	formData.append('roomPrice', roomPrice);

	try {
		const response = await api.post('/rooms/add-room', formData);
		return response.status === 201;
	} catch (error) {
		console.error('API error:', error.response.data);
		return false;
	}
}

export const getRoomTypes = async () => {
	try {
		const response = await api.get('/rooms/room-types');
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch room types:', error.response.data);
	}
};

export const getAllRooms = async () => {
	try {
		const response = await api.get('/rooms/all-rooms');
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch all rooms:', error.response.data);
	}
};

export const getAvailableRooms = async (checkInDate, checkOutDate, roomType) => {
	const formattedCheckInDate = formatDate(checkInDate);
	const formattedCheckOutDate = formatDate(checkOutDate);
	console.log('Room type: ', roomType);

	try {
		const response = await api.get('/rooms/available-rooms', {
			params: {
				checkInDate: formattedCheckInDate,
				checkOutDate: formattedCheckOutDate,
				roomType,
			},
		});
		console.log('Response data:', response.data);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch available rooms:', error.response.data);
	}
};

export const deleteRoom = async (id) => {
	try {
		const response = await api.delete(`/rooms/delete-room/${id}`);

		if (response.status !== 200) {
			throw new Error(`Error deleting room: ${response.statusText}`);
		}

		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const updateRoom = async (roomId, roomData) => {
	const formData = new FormData();
	formData.append('photo', roomData.photo);
	formData.append('roomType', roomData.roomType);
	formData.append('roomPrice', roomData.roomPrice);

	try {
		const response = await api.put(`/rooms/room/${roomId}`, formData);

		if (response.status !== 200) {
			throw new Error(`Error updating room: ${response.statusText}`);
		}

		return response;
	} catch (error) {
		throw error.response.data;
	}
};

export const getRoomById = async (roomId) => {
	try {
		const response = await api.get(`/rooms/room/${roomId}`);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch room details:', error.response.data);
	}
};

export const getRoomPhotoByRoomId = async (roomId) => {
	try {
		const response = await api.get(`/rooms/room-photo/${roomId}`, {
			responseType: 'arraybuffer',
		});
		return new Uint8Array(response.data);
	} catch (error) {
		throw new Error('Failed to fetch room photo:', error.response.data);
	}
};

export const addBooking = async (roomId, booking) => {
	try {
		const formattedCheckInDate = formatDate(booking.checkInDate);
		const formattedCheckOutDate = formatDate(booking.checkOutDate);

		const response = await api.post(`/bookings/add-booking/${roomId}`, {
			checkInDate: formattedCheckInDate,
			checkOutDate: formattedCheckOutDate,
			guestName: booking.guestName,
			guestEmail: booking.guestEmail,
			numOfAdults: booking.numOfAdults,
			numOfChildren: booking.numOfChildren,
		});

		console.log('addBooking - response:', response);

		if (response.status !== 201) {
			throw new Error(`Error booking room: ${response.statusText}`);
		}

		return response.data;
	} catch (error) {
		throw new Error('Failed to book room:', error.response.data);
	}
};

export const getAllBookings = async () => {
	try {
		const response = await api.get('/bookings');
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch all booked rooms:', error.response.data);
	}
};

export const getBookingByConfirmationCode = async (confirmationCode) => {
	try {
		const response = await api.get(`/bookings/confirmation-code/${confirmationCode}`);
		return response.data;
	} catch (error) {
		throw new Error(
			'Failed to fetch booking details with given confirmation code:',
			error
		);
	}
};

export const getBookingsByEmail = async (email) => {
	try {
		const response = await api.get(`/bookings/email/${email}`);
		return response.data;
	} catch (error) {
		throw new Error(
			`Failed to fetch booking details with given email: ${email}, Error: ${
				error.response?.data || error.message
			}`
		);
	}
};

export const deleteBooking = async (bookingId) => {
	try {
		const response = await api.delete(`/bookings/delete-booking/${bookingId}`);

		if (response.status !== 200) {
			throw new Error(`Error deleting booking: ${response.statusText}`);
		}

		return response;
	} catch (error) {
		throw new Error('Failed to delete booking:', error.response.data);
	}
};

export const registerUser = async (registration) => {
	try {
		const response = await api.post('/auth/register', registration);

		if (response.status !== 201) {
			throw new Error('Failed to register user:', response.statusText);
		}

		return response.data;
	} catch (error) {
		throw new Error('Failed to register user:', error.response.data);
	}
};

export const loginUser = async (login) => {
	try {
		const response = await api.post('/auth/login', login);

		if (response.status !== 200) {
			throw new Error('Invalid credentials');
		}

		return response.data;
	} catch (error) {
		throw new Error('Failed to login:', error.response.data);
	}
};

export const logoutUser = async () => {
	try {
		const response = await api.post('/auth/logout', null, getHeader());

		if (response.status === 200) {
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			localStorage.removeItem('userRole');
			return response.data;
		}

		throw new Error('Logout failed');
	} catch (error) {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('userRole');
		throw new Error(error.response?.data || 'Logout failed. Please try again.');
	}
};

export async function getUserById(userId) {
	try {
		const response = await api.get(`/users/${userId}`, getHeader());
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch user:', error.response.data);
	}
}

export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/${userId}`, getHeader());
		return response.data;
	} catch (error) {
		throw new Error('Failed to delete user:', error.response.data);
	}
}
