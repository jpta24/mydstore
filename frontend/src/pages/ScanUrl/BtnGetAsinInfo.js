import * as axiosServices from './AxiosServices';

import GetOneAsinInfo from '../ViewAsin/BtnGetOneAsinInfo';

async function getAsinInfo(
	asinsToScan,
	keyWord,
	asinsConf,
	id,
	qty,
	funBar,
	funLoad
) {
	console.log('active');
	console.time('Time');
	function Asins(asins, asinsChecked, variants, id) {
		this.update = 3;
		this.id = id;
		this.asins = asins;
		this.asinsChecked = asinsChecked;
		this.variants = variants;
	}

	/* function AsinItem(item, id, variants) {
		this.update = 3;
		this.id = id;
		this.item = item;
		this.variants = variants;
	} */

	let qtyToScanAsin = parseInt(qty);
	let asinsConfirmed =
		asinsConf[0].asins.length === 0 ? ['asinsConf'] : asinsConf[0].asins;

	let asins = [];
	let variants = [];
	for (let w = 0; w < qtyToScanAsin; w++) {
		if (asinsToScan[w].checked === false) {
			let doubled = [];
			for (let i = 0; i < asinsConfirmed.length; i++) {
				if (asinsConfirmed[i] === asinsToScan[w].asin) {
					console.log(asinsToScan[w].asin + ' doubled');
					doubled.push(asinsToScan[w].asin);
				}
			}
			if (doubled.length === 0) {
				console.time('TimeAsin');
				asinsConfirmed.push(asinsToScan[w].asin);
				console.log(asinsConfirmed);
				let item = await GetOneAsinInfo(asinsToScan[w].asin, keyWord);
				asins.push(item);
				console.log(asins);
			}
		} else {
			qtyToScanAsin += 1;
		}

		let newAsins = new Asins(asins, asinsConfirmed, variants, id);

		const toRemoveMap = asinsConf.reduce(
			(memo, item) => ({
				...memo,
				[item]: true,
			}),
			{}
		);

		const asinsConfirmed2 = asinsConfirmed.filter((x) => toRemoveMap[x]);

		axiosServices.createAsin(asins);
		axiosServices.updateAsinsConfirmed(asinsConfirmed2);
		axiosServices.updateKeyWord(newAsins);
		let now = Math.ceil(((w + 1) * 100) / qtyToScanAsin);
		funBar(now);
	}
	console.timeEnd('Time');
	console.log(asins);
}

export default getAsinInfo;
