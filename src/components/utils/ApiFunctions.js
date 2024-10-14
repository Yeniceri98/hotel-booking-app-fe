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
