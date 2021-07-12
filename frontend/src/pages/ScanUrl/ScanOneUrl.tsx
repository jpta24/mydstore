import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Col, Form, Modal, ProgressBar, Row } from 'react-bootstrap';

import GetUrls from './BtnGetUrl';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type typeSubmit = FormEvent<HTMLFormElement>;

interface UrlInterface {
	url: string;
}

interface Props {
	loadKeyWords: () => void;
}

const ScanOneUrl = ({ loadKeyWords }: Props) => {
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

	const handleOnClickLoadingButtom = () => {
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
		setBarStatus(0);
		handleOnClickLoadingButtom();
		handleModelShow();
		setUrlState(initialState);
		await GetUrls(urlState.url, loadKeyWords, progressBarStatus);
	};

	//============MODAL===============================================//

	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		setBarStatus(0);
	};
	const handleModelShow = () => setShow(true);

	//========PROGRESS BAR============================================//
	const [barStatus, setBarStatus] = useState(0);

	const progressBarStatus = (now: number) => {
		setBarStatus(now);
	};

	//================================================================//

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
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>Atención</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Se está ejecutando una acción en el servidor, por favor espere que
					finalice y se cierre esta ventana de dialogo.
					<ProgressBar animated now={barStatus} label={`${barStatus}%`} />
				</Modal.Body>
				<Modal.Footer>
					{barStatus === 100 ? (
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
					) : null}
				</Modal.Footer>
			</Modal>
		</Form>
	);
};

export default ScanOneUrl;
