import React from 'react';

import { UrlInterface } from './UrlsInterface';
import { AsinsConfirmedInterface } from './AsinsConfirmedInterface';

import RowTable from './Row';

interface Props {
	keyWords: UrlInterface[];
	loadKeyWords: () => void;
	asinsConfirmed: AsinsConfirmedInterface[];
}

const TableKW = ({ keyWords, loadKeyWords, asinsConfirmed }: Props) => {
	return (
		<div className='mb-4'>
			<div className='row'>
				<div className='col-3 th border'>KEYWORDS</div>
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
				<div className='col-1 th border'>REMOVE</div>
			</div>
			{keyWords.map((eachKW: UrlInterface) => {
				return (
					<RowTable
						eachKW={eachKW}
						key={eachKW._id}
						loadKeyWords={loadKeyWords}
						asinsConfirmed={asinsConfirmed}
					/>
				);
			})}
		</div>
	);
};

export default TableKW;
