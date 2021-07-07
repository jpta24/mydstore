import $ from 'jquery';
import { toast } from 'react-toastify';
import * as axiosServices from './AxiosServices';

async function getUrls(urlToScan) {
	let myRoute = window.location.href.replace('/scanurl', '');
	let webUrl = urlToScan;

	await $.get(webUrl).then(function (data) {
		function KeyWord(keyWord) {
			this.keyWord = keyWord;
		}
		function Pagina(link, id) {
			this.id = id;
			this.urls = {
				link: link,
				checked: false,
			};
			this.nUrls = {
				unchecked: 1,
			};
		}

		//-----------------------KEYWORD --------------------------
		var keyWord2 = $(data).find('#twotabsearchtextbox').attr('value');
		var keyWord = '';
		if (keyWord2 !== '') {
			keyWord = keyWord2;
		} else {
			keyWord = $(data).find('.zg_selected').text().trim();
		}
		var newKW = new KeyWord(keyWord);

		//-----------------------PAGINATIONS --------------------------

		async function paginationFun(data, id) {
			var paginations = $(data).find('.a-pagination').find('a');

			for (var l = 0, len = paginations.length; l < len; l++) {
				var pagination = paginations[l].href;

				if (pagination.search('amazon.com') !== -1) {
					var newUrl = new Pagina(pagination, id);
					//console.log('1 ' + newUrl);
					axiosServices.updateKeyWord(newUrl);
				} else if (pagination.search(myRoute) !== -1) {
					var paginations2 = pagination.replace(
						myRoute,
						'https://www.amazon.com'
					);

					newUrl = new Pagina(paginations2, id);
					//console.log(JSON.stringify(newUrl));
					axiosServices.updateKeyWord(newUrl);
				}
			}

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
					var paginations4 =
						paginationBase.substr(0, paginationBase.length - 1) + px;
					var paginations3 = paginations4.replace('page=2', 'page=' + px);

					if (paginations3 !== paginations1_1) {
						if (paginations3 !== paginations2_1) {
							newUrl = new Pagina(paginations3, id);
							axiosServices.updateKeyWord(newUrl);
						}
					}
				}
			}
		}
		axiosServices
			.createKeyWord(newKW)
			.then(function (res) {
				toast.success('Se ha agregado Nueva KeyWord');
				paginationFun(data, res.data._id);
			})
			.catch(function () {
				toast.error('KeyWord repetida');
			});

		/* $.post(routeDB, newKW, function (res) {
			console.log('here2');
			console.log(res);
			if (res === 'done') {
				toast.success('Se ha agregado Nueva KeyWord');
				paginationFun();
			} else {
				console.log('here');
				const resp = res;
				console.log(resp);
				toast.error('KeyWord repetida');
				//Incluir confirmacion KeyWord repetida, ¿desea actualizarla? SI se ejecuta paginationFun, No se continua
			}
		}); */
	});
	/* await $.get(routeDB).then(function (urls) {
		const urlsTotal = urls;
		console.log('Paginas a scanear: ' + urlsTotal.length);
	}); */
}

export default getUrls;
