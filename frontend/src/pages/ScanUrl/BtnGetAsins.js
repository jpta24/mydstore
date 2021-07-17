import $ from 'jquery';
import * as axiosServices from './AxiosServices';

async function getAsins(urls, id, funX, funY) {
	function Asin(asin, id, nUrls, nAsins, urlsChecked) {
		this.update = 2;
		this.id = id;
		this.asin = asin;
		this.nUrls = nUrls;
		this.nAsins = nAsins;
		this.urlsChecked = urlsChecked;
	}
	let totalUrls = urls.length;
	let asins = [];
	let urlsChecked = [];
	for (let w = 0; w < urls.length; w++) {
		if (urls[w].checked === false) {
			const webUrlPag = urls[w].link;
			urlsChecked.push(webUrlPag);

			await $.get(webUrlPag).then(function (data) {
				let lonks = $(data).find('.s-main-slot').find('a');
				let lonkss = $(data).find('#zg').find('a');

				let links = '';
				if (lonks.length !== 0) {
					links = lonks;
				} else {
					links = lonkss;
				}

				for (var j = 0, len = links.length; j < len; j++) {
					var link = links[j].href;
					if (link.search('%2Fdp%2F') !== -1) {
						let link1 = link.substr(link.indexOf('%2Fdp%2F') + 8, 10);
						let doubled = [];
						for (let i = 0; i < asins.length; i++) {
							if (asins[i] === link1) {
								doubled.push(link1);
							}
						}
						if (doubled.length === 0) {
							asins.push(link1);
						}
					} else if (link.search('/dp/') !== -1) {
						let link1 = link.substr(link.indexOf('/dp/') + 4, 10);
						let doubled = [];
						for (let i = 0; i < asins.length; i++) {
							if (asins[i] === link1) {
								doubled.push(link1);
							}
						}
						if (doubled.length === 0) {
							asins.push(link1);
						}
					}
				}
			});
		}
		let now = Math.ceil(((w + 1) * 100) / totalUrls);

		funX(now);
	}
	const obj = [];

	for (const key of asins) {
		obj[key] = {
			asin: key,
			checked: false,
		};
	}
	let newAsin = new Asin(asins, id, urls.length, asins.length, urlsChecked);
	console.log(newAsin);
	axiosServices.updateKeyWord(newAsin);
	funY();
}

export default getAsins;
