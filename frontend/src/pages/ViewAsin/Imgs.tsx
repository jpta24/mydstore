import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';

const Imgs = () => {
	return (
		<Row className='mb-3'>
			<Col className='text-center'>
				<Image src='add.png' thumbnail />
			</Col>
			<Col className='text-center'>
				<Image src='add.png' thumbnail />
			</Col>
			<Col className='text-center'>
				<Image src='add.png' thumbnail />
			</Col>
		</Row>
	);
};

export default Imgs;
