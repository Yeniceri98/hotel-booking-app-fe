/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from 'react';
import { Card, CardBody, CardText, CardTitle, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getRoomPhotoByRoomId } from '../utils/ApiFunctions';

const RoomCard = ({ room }) => {
	const [roomPhoto, setRoomPhoto] = useState(null);

	useEffect(() => {
		getRoomPhotoByRoomId(room.id)
			.then((data) => {
				setRoomPhoto(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [room.id]);
	return (
		<Col key={room.id} className="mb-4 mt-4" xs={12}>
			<Card>
				<CardBody className="d-flex flex-wrap align-items-center justify-content-center">
					<div className="flex-shrink-0 mr-3 mb-3">
						<img
							src={`data:image/jpeg;base64,${btoa(
								String.fromCharCode.apply(null, roomPhoto)
							)}`}
							alt="Room Photo"
							width={200}
							height={200}
						/>
					</div>
					<div className="flex-grow-1 ml-3 px-2">
						<CardTitle className="hotel-color">{room.roomType}</CardTitle>
						<CardTitle className="room-price">${room.roomPrice} per night</CardTitle>
						<CardText>Some room information goes here for the guests to see</CardText>
					</div>
					<div className="flex-shrink-0 mt-3">
						<Link to={`/book-room/${room.id}`} className="btn btn-primary">
							Book Now
						</Link>
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default RoomCard;
