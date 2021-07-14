import $ from 'jquery';
import { toast } from 'react-toastify';
import * as axiosServices from './AxiosServices';

async function getUrls(urlToScan, funX, funY) {
	let myRoute = window.location.href.replace('/scanurl', '');
	let webUrl = urlToScan;

	await $.get(webUrl).then(function (data) {
		function KeyWord(keyWord) {
			this.keyWord = keyWord;
		}
		function Pagina(links, id) {
			this.update = 1;
			this.id = id;
			this.urls = links;
		}

		//-----------------------KEYWORD --------------------------
		var keyWord2 = $(data).find('#twotabsearchtextbox').attr('value');
		var keyWord = '';
		if (keyWord2 !== '') {
			keyWord = keyWord2;
		} else {
			let keyWord3 = $(data).find('.zg_selected').text().trim();
			keyWord = 'Best Seller ' + keyWord3;
		}
		var newKW = new KeyWord(keyWord);

		axiosServices
			.createKeyWord(newKW)
			.then(function (res) {
				toast.success('Se ha agregado Nueva KeyWord');
				paginationFun(data, res.data._id, funX, funY);
			})
			.catch(function () {
				toast.error('KeyWord repetida');
			});

		//-----------------------PAGINATIONS --------------------------

		async function paginationFun(data, id, funX, funY) {
			let links = [];
			var paginations = $(data).find('.a-pagination').find('a');

			var totalPag1 = $(data).find('.a-pagination').find('li');

			if (totalPag1.length === 7) {
				var totalPag = parseFloat(totalPag1[5].innerText);
				var paginationBase = '';
				if (paginations[1].href.search('amazon.com') !== -1) {
					paginationBase = paginations[1].href;
				} else if (paginations[1].href.search(myRoute) !== -1) {
					paginationBase = paginations[1].href.replace(
						myRoute,
						'https://www.amazon.com'
					);
				}

				var paginations2_1 =
					paginationBase.substr(0, paginationBase.length - 1) + 1;
				var paginations1_1 = paginations2_1.replace('page=2', 'page=' + 1);

				for (let p = 0; p < totalPag; p++) {
					let px = p + 1;
					let now = Math.ceil(((p + 1) * 100) / totalPag);
					var paginations4 =
						paginationBase.substr(0, paginationBase.length - 1) + px;
					var paginations3 = paginations4.replace('page=2', 'page=' + px);

					if (paginations3 !== paginations1_1) {
						if (paginations3 !== paginations2_1) {
							let doubled = [];
							for (let i = 0; i < links.length; i++) {
								if (links[i] === paginations3) {
									doubled.push(paginations3);
								}
							}
							if (doubled.length === 0) {
								links.push(paginations3);
							}
							/* let newUrl = new Pagina(paginations3, id);
							axiosServices.updateKeyWord(newUrl); */
							funY(now);
						}
					}
				}
			} else {
				for (var l = 0, len = paginations.length; l < len; l++) {
					var pagination = paginations[l].href;

					if (pagination.search('amazon.com') !== -1) {
						let doubled = [];
						for (let i = 0; i < links.length; i++) {
							if (links[i] === pagination) {
								doubled.push(pagination);
							}
						}
						if (doubled.length === 0) {
							links.push(pagination);
						}
					} else if (pagination.search(myRoute) !== -1) {
						var paginations2 = pagination.replace(
							myRoute,
							'https://www.amazon.com'
						);
						let doubled = [];
						for (let i = 0; i < links.length; i++) {
							if (links[i] === paginations2) {
								doubled.push(paginations2);
							}
						}
						if (doubled.length === 0) {
							links.push(paginations2);
						}
						/* newUrl = new Pagina(paginations2, id);
						//console.log(JSON.stringify(newUrl));
						axiosServices.updateKeyWord(newUrl); */
					}
					let now = Math.ceil(((l + 1) * 100) / paginations.length);

					funY(now);
				}
			}

			const newUrl = new Pagina(links, id);
			console.log(newUrl);
			axiosServices.updateKeyWord(newUrl);

			funX();
		}
	});
}

export default getUrls;
