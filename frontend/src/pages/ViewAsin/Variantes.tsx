import React from 'react';
import { Table } from 'react-bootstrap';

interface Props {
	variantes:
		| {
				colors: Variant[];
				size: Variant[];
				style: Variant[];
				pattern: Variant[];
		  }
		| undefined;
}

interface Variant {
	asin: string;
	price: string;
	option: string;
}
const Variantes = ({ variantes }: Props) => {
	return (
		<div className='row'>
			<div className='col-md-3'>
				<Table striped bordered hover variant='light'>
					<thead>
						<tr>
							<th>Color</th>
						</tr>
					</thead>
					<tbody>
						{variantes?.colors.map((eachMap) => {
							return (
								<tr>
									<td>{`${eachMap.option} - ${eachMap.price} - ${eachMap.asin}`}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			<div className='col-md-3'>
				<Table striped bordered hover variant='light'>
					<thead>
						<tr>
							<th>Size</th>
						</tr>
					</thead>
					<tbody>
						{variantes?.size.map((eachMap) => {
							return (
								<tr>
									<td>{`${eachMap.option} - ${eachMap.price} - ${eachMap.asin}`}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			<div className='col-md-3'>
				<Table striped bordered hover variant='light'>
					<thead>
						<tr>
							<th>Style</th>
						</tr>
					</thead>
					<tbody>
						{variantes?.style.map((eachMap) => {
							return (
								<tr>
									<td>{`${eachMap.option} - ${eachMap.price} - ${eachMap.asin}`}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			<div className='col-md-3'>
				<Table striped bordered hover variant='light'>
					<thead>
						<tr>
							<th>Pattern</th>
						</tr>
					</thead>
					<tbody>
						{variantes?.pattern.map((eachMap) => {
							return (
								<tr>
									<td>{`${eachMap.option} - ${eachMap.price} - ${eachMap.asin}`}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			{/* <Table striped bordered hover variant='light' style={{ width: '50%' }}>
				<thead>
					<tr>
						<th>Color</th>
					</tr>
				</thead>
				<tbody>
					{Array.from(Array(8), (e, i) => {
						return (
							<tr>
								<td>{i}</td>
							</tr>
						);
					})}
				</tbody>
				<thead>
					<tr>
						<th>Size</th>
					</tr>
				</thead>
				<tbody>
					{Array.from(Array(10), (e, i) => {
						return (
							<tr>
								<td>{i}</td>
							</tr>
						);
					})}
				</tbody>
			</Table> */}
		</div>
	);
};

export default Variantes;
