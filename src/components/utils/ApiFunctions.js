import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:8080/api',
});

export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData();
	formData.append('photo', photo);
	formData.append('roomType', roomType);
	formData.append('roomPrice', roomPrice);

	try {
		const response = await api.post('/rooms/add-room', formData);
		console.log('API response:', response);
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
		const response = await api.put(`/rooms/update-room/${roomId}`, formData);
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
