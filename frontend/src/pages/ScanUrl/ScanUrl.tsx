import React from 'react';

import ScanOneUrl from './ScanOneUrl';

import './style.scss';

const ScanUrl = () => {
	return (
		<div className='container scanUrlBody'>
			<h1 className='my-3 h1centerV'>Control de URL por KeyWords</h1>
			<ScanOneUrl />
		</div>
	);
};

export default ScanUrl;
