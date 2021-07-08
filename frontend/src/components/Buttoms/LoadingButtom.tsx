import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ButtonType } from 'react-bootstrap/esm/Button';

interface Props {
	type?: ButtonType;
	text?: string;
	textLoading?: string;
}

const LoadingButtom = ({ text, textLoading, type }: Props) => {
	const [isLoading, setLoading] = useState(false);

	function simulateNetworkRequest() {
		return new Promise((resolve) => setTimeout(resolve, 2000));
	}

	useEffect(() => {
		if (isLoading) {
			simulateNetworkRequest().then(() => {
				setLoading(false);
			});
		}
	}, [isLoading]);

	const handleOnClick = () => {
		if (!isLoading) {
			handleClick();
		}
	};

	const handleClick = () => setLoading(true);

	return (
		<Button
			variant='primary'
			disabled={isLoading}
			onClick={handleOnClick}
			type={type}
		>
			{isLoading ? textLoading : text}
		</Button>
	);
};

export default LoadingButtom;
