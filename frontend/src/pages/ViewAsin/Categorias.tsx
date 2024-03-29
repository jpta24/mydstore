import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';

interface Props {
	categorias: string[] | undefined;
}

const Categorias = ({ categorias }: Props) => {
	return (
		<InputGroup className='mb-3'>
			<InputGroup.Text>Categorias</InputGroup.Text>
			{categorias?.length === 0 ? (
				<FormControl value={''} />
			) : (
				categorias?.map((eachSel: string) => {
					return <FormControl value={eachSel} />;
				})
			)}
		</InputGroup>
	);
};

export default Categorias;
