import React from 'react';

import { UrlInterface } from './UrlsInterface';

interface Props {
	eachKW: UrlInterface;
}

const Row = ({ eachKW }: Props) => {
	return (
		<div>
			<div className='row'>
				<div className='col-4 rowTable py-1 KW border'>{eachKW.keyWord}</div>
				<div className='col-4 rowTable border'>
					<div className='d-flex'>
						<div className='col r2'>{eachKW.nUrls?.total}</div>
						<div className='col r2'>{eachKW.nUrls?.checked}</div>
						<div className='col r2'>{eachKW.nUrls?.unchecked}</div>
						<div className='col-5 r2'>Scan</div>
					</div>
				</div>

				<div className='col-4 rowTable border'>
					<div className='d-flex'>
						<div className='col r2'>{eachKW.nAsins?.total}</div>
						<div className='col r2'>{eachKW.nAsins?.checked}</div>
						<div className='col r2'>{eachKW.nAsins?.unchecked}</div>
						<div className='col-5 r2'>Scan</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Row;
