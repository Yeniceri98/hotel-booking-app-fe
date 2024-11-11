/* eslint-disable jsx-a11y/img-redundant-alt */
import {
	FaUtensils,
	FaWifi,
	FaTv,
	FaWineGlassAlt,
	FaParking,
	FaCar,
	FaTshirt,
} from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomById, getRoomPhotoByRoomId } from '../utils/ApiFunctions';

const BookingRoomPreview = () => {
	const [roomInfo, setRoomInfo] = useState({
		roomType: '',
		roomPrice: '',
	});
	const [photo, setPhoto] = useState('');

	const { roomId } = useParams();

	useEffect(() => {
		const fetchRoomInfo = async () => {
			try {
				const roomData = await getRoomById(roomId);
				const photo = await getRoomPhotoByRoomId(roomId);
				setRoomInfo(roomData);
				setPhoto(photo);
			} catch (error) {
				console.error('Error fetching room info:', error);
			}
		};

		fetchRoomInfo();
	}, [roomId, setRoomInfo, setPhoto]);

	return (
		<div className="room-info">
			{photo && (
				<img
					src={`data:image/jpeg;base64,${btoa(String.fromCharCode.apply(null, photo))}`}
					alt="Room Photo"
					width="100%"
					height="100%"
				/>
			)}
			<table className="table table-bordered">
				<tbody>
					<tr>
						<th>Room Type:</th>
						<td>{roomInfo.roomType}</td>
					</tr>
					<tr>
						<th>Price per night:</th>
						<td>${roomInfo.roomPrice}</td>
					</tr>
					<tr>
						<th>Room Service:</th>
						<td>
							<ul className="list-unstyled">
								<li>
									<FaWifi /> Wifi
								</li>
								<li>
									<FaTv /> Netfilx Premium
								</li>
								<li>
									<FaUtensils /> Breakfast
								</li>
								<li>
									<FaWineGlassAlt /> Mini bar refreshment
								</li>
								<li>
									<FaCar /> Car Service
								</li>
								<li>
									<FaParking /> Parking Space
								</li>
								<li>
									<FaTshirt /> Laundry
								</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default BookingRoomPreview;
