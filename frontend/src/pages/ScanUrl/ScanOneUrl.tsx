import React, { ChangeEvent, FormEvent, useState } from 'react';
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

	const [urlState, setUrlState] = useState<UrlInterface>(initialState);

	// funcion para manejar los cambios en los campos de un Form (input o textarea)
	const handleInputChange = (e: InputChange) => {
		setUrlState({ ...urlState, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: typeSubmit) => {
		e.preventDefault();

		GetUrls(urlState.url);

		// setUrlState(initialState);
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
					<Button as='input' type='submit' value='Scan URL' />
				</Col>
			</Row>
		</Form>
	);
};

export default ScanOneUrl;
