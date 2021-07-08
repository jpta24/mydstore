import React, { useEffect, useState } from 'react';
import * as axiosServices from './AxiosServices';

import { UrlInterface } from './UrlsInterface';

import ScanOneUrl from './ScanOneUrl';
import TableKW from './TableKW';

import './style.scss';

const ScanUrl = () => {
	const [keyWords, setKeyWords] = useState<UrlInterface[]>([]);

	const loadKeyWords = async () => {
		const res = await axiosServices.getKeyWords();

		const formatedKW = res.data
			.map((eachKW) => {
				return {
					...eachKW,
					createdAt: eachKW.createdAt ? new Date(eachKW.createdAt) : new Date(),
					updatedAt: eachKW.updatedAt ? new Date(eachKW.updatedAt) : new Date(),
				};
			})
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		setKeyWords(formatedKW);
	};

	useEffect(() => {
		loadKeyWords();
	}, []);

	return (
		<div className='container scanUrlBody'>
			<h1 className='my-3 h1centerV'>Control de URL por KeyWords</h1>
			<ScanOneUrl loadKeyWords={loadKeyWords} />
			<h3 className='my-3 h1centerV'>Tabla de KeyWords</h3>
			<TableKW keyWords={keyWords} />
		</div>
	);
};

export default ScanUrl;

// eslint-disable-next-line no-lone-blocks
{
	/* <Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th rowSpan={2}>
							<pre> # </pre>
						</th>
						<th rowSpan={2} className='col-4'>
							Keyword
						</th>
						<th colSpan={4} className='col-4'>
							Urls
							<tr>
								<th className='col-2 head2'>Total</th>
								<th className='col-2 head2'>Unchecked</th>
								<th className='col-2 head2'>Checked</th>
								<th className='col-4 head2'>Scan</th>
							</tr>
						</th>
						<th colSpan={4} className='col-4'>
							Asins
							<tr>
								<th className='col-2 head2'>Total</th>
								<th className='col-2 head2'>Unchecked</th>
								<th className='col-2 head2'>Checked</th>
								<th className='col-4 head2'>Scan</th>
							</tr>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>soy kw</td>
						<td className='urlsasin'>10</td>
						<td className='urlsasin'>6</td>
						<td className='urlsasin'>4</td>
						<td className='scan'>scan me</td>
						<td className='urlsasin'>10</td>
						<td className='urlsasin'>6</td>
						<td className='urlsasin'>4</td>
						<td className='scan'>scan me</td>
					</tr>
				</tbody>
			</Table>*/
}
