import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';

interface Props {
	imagenes: ImgsInterface[] | undefined;
	asin: string | undefined;
}

interface ImgsInterface {
	src: string;
	detImgAsin: string;
}

const Imgs = ({ imagenes, asin }: Props) => {
	return (
		<div>
			{asin === '' ? (
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
			) : (
				<Row className='mb-3'>
					{imagenes?.map((eachImg: ImgsInterface) => {
						return (
							<Col className='text-center'>
								<Image src={eachImg.src} thumbnail />
								<span style={{ display: 'block', color: 'white' }}>
									{eachImg.detImgAsin}
								</span>
							</Col>
						);
					})}

					{/* {imagenes?.map((eachImg: ImgsInterface) => {
					return (
						
							<Col className='text-center'>
								<Image src={eachImg.src} thumbnail />
								<span>{eachImg.detImgAsin}</span>
							</Col>
							
					)};
				)} */}
				</Row>
			)}
		</div>
	);
};

export default Imgs;
