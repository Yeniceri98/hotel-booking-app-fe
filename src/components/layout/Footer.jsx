import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
	let today = new Date();

	return (
		<footer className="footer bg-dark text-light">
			<Container>
				<Row>
					<Col xs={12} md={12} className="text-center mt-3">
						<p>&copy;{today.getFullYear()} - ASY Hotel</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
