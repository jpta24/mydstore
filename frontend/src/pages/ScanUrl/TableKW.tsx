import React from 'react';

import { UrlInterface } from './UrlsInterface';

import Row from './Row';

interface Props {
	keyWords: UrlInterface[];
}

const TableKW = ({ keyWords }: Props) => {
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
