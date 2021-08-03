import React, { useEffect } from 'react';

import ScanAsinAmazon from './ScanAsinAmazon';
import AsinInfo from './AsinInfo';

import BtnGetOneAsinInfo from './BtnGetOneAsinInfo';

const ViewAsin = () => {
	/* 	useEffect(() => {
		BtnGetOneAsinInfo();
	}, []); */

	return (
		<div className='container scanUrlBody'>
			<h1 className='my-3 h1centerV'>View One Asin</h1>
			<ScanAsinAmazon BtnGetOneAsinInfo={BtnGetOneAsinInfo} />
			<h3 className='my-3 h1centerV'>Info</h3>
			<AsinInfo />
			<div id='info'>INFO</div>
		</div>
	);
};

export default ViewAsin;
