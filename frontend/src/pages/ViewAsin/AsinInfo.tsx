import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

import Imgs from './Imgs';
import Categorias from './Categorias';
import Variantes from './Variantes';
import Features from './Features';
import Features2 from './Features2';
import Selection from './Selection';

import { AsinItemInterface } from './AsinItemInterface';

interface Props {
	inputs: AsinItemInterface;
}

const AsinInfo = ({ inputs }: Props) => {
	return (
		<div>
			<InputGroup className='mb-3'>
				<InputGroup.Text>ASIN</InputGroup.Text>
				<FormControl id='asin' value={inputs.asin} />
				<InputGroup.Text>KEYWORD</InputGroup.Text>
				<FormControl id='keyword' value={inputs.keyWord} />
			</InputGroup>
			<InputGroup className='mb-3'>
				<InputGroup.Text>Link</InputGroup.Text>
				<FormControl id='link' value={inputs.linkAsin} />
			</InputGroup>
			<Categorias categorias={inputs.categorias} />
			<InputGroup className='mb-3'>
				<InputGroup.Text>Nombre</InputGroup.Text>
				<FormControl id='nombre' value={inputs.nombre} />
			</InputGroup>
			<InputGroup className='mb-3'>
				<InputGroup.Text>Meta</InputGroup.Text>
				<FormControl
					id='meta'
					value={inputs.meta === undefined ? 'No definido' : inputs.meta}
				/>
			</InputGroup>
			<InputGroup className='mb-3'>
				<InputGroup.Text>Precio</InputGroup.Text>
				<FormControl
					id='precio'
					value={inputs.precio === 0 ? '' : inputs.precio}
				/>
				<InputGroup.Text>Cantidad</InputGroup.Text>
				<FormControl
					id='cantidad'
					value={inputs.cantidad === 0 ? '' : inputs.cantidad}
				/>
				<InputGroup.Text>Ranking</InputGroup.Text>
				<FormControl
					id='ranking'
					value={inputs.rankings?.maxRank === 0 ? '' : inputs.rankings?.maxRank}
				/>
				<InputGroup.Text>Disponibilidad</InputGroup.Text>
				<InputGroup.Checkbox
					id='disponibilidad'
					checked={inputs.disponibilidad}
				/>
				<InputGroup.Text>Prime</InputGroup.Text>
				<InputGroup.Checkbox id='prime' checked={inputs.prime} />
				<InputGroup.Text>Nuevo</InputGroup.Text>
				<InputGroup.Checkbox id='nuevo' checked={inputs.condicionNew} />
				<InputGroup.Text>Cupon</InputGroup.Text>
				<InputGroup.Checkbox id='cupon' checked={inputs.cupon} />
			</InputGroup>
			<p style={{ color: 'white' }}>Imagenes</p>
			<Imgs imagenes={inputs.imagenes} asin={inputs.asin} />
			<InputGroup className='mb-3'>
				<InputGroup.Text>Medidas</InputGroup.Text>
				<FormControl id='medidas' value={inputs.medidas?.dimensiones} />
				<InputGroup.Text>Largo</InputGroup.Text>
				<FormControl
					id='largo'
					value={inputs.medidas?.largo === 0 ? '' : inputs.medidas?.largo}
				/>
				<InputGroup.Text>Ancho</InputGroup.Text>
				<FormControl
					id='Ancho'
					value={inputs.medidas?.ancho === 0 ? '' : inputs.medidas?.ancho}
				/>
				<InputGroup.Text>Prof</InputGroup.Text>
				<FormControl
					id='Prof'
					value={inputs.medidas?.prof === 0 ? '' : inputs.medidas?.prof}
				/>
				<InputGroup.Text>Volumen</InputGroup.Text>
				<FormControl
					id='volumen'
					value={inputs.medidas?.volumen === 0 ? '' : inputs.medidas?.volumen}
				/>
				<InputGroup.Text>Peso</InputGroup.Text>
				<FormControl
					id='peso'
					value={inputs.medidas?.peso === 0 ? '' : inputs.medidas?.peso}
				/>
			</InputGroup>
			<Selection selection={inputs.selection} />
			<InputGroup className='mb-3'>
				<InputGroup.Text>Variantes</InputGroup.Text>
				<InputGroup.Text>Color</InputGroup.Text>
				<FormControl
					id='color'
					value={inputs.asin === '' ? '' : inputs.variantes?.colors.length}
				/>
				<InputGroup.Text>Size</InputGroup.Text>
				<FormControl
					id='size'
					value={inputs.asin === '' ? '' : inputs.variantes?.size.length}
				/>
				<InputGroup.Text>Style</InputGroup.Text>
				<FormControl
					id='style'
					value={inputs.asin === '' ? '' : inputs.variantes?.style.length}
				/>
				<InputGroup.Text>Pattern</InputGroup.Text>
				<FormControl
					id='pattern'
					value={inputs.asin === '' ? '' : inputs.variantes?.pattern.length}
				/>
			</InputGroup>
			<Variantes variantes={inputs.variantes} />
			<Form.Group className='mb-3'>
				<Form.Label style={{ color: 'white' }}>Descripcion</Form.Label>
				<Form.Control as='textarea' rows={3} value={inputs.descripcion} />
			</Form.Group>
			<Features features={inputs.features} />
			<Features2 features2={inputs.features2} />
		</div>
	);
};

export default AsinInfo;
