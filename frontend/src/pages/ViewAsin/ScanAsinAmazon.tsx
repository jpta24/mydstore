import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
	Button,
	Col,
	Dropdown,
	DropdownButton,
	Form,
	InputGroup,
	Row,
} from 'react-bootstrap';

//import GetUrls from './BtnGetUrl';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type typeSubmit = FormEvent<HTMLFormElement>;

interface AsinInterface {
	asin: string;
}

const ScanAsinAmazon = () => {
	const initialState = {
		asin: '',
	};

	const [isLoading, setLoading] = useState(false);
	const [asinState, setAsinState] = useState<AsinInterface>(initialState);

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
		setAsinState({ ...asinState, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: typeSubmit) => {
		e.preventDefault();
		handleOnClickLoadingButtom();
		setAsinState(initialState);
		//await GetUrls(urlState.url, loadKeyWords, progressBarStatus);
	};

	//================================================================//

	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<InputGroup className='mb-3'>
					<Dropdown>
						<Dropdown.Toggle variant='warning' id='dropdown-basic'>
							Selección
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href='#/action-1'>Amazon.com</Dropdown.Item>
							<Dropdown.Item href='#/action-2'>myDStore</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					<Form.Control
						placeholder='Pegar ASIN a scanear'
						name='url'
						onChange={handleInputChange}
						autoFocus
						value={asinState.asin}
					/>
					<Button
						as='input'
						type='submit'
						value={isLoading ? 'Scaning...' : 'Scan ASIN'}
						disabled={isLoading}
					/>
				</InputGroup>
			</Row>
		</Form>
	);
};

export default ScanAsinAmazon;
