import $ from 'jquery';

async function getUrls(urlToScan) {
	console.log('function activaded');
	let myRoute = window.location.href.replace('/index.html', '');
	let webUrl = urlToScan;

	await $.get(webUrl).then(function (data) {
		function Pagina(link, keyWord) {
			this.link = link;
			this.keyWord = keyWord;
			this.checked = false;
		}

		//-----------------------KEYWORD --------------------------
		var keyWord2 = $(data).find('#twotabsearchtextbox').attr('value');
		var keyWord = '';
		if (keyWord2 !== '') {
			keyWord = keyWord2;
		} else {
			keyWord = $(data).find('.zg_selected').text().trim();
		}
		//-----------------------PAGINATIONS --------------------------
		var paginations = $(data).find('.a-pagination').find('a');

		for (var l = 0, len = paginations.length; l < len; l++) {
			var pagination = paginations[l].href;

			if (pagination.search('amazon.com') !== -1) {
				var newUrl = new Pagina(pagination, keyWord);
				$.post('http://localhost:8000/urls', newUrl);
			} else if (pagination.search(myRoute) !== -1) {
				var paginations2 = pagination.replace(
					myRoute,
					'https://www.amazon.com'
				);

				newUrl = new Pagina(paginations2, keyWord);
				$.post('http://localhost:8000/urls', newUrl);
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
						newUrl = new Pagina(paginations3, keyWord);
						$.post('http://localhost:8000/urls', newUrl);
					}
				}
			}
		}
	});
	await $.get('http://localhost:8000/urls').then(function (urls) {
		const urlsTotal = urls;
		console.log('Paginas a scanear: ' + urlsTotal.length);
	});
}

export default getUrls;
