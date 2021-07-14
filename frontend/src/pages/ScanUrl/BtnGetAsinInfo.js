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
		selection: '',
		variantes: { colors: [], size: [], style: [], pattern: [] },
		descripcion: '',
		categorias: '',
		imagenes: {
			imgs: [],
			detImgAsin: '',
		},
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
	let asinsConfirmed = asinsConf;
	let asins = [];
	let variants = [];

	for (let w = 0; w < qtyToScanAsin; w++) {
		if (asinsToScan[w].checked === false) {
			let doubled = [];
			for (let i = 0; i < asinsConfirmed.length; i++) {
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
									let asinAct = $(html)
										.find('#size_name_' + j)
										.attr('data-defaultasin');
								} else {
									let asinAct0 = $(html)
										.find('#size_name_' + j)
										.attr('data-dp-url')
										.replace('/dp/', '');

									let indexOfBar = asinAct0.indexOf('/');

									let asinAct = asinAct0.substr(0, indexOfBar);
								}

								item.variantes.size.push(asinAct);
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
					});
				}
			}
		} else {
			qtyToScanAsin += 1;
		}
		console.log(variants); // check con asins to scan
		console.log(asins);
	}
}

export default getAsinInfo;
