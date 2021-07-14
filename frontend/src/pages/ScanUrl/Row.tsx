import React, { useState } from 'react';

import * as axiosServices from './AxiosServices';

import TrashCan from '../../components/icons/TrashCan';

import { UrlInterface } from './UrlsInterface';
import { toast } from 'react-toastify';
import { Button, Modal, ProgressBar } from 'react-bootstrap';

import GetAsins from './BtnGetAsins';

interface Props {
	eachKW: UrlInterface;
	loadKeyWords: () => void;
}

const Row = ({ eachKW, loadKeyWords }: Props) => {
	const handleDelete = async (id: string) => {
		await axiosServices
			.deleteKeyWord(id)
			.then(function () {
				toast.info('KeyWord Eliminada');
				loadKeyWords();
			})
			.catch(function () {
				toast.error('KeyWord no encontrada');
			});
	};

	const handleScan = async () => {
		setBarStatus2(0);
		handleModelShow();
		await GetAsins(eachKW.urls, eachKW._id, progressBarStatus2, loadKeyWords);
	};

	const handleScan2 = async () => {
		setBarStatus2(0);
		handleModelShow();
		await GetAsins(eachKW.urls, eachKW._id, progressBarStatus2, loadKeyWords);
	};

	//============MODAL===============================================//

	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		loadKeyWords();
	};
	const handleModelShow = () => setShow(true);

	//========PROGRESS BAR============================================//
	const [barStatus2, setBarStatus2] = useState(0);

	const progressBarStatus2 = (now: number) => {
		setBarStatus2(now);
	};

	//================================================================//

	return (
		<div>
			<div className='row'>
				<div className='col-3 rowTable py-1 KW border'>{eachKW.keyWord}</div>
				<div className='col-4 rowTable border'>
					<div className='d-flex'>
						<div className='col r2'>{eachKW.nUrls?.total}</div>
						<div className='col r2'>{eachKW.nUrls?.checked}</div>
						<div className='col r2'>{eachKW.nUrls?.unchecked}</div>
						<div className='col-5 r2'>
							<div>
								{eachKW.nUrls?.checked === eachKW.nUrls?.total ? (
									'URLs scaneadas'
								) : (
									<Button
										variant='warning'
										size='sm'
										value='Scan'
										onClick={handleScan}
									>
										Scan
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className='col-4 rowTable border'>
					<div className='d-flex'>
						<div className='col r2'>{eachKW.nAsins?.total}</div>
						<div className='col r2'>{eachKW.nAsins?.checked}</div>
						<div className='col r2'>{eachKW.nAsins?.unchecked}</div>
						<div className='col-5 r2'>
							<div>
								<Button
									variant='success'
									size='sm'
									value='Scan'
									onClick={handleScan2}
								>
									Scan
								</Button>
							</div>
						</div>
					</div>
				</div>
				<div className='col-1 rowTable border mx-auto'>
					<span
						onClick={() => {
							eachKW._id && // (si video._id existe entonce && ejecuta la siguente funcion) // salia un error pq el _id era opcional _id?
								handleDelete(eachKW._id);
						}}
					>
						<TrashCan stroke='red' />
					</span>
				</div>
			</div>
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
					finalice para poder cerrar esta ventana.
					<ProgressBar animated now={barStatus2} label={`${barStatus2}%`} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Row;
