import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

interface Props {
	selection: string[] | undefined;
}

const Selection = ({ selection }: Props) => {
	return (
		<InputGroup className='mb-3'>
			<InputGroup.Text>Selección</InputGroup.Text>

			{selection?.length === 0 ? (
				<FormControl value={''} />
			) : (
				selection?.map((eachSel: string) => {
					return <FormControl value={eachSel} />;
				})
			)}
		</InputGroup>
	);
};

export default Selection;
