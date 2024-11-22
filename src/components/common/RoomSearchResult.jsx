import { useState } from 'react';
import { Row } from 'react-bootstrap';
import RoomCard from '../rooms/RoomCard';
import RoomPaginator from './RoomPaginator';

const RoomSearchResult = ({ results, clearSearch }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 3;
	const totalResults = results.length;
	const totalPages = Math.ceil(totalResults / resultsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const startIndex = (currentPage - 1) * resultsPerPage;
	const endIndex = startIndex + resultsPerPage;
	const paginatedResult = results.slice(startIndex, endIndex);

	return (
		<>
			{results.length > 0 ? (
				<div>
					<h5 className="text-center mt-5">Search Results</h5>
					<Row>
						{paginatedResult.map((room) => (
							<RoomCard key={room.id} room={room} />
						))}
					</Row>
					<Row>
						{totalResults > resultsPerPage && (
							<RoomPaginator
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
						<button className="btn btn-secondary" onClick={clearSearch}>
							Clear Search
						</button>
					</Row>
				</div>
			) : (
				<div className="text-center mt-4">
					<p className="text-muted">
						No rooms available for the selected dates and room type.
						<br />
						Please try different dates or room type.
					</p>
				</div>
			)}
		</>
	);
};

export default RoomSearchResult;
