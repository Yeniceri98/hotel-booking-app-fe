/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { getAllRooms, getRoomPhotoByRoomId } from '../utils/ApiFunctions';

const HomePage = () => {
	const [rooms, setRooms] = useState([]);
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		fetchAllRooms();
	}, []);

	const fetchAllRooms = async () => {
		try {
			const response = await getAllRooms();
			setRooms(response);
			fetchAllPhotos(response);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchAllPhotos = async (rooms) => {
		try {
			const photoSet = new Set();
			for (const room of rooms) {
				const photoResponse = await getRoomPhotoByRoomId(room.id);
				const photoBase64 = btoa(String.fromCharCode.apply(null, photoResponse));
				photoSet.add(photoBase64);
			}
			setPhotos([...photoSet]);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<header className="bg-dark text-light p-5 text-center">
				<h1 className="display-4 font-weight-bold">Welcome to ASY Hotel</h1>
				<p className="lead mb-4">Find the perfect room for your stay with us.</p>
				<Link to="/rooms" className="btn btn-primary btn-lg shadow">
					Browse All Rooms
				</Link>
			</header>
			<div className="container mt-5 mb-5">
				<Carousel
					className="shadow rounded"
					style={{ maxWidth: '900px', margin: '0 auto' }}>
					{photos.map((photo, index) => (
						<Carousel.Item key={index}>
							<img
								className="d-block w-100 rounded"
								src={`data:image/jpeg;base64,${photo}`}
								alt="Room Photo"
								style={{ height: '500px', objectFit: 'cover' }}
							/>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default HomePage;
