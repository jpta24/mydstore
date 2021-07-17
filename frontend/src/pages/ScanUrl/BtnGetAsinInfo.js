import $ from 'jquery';
import * as axiosServices from './AxiosServices';

async function getAsinInfo(
	asinsToScan,
	keyWord,
	asinsConf,
	id,
	funBar,
	funLoad
) {
	function Asins(asins, asinsChecked, variants, id) {
		this.update = 3;
		this.id = id;
		this.asins = asins;
		this.asinsChecked = asinsChecked;
		this.variants = variants;
	}
	var item = {
		keyWord: '*',
		linkAsin: '*',
		nombre: '+',
		asin: '*',
		precio: '*',
		prime: false,
		disponibilidad: false,
		condicionNew: false,
		cantidad: 1,
		selection: '*',
		variantes: { colors: [], size: [], style: [], pattern: [] },
		descripcion: '*',
		categorias: '',
		imagenes: [],
		medidas: {
			shippingBox: false,
			valAgrand: 3,
			dimensiones: '',
			largo: '',
			ancho: '',
			prof: '',
			peso: '',
			pesoxCant: '',
			volumen: '',
			voluMetrico: '',
			volxCant: '',
			volMetxCant: '',
			volAgrand: '',
			voluMetricoAgrand: '',
			volMetAgrandxCant: '',
			volxCantAgrand: '',
		},
		rankings: {
			ranks: [],
			maxRank: '',
		},
		cupon: false,
	};

	let qtyToScanAsin = 1;
	let asinsConfirmed = ['asinsConf'];
	let asins = [];
	let variants = [];
	let variant = {
		variant: '',
		asinBelong: '',
	};
	for (let w = 0; w < qtyToScanAsin; w++) {
		if (asinsToScan[w].checked === false) {
			let doubled = [];
			for (let i = 0; i <= asinsConfirmed.length; i++) {
				if (asinsConfirmed[i] === asinsToScan[w].asin) {
					doubled.push(asinsToScan[w].asin);
				}
				if (doubled.length === 0) {
					asinsConfirmed.push(asinsToScan[w].asin);
					const webUrlAsin =
						'https://www.amazon.com/dp/' +
						asinsToScan[w].asin +
						'?%2AVersion%2A=1&%2Aentries%2A=0&ie=UTF8&language=es_US&viewID=';
					item.linkAsin = webUrlAsin;
					item.keyWord = keyWord;

					await $.get(webUrlAsin).then(function (html) {
						//-----------------------PRECIO --------------------------
						let precioTxt = '';
						if ($(html).find('#priceblock_ourprice').length !== 0) {
							precioTxt = $(html).find('#priceblock_ourprice').text();
						} else {
							precioTxt = $(html).find('#priceblock_saleprice').text();
						}

						if (precioTxt !== '') {
							let precioBruto = precioTxt.substring(precioTxt.indexOf('$') + 1);
							item.precio = parseFloat(precioBruto.replace(',', ''));
						}
						//-----------------------CUPON --------------------------

						let cupon = $(html).find('#couponBadgeRegularVpc').text().trim();
						if (cupon === 'Cupón') {
							item.cupon = true;
						}

						//-----------------------NOMBRE --------------------------
						var nombr = $(html).find('#productTitle').text();
						let nombre = nombr.trim();

						item.nombre = nombre;

						//-----------------------ASIN --------------------------

						item.asin = asinsToScan[w].asin;

						//-----------------------PRIME --------------------------

						var primeCheck = $(html).find('#prime_feature_div').attr('id');
						if (primeCheck !== undefined) {
							item.prime = true;
						}

						//------------------------SELECCION-------------------------
						var varSelection = $(html)
							.find('#twister')
							.find('.selection')
							.text()
							.trim();
						var varSelection2 = $(html)
							.find('#twister')
							.find('.selection')
							.prev()
							.text()
							.trim();
						item.selection = varSelection2 + ' ' + varSelection;

						//------------------------Variantes-------------------------

						var i;
						function Variantes(asin, price, option) {
							this.asin = asin;
							this.price = price;
							this.option = option;
						}
						var varColor = $(html).find('#variation_color_name').find('li');
						for (i = 0; i < varColor.length; i++) {
							if ($(html).find('#color_name_' + i).length === 1) {
								let asinAct = $(html)
									.find('#color_name_' + i)
									.attr('data-defaultasin');

								item.variantes.colors.push(asinAct);
								variant.asinBelong = asinsToScan[w].asin;
								variant.variant = asinAct;
								variants.push(asinAct);

								let precioAct = $(html)
									.find('#color_name_' + i + '_price')
									.text()
									.replace('1 opción desde ', '')
									.replace('2 opciones desde ', '')
									.replace('3 opciones desde ', '')
									.replace('4 opciones desde ', '')
									.replace('5 opciones desde ', '')
									.replace('6 opciones desde ', '')
									.replace('7 opciones desde ', '')
									.replace('8 opciones desde ', '')
									.replace('9 opciones desde ', '');

								let precioBrutoA = precioAct.trim();

								let colorAct = $(html)
									.find('#color_name_' + i)
									.attr('title')
									.replace('Haz clic para seleccionar ', '');

								item.variantes.colors[i] = new Variantes(
									asinAct,
									precioBrutoA,
									colorAct
								);
							}
						}

						var varSize = $(html).find('#variation_size_name').find('li');
						for (let j = 0; j < varSize.length; j++) {
							if ($(html).find('#size_name_' + j).length === 1) {
								let asinAct = '';
								if (
									$(html)
										.find('#size_name_' + j)
										.attr('data-defaultasin') !== ''
								) {
									asinAct = $(html)
										.find('#size_name_' + j)
										.attr('data-defaultasin');
								} else {
									let asinAct0 = $(html)
										.find('#size_name_' + j)
										.attr('data-dp-url')
										.replace('/dp/', '');

									let indexOfBar = asinAct0.indexOf('/');

									asinAct = asinAct0.substr(0, indexOfBar);
								}

								item.variantes.size.push(asinAct);
								variant.asinBelong = asinsToScan[w].asin;
								variant.variant = asinAct;
								variants.push(asinAct);

								let precioAct = $(html)
									.find('#size_name_' + i + '_price')
									.text()
									.replace('1 opción desde ', '')
									.replace('2 opciones desde ', '')
									.replace('3 opciones desde ', '')
									.replace('4 opciones desde ', '')
									.replace('5 opciones desde ', '')
									.replace('6 opciones desde ', '')
									.replace('7 opciones desde ', '')
									.replace('8 opciones desde ', '')
									.replace('9 opciones desde ', '');

								let precioBrutoA = precioAct.trim();

								let sizeAct = $(html)
									.find('#size_name_' + i)
									.attr('title')
									.replace('Haz clic para seleccionar ', '');

								item.variantes.size[i] = new Variantes(
									asinAct,
									precioBrutoA,
									sizeAct
								);
							}
						}

						var varStyle = $(html).find('#variation_style_name').find('li');
						for (let k = 0; k < varStyle.length; k++) {
							if ($(html).find('#style_name_' + k).length === 1) {
								let asinAct = '';
								if (
									$(html)
										.find('#style_name_' + k)
										.attr('data-defaultasin') !== ''
								) {
									asinAct = $(html)
										.find('#style_name_' + k)
										.attr('data-defaultasin');
								} else {
									let asinAct0 = $(html)
										.find('#style_name_' + k)
										.attr('data-dp-url')
										.replace('/dp/', '');

									let indexOfBar = asinAct0.indexOf('/');

									asinAct = asinAct0.substr(0, indexOfBar);
								}

								item.variantes.style.push(asinAct);
								variant.asinBelong = asinsToScan[w].asin;
								variant.variant = asinAct;
								variants.push(asinAct);

								let precioAct = $(html)
									.find('#style_name_' + i + '_price')
									.text()
									.replace('1 opción desde ', '')
									.replace('2 opciones desde ', '')
									.replace('3 opciones desde ', '')
									.replace('4 opciones desde ', '')
									.replace('5 opciones desde ', '')
									.replace('6 opciones desde ', '')
									.replace('7 opciones desde ', '')
									.replace('8 opciones desde ', '')
									.replace('9 opciones desde ', '');

								let precioBrutoA = precioAct.trim();

								let styleAct = $(html)
									.find('#style_name_' + i)
									.attr('title')
									.replace('Haz clic para seleccionar ', '');

								item.variantes.style[i] = new Variantes(
									asinAct,
									precioBrutoA,
									styleAct
								);
							}
						}

						var varPattern = $(html).find('#variation_pattern_name').find('li');

						for (let l = 0; l < varPattern.length; l++) {
							if ($(html).find('#pattern_name_' + l).length === 1) {
								let asinAct = '';
								if (
									$(html)
										.find('#pattern_name_' + l)
										.attr('data-defaultasin') !== ''
								) {
									asinAct = $(html)
										.find('#pattern_name_' + l)
										.attr('data-defaultasin');
								} else {
									let asinAct0 = $(html)
										.find('#pattern_name_' + l)
										.attr('data-dp-url')
										.replace('/dp/', '');

									let indexOfBar = asinAct0.indexOf('/');

									asinAct = asinAct0.substr(0, indexOfBar);
								}

								item.variantes.pattern.push(asinAct);
								variant.asinBelong = asinsToScan[w].asin;
								variant.variant = asinAct;
								variants.push(asinAct);

								let precioAct = $(html)
									.find('#pattern_name_' + i + '_price')
									.text()
									.replace('1 opción desde ', '')
									.replace('2 opciones desde ', '')
									.replace('3 opciones desde ', '')
									.replace('4 opciones desde ', '')
									.replace('5 opciones desde ', '')
									.replace('6 opciones desde ', '')
									.replace('7 opciones desde ', '')
									.replace('8 opciones desde ', '')
									.replace('9 opciones desde ', '');

								let precioBrutoA = precioAct.trim();

								let patternAct = $(html)
									.find('#pattern_name_' + i)
									.attr('title')
									.replace('Haz clic para seleccionar ', '');

								item.variantes.pattern[i] = new Variantes(
									asinAct,
									precioBrutoA,
									patternAct
								);
							}
						}
						//------------------------DESCRIPCION-------------------------

						var descripcion = $(html)
							.find('#productDescription')
							.children('p')
							.text();

						item.descripcion = descripcion;

						//------------------------IMAGENES-------------------------

						let detImg = [
							'._AC_US40_',
							'._AC_SR38,50_',
							'._AC_UY218_',
							'._SX38_SY50_CR,0,0,38,50_',
							'._SS40_',
						];

						let srcNo40 = '';
						for (
							let i = 0;
							i < $(html).find('#altImages').find('img').length;
							i++
						) {
							if ($(html).find('#altImages').find('img').eq(i) !== undefined) {
								let img = {
									src: '',
									detImgAsin: '',
								};
								var source = $(html)
									.find('#altImages')
									.find('img')
									.eq(i)
									.attr('src');

								let srcTxt = source.replace(/"/g, '');
								img.src = srcTxt;

								for (let j = 0; j < detImg.length; j++) {
									if (srcTxt.search(detImg[j]) !== -1) {
										img.detImgAsin = detImg[j];
										//srcNo40 = srcTxt.replace(detImg[j], '');
									}
								}
								/* if (item.imagenes.detImgAsin === '') {
									srcNo40 = srcTxt;
								} */
								if (
									(srcTxt.search('/images/I') !== -1 &&
										srcTxt.search('/images-na') !== -1) ||
									(item.imagenes.length === 0 &&
										(srcTxt.search('play-icon-overlay') === -1 ||
											srcTxt.search('.gif') === -1))
								) {
									item.imagenes.push(img);
								}
							}
						}

						//------------------------DISPONIBILIDAD-------------------------

						var disp = $(html).find('#availability').text().trim();

						if (disp.search('In Stock') !== -1) {
							item.disponibilidad = true;
						}
						if (disp.search('Disponible') !== -1) {
							item.disponibilidad = true;
						}
						if (disp.search('order soon') !== -1) {
							item.disponibilidad = true;
						}
						if (disp.search('Solo') !== -1) {
							item.disponibilidad = true;
						}

						//------------------------CATEGORIA-------------------------

						var categorias = [];

						for (
							let i = 0;
							i <
							$(html).find('#wayfinding-breadcrumbs_feature_div').find('li')
								.length;
							i++
						) {
							if (
								$(html)
									.find('#wayfinding-breadcrumbs_feature_div')
									.find('li')
									.eq(i) !== undefined
							) {
								var cat = $(html)
									.find('#wayfinding-breadcrumbs_feature_div')
									.find('li')
									.eq(i)
									.text()
									.trim();
								if (cat.length > 2) {
									categorias.push(cat);
								}
							}
						}

						item.categorias = categorias;

						//------------------------FEATURES-------------------------
						var features = [];

						for (
							let i = 0;
							i < $(html).find('#feature-bullets').find('li').length;
							i++
						) {
							if (
								$(html).find('#feature-bullets').find('li').eq(i) !== undefined
							) {
								var featu = $(html)
									.find('#feature-bullets')
									.find('li')
									.eq(i)
									.text()
									.trim();
								if (
									featu.length > 2 &&
									featu.search('Asegúrate de que esto coincide') === -1
								) {
									features.push(featu);
								}
							}
						}
						item.features = features;

						//------------------------FEATURES 2-------------------------
						var features2 = [];
						var features2var = $(html)
							.find('#productOverview_feature_div')
							.find('tr');

						for (let i = 0; i < features2var.length; i++) {
							if (features2var.eq(i) !== undefined) {
								var featu2a = features2var
									.eq(i)
									.first('td')
									.find('span')
									.eq(0)
									.text()
									.trim();
								var featu2b = features2var
									.eq(i)
									.first('td')
									.find('span')
									.eq(1)
									.text()
									.trim();
								let featu2 = featu2a + ': ' + featu2b;

								features2.push(featu2);
							}
						}
						item.features2 = features2;

						//------------------------RANKING-------------------------

						let ranki = $(html).find('th');

						for (let i = 0; i < ranki.length; i++) {
							if (
								ranki[i].innerHTML.search(
									'Clasificación en los más vendidos de Amazon'
								) !== -1
							) {
								let rankiNext = ranki[i].nextElementSibling.innerText;
								var lines = rankiNext.split('\n');
								for (var j = 0; j < lines.length; j++) {
									if (lines[j].search('n') !== -1) {
										var indexNro = lines[j].indexOf('n');
										var indexSpace = lines[j].indexOf(' ');
										var rankText = lines[j].substring(indexNro + 2, indexSpace);
										var rank = parseFloat(rankText.replace(',', ''));
										item.rankings.ranks.push(rank);
									}
								}
							}
						}
						if (item.rankings.ranks.length !== 0) {
							let sorting = item.rankings.ranks.sort(function (a, b) {
								return a - b;
							});
							item.rankings.maxRank = sorting[0];
						} else {
							item.rankings.maxRank = 100000;
						}

						// console.log(item.precio);
					});
					console.log(item);
				}

				break;
			}
		}
	}
	console.log('done');
}

export default getAsinInfo;
