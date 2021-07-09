import React from 'react';

interface Props {
	stroke?: string;
	hover?: string;
	className?: string;
}
//  in CSS file add
//      .DownloadIcon:hover {color:red}

const Download = (props: Props) => {
	return (
		<svg
			stroke={props.stroke}
			color={props.stroke}
			fill='currentColor'
			stroke-width='0'
			viewBox='0 0 24 24'
			className='DownloadIcon'
			height='30px'
			width='30px'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M12 16L16 11 13 11 13 4 11 4 11 11 8 11z'></path>
			<path d='M20,18H4v-7H2v7c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2v-7h-2V18z'></path>
		</svg>
	);
};

export default Download;
