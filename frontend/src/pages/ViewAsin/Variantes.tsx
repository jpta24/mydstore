import React from 'react';
import { Table } from 'react-bootstrap';

const Variantes = () => {
	return (
		<Table striped bordered hover variant='light'>
			<thead>
				<tr>
					<th>Color</th>
					<th>Size</th>
					<th>Style</th>
					<th>Pattern</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default Variantes;
