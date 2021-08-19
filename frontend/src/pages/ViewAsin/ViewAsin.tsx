import React, { useState } from 'react';

import ScanAsinAmazon from './ScanAsinAmazon';
import AsinInfo from './AsinInfo';

import { AsinItemInterface } from './AsinItemInterface';

const ViewAsin = () => {
	let asinEmpty = {
		keyWord: '',
		linkAsin: '',
		nombre: '',
		asin: '',
		precio: 0,
		prime: false,
		disponibilidad: false,
		condicionNew: false,
		cantidad: 0,
		selection: [],
		variantes: {
			colors: [],
			size: [],
			style: [],
			pattern: [],
		},
		descripcion: '',
		features: [],
		features2: [],
		categorias: [],
		imagenes: [],
		medidas: {
			dimensiones: '',
			largo: 0,
			ancho: 0,
			prof: 0,
			peso: 0,
			volumen: 0,
		},
		rankings: {
			ranks: [],
			maxRank: 0,
		},
		cupon: false,
		meta: '',
	};

	const [inputs, setInputs] = useState<AsinItemInterface>(asinEmpty);

	const dataInputs = (item: AsinItemInterface) => {
		setInputs(item);
	};

	return (
		<div className='container scanUrlBody'>
			<h1 className='my-3 h1centerV'>View One Asin</h1>
			<ScanAsinAmazon dataInputs={dataInputs} />
			<h3 className='my-3 h1centerV'>Info</h3>
			<AsinInfo inputs={inputs} />
		</div>
	);
};

export default ViewAsin;
