import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import GetUrls from './BtnGetUrl';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type typeSubmit = FormEvent<HTMLFormElement>;

interface UrlInterface {
	url: string;
}

const ScanOneUrl = () => {
	const initialState = {
		url: '',
	};

	const [isLoading, setLoading] = useState(false);
	const [urlState, setUrlState] = useState<UrlInterface>(initialState);

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

	const handleInputChange = (e: InputChange) => {
		setUrlState({ ...urlState, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: typeSubmit) => {
		e.preventDefault();
		handleOnClick();
		GetUrls(urlState.url);
		setUrlState(initialState);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Col xs={10}>
					<Form.Control
						placeholder='Pegar la URL de Amazon.com a scanear'
						name='url'
						onChange={handleInputChange}
						autoFocus
						value={urlState.url}
					/>
				</Col>
				<Col>
					<Button
						as='input'
						type='submit'
						value={isLoading ? 'Scaning...' : 'Scan URL'}
						disabled={isLoading}
					/>
				</Col>
			</Row>
		</Form>
	);
};

export default ScanOneUrl;
