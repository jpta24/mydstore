import React, { useEffect, useState } from 'react';
import * as axiosServices from './AxiosServices';

import { UrlInterface } from './UrlsInterface';

import ScanOneUrl from './ScanOneUrl';
import TableKW from './TableKW';

import './style.scss';

const ScanUrl = () => {
	const [keyWords, setKeyWords] = useState<UrlInterface[]>([]);

	const loadKeyWords = async () => {
		const res = await axiosServices.getKeyWords();

		const formatedKW = res.data
			.map((eachKW) => {
				return {
					...eachKW,
					createdAt: eachKW.createdAt ? new Date(eachKW.createdAt) : new Date(),
					updatedAt: eachKW.updatedAt ? new Date(eachKW.updatedAt) : new Date(),
				};
			})
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		setKeyWords(formatedKW);
	};

	useEffect(() => {
		loadKeyWords();
	}, []);

	return (
		<div className='container scanUrlBody'>
			<h1 className='my-3 h1centerV'>Control de URL por KeyWords</h1>
			<ScanOneUrl loadKeyWords={loadKeyWords} />
			<h3 className='my-3 h1centerV'>Tabla de KeyWords</h3>
			<TableKW keyWords={keyWords} loadKeyWords={loadKeyWords} />
		</div>
	);
};

export default ScanUrl;
