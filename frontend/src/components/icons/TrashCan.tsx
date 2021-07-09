import React from 'react';

interface Props {
	stroke?: string;
	className?: string;
}
//  in CSS file add
//      .DownloadIcon:hover {color:red}

const TrashCan = (props: Props) => {
	return (
		<svg
			stroke={props.stroke}
			color={props.stroke}
			fill='currentColor'
			stroke-width='0'
			viewBox='0 0 512 512'
			className='TrashCanIcon'
			height='30px'
			width='30px'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				fill='none'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='32'
				d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320'
			></path>
			<path
				stroke-linecap='round'
				stroke-miterlimit='10'
				stroke-width='32'
				d='M80 112h352'
			></path>
			<path
				fill='none'
				stroke-linecap='round'
				stroke-linejoin='round'
				stroke-width='32'
				d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40m-64 64v224m-72-224l8 224m136-224l-8 224'
			></path>
		</svg>
	);
};

export default TrashCan;
