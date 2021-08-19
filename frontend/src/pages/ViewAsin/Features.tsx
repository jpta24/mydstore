import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

interface Props {
	features: string[] | undefined;
}
const Features = ({ features }: Props) => {
	return (
		<Form.Group className='mb-3'>
			<Form.Label style={{ color: 'white' }}>Features</Form.Label>
			{features?.length === 0 ? (
				<FormControl value={''} />
			) : (
				features?.map((eachSel: string) => {
					return <FormControl value={eachSel} />;
				})
			)}
		</Form.Group>
	);
};

export default Features;
