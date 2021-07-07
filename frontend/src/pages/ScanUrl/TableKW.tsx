import React, { useEffect, useState } from 'react';
import * as axiosServices from './AxiosServices';

import { UrlInterface } from './UrlsInterface';

// pending create Interface

import Row from './Row';

const TableKW = () => {
	const [keyWords, setKeyWords] = useState<UrlInterface[]>([]);

	const loadKeyWords = async () => {
		const res = await axiosServices.getKeyWords();

		const formatedVideos = res.data
			.map((eachKW) => {
				return {
					...eachKW,
					createdAt: eachKW.createdAt ? new Date(eachKW.createdAt) : new Date(),
					updatedAt: eachKW.updatedAt ? new Date(eachKW.updatedAt) : new Date(),
				};
			})
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		setKeyWords(formatedVideos);
	};

	useEffect(() => {
		loadKeyWords();
	}, []);

	return (
		<div>
			<div className='row'>
				<div className='col-4 th border'>KEYWORDS</div>
				<div className='col-4 th border'>
					<div>URLS</div>
					<div className='d-flex'>
						<div className='col r2'>Total</div>
						<div className='col r2'>Checked</div>
						<div className='col r2'>Unchecked</div>
						<div className='col-5 r2'>Scan</div>
					</div>
				</div>
				<div className='col-4 th border'>
					<div>ASINS</div>
					<div className='d-flex'>
						<div className='col r2'>Total</div>
						<div className='col r2'>Checked</div>
						<div className='col r2'>Unchecked</div>
						<div className='col-5 r2'>Scan</div>
					</div>
				</div>
			</div>
			{keyWords.map((eachKW: UrlInterface) => {
				return <Row eachKW={eachKW} key={eachKW._id} />;
			})}
		</div>
	);
};

export default TableKW;
