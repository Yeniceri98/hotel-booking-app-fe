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

export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData();
	formData.append('photo', photo);
	formData.append('roomType', roomType);
	formData.append('roomPrice', roomPrice);

	try {
		const response = await api.post('/rooms/add-room', formData);
		return response.status === 201;
	} catch (error) {
		console.error('API error:', error);
		return false;
	}
}

export const getRoomTypes = async () => {
	try {
		const response = await api.get('/rooms/room-types');
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch room types');
	}
};

export const getAllRooms = async () => {
	try {
		const response = await api.get('/rooms/all-rooms');
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch all rooms');
	}
};

export const getAvailableRooms = async () => {
	try {
		const response = await api.get('/rooms/available-rooms');
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch available rooms');
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
		throw error;
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
		throw error;
	}
};

export const getRoomById = async (roomId) => {
	try {
		const response = await api.get(`/rooms/room/${roomId}`);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch room details');
	}
};

export const getRoomPhotoByRoomId = async (roomId) => {
	try {
		const response = await api.get(`/rooms/room-photo/${roomId}`, {
			responseType: 'arraybuffer',
		});
		return new Uint8Array(response.data);
	} catch (error) {
		throw new Error('Failed to fetch room photo');
	}
};

export const addBooking = async (roomId, booking) => {
	try {
		const formattedCheckInDate = formatDate(booking.checkInDate);
		const formattedCheckOutDate = formatDate(booking.checkOutDate);

		const response = await api.post(`/bookings/add-booking/${roomId}`, {
			checkInDate: formattedCheckInDate,
			checkOutDate: formattedCheckOutDate,
		});

		if (response.status !== 201) {
			throw new Error(`Error booking room: ${response.statusText}`);
		}

		return response.data;
	} catch (error) {
		throw new Error('Failed to book room');
	}
};

export const getAllBookings = async () => {
	try {
		const response = await api.get('/bookings');
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch all booked rooms');
	}
};

export const getBookingByConfirmationCode = async (confirmationCode) => {
	try {
		const response = await api.get(`/bookings/confirmation-code/${confirmationCode}`);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch booking details with given confirmation code');
	}
};

export const getBookingsByEmail = async (email) => {
	try {
		const response = await api.get(`/bookings/email/${email}`);
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch booking details with given email');
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
		throw new Error('Failed to delete booking');
	}
};
