import $ from 'jquery';
import * as axiosServices from './AxiosServices';

async function getAsins(urls, id, funX, funY) {
	function Asin(asin, id) {
		this.update = 2;
		this.id = id;
		this.asin = asin;
	}

	function UpdateNUrls(id) {
		this.update = 3;
		this.id = id;
	}

	function UpdateUrlChecked(url, id) {
		this.update = 4;
		this.id = id;
		this.url = url;
	}

	let totalUrls = urls.length;
	for (let w = 0; w < urls.length; w++) {
		if (urls[w].checked === false) {
			let newUrl = new UpdateUrlChecked(urls[w].link, id);
			axiosServices.updateKeyWord(newUrl);

			const webUrlPag = urls[w].link;

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
						let newAsin = new Asin(link1, id);
						axiosServices.updateKeyWord(newAsin);
						//console.log(newAsin);
					} else if (link.search('/dp/') !== -1) {
						let link1 = link.substr(link.indexOf('/dp/') + 4, 10);
						let newAsin = new Asin(link1, id);
						axiosServices.updateKeyWord(newAsin);
						//console.log(newAsin);
					}
				}

				let newUpdateNUrls = new UpdateNUrls(id);

				axiosServices.updateKeyWord(newUpdateNUrls);
				//console.log(newUpdateNUrls);
			});
		}
		let now = Math.ceil(((w + 1) * 100) / totalUrls);

		funX(now);
	}
	funY();
}

export default getAsins;
