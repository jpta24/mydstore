import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

import Imgs from './Imgs';
import Categorias from './Categorias';
import Variantes from './Variantes';
import Features from './Features';
import Features2 from './Features2';

const AsinInfo = () => {
	return (
		<div>
			<InputGroup className='mb-3'>
				<InputGroup.Text>ASIN</InputGroup.Text>
				<FormControl id='asin' />
				<InputGroup.Text>KEYWORD</InputGroup.Text>
				<FormControl id='keyword' />
			</InputGroup>
			<InputGroup className='mb-3'>
				<InputGroup.Text>Link</InputGroup.Text>
				<FormControl id='link' />
			</InputGroup>
			<Categorias />
			<InputGroup className='mb-3'>
				<InputGroup.Text>Nombre</InputGroup.Text>
				<FormControl id='nombre' />
			</InputGroup>
			<InputGroup className='mb-3'>
				<InputGroup.Text>Precio</InputGroup.Text>
				<FormControl id='precio' />
				<InputGroup.Text>Cantidad</InputGroup.Text>
				<FormControl id='cantidad' />
				<InputGroup.Text>Ranking</InputGroup.Text>
				<FormControl id='ranking' />
				<InputGroup.Text>Disponibilidad</InputGroup.Text>
				<InputGroup.Checkbox id='disponibilidad' />
				<InputGroup.Text>Prime</InputGroup.Text>
				<InputGroup.Checkbox id='prime' />
				<InputGroup.Text>Nuevo</InputGroup.Text>
				<InputGroup.Checkbox id='nuevo' />
				<InputGroup.Text>Cupon</InputGroup.Text>
				<InputGroup.Checkbox id='cupon' />
			</InputGroup>
			<p style={{ color: 'white' }}>Imagenes</p>
			<Imgs />
			<InputGroup className='mb-3'>
				<InputGroup.Text>Medidas</InputGroup.Text>
				<FormControl id='medidas' />
				<InputGroup.Text>Largo</InputGroup.Text>
				<FormControl id='largo' />
				<InputGroup.Text>Ancho</InputGroup.Text>
				<FormControl id='Ancho' />
				<InputGroup.Text>Prof</InputGroup.Text>
				<FormControl id='Prof' />
				<InputGroup.Text>Volumen</InputGroup.Text>
				<FormControl id='volumen' />
			</InputGroup>
			<InputGroup className='mb-3'>
				<InputGroup.Text>Variantes</InputGroup.Text>
				<InputGroup.Text>Seleccion</InputGroup.Text>
				<FormControl id='seleccion' />
				<InputGroup.Text>Color</InputGroup.Text>
				<FormControl id='color' />
				<InputGroup.Text>Size</InputGroup.Text>
				<FormControl id='size' />
				<InputGroup.Text>Style</InputGroup.Text>
				<FormControl id='style' />
				<InputGroup.Text>Pattern</InputGroup.Text>
				<FormControl id='pattern' />
			</InputGroup>
			<Variantes />
			<Form.Group className='mb-3'>
				<Form.Label style={{ color: 'white' }}>Descripcion</Form.Label>
				<Form.Control as='textarea' rows={3} />
			</Form.Group>
			<Features />
			<Features2 />
		</div>
	);
};

export default AsinInfo;
