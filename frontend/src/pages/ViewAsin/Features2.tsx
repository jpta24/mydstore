import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

interface Props {
	features2: string[] | undefined;
}
const Features2 = ({ features2 }: Props) => {
	return (
		<Form.Group className='mb-3'>
			<Form.Label style={{ color: 'white' }}>Features2</Form.Label>
			{features2?.length === 0 ? (
				<FormControl value={''} />
			) : (
				features2?.map((eachSel: string) => {
					return <FormControl value={eachSel} />;
				})
			)}
		</Form.Group>
	);
};

export default Features2;
