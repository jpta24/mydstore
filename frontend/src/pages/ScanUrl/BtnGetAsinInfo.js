import $ from 'jquery';
import * as axiosServices from './AxiosServices';

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

	function AsinItem(item, id, variants) {
		this.update = 3;
		this.id = id;
		this.item = item;
		this.variants = variants;
	}

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
				var item = {
					keyWord: '',
					linkAsin: '',
					nombre: '',
					asin: '',
					precio: '',
					prime: false,
					disponibilidad: false,
					condicionNew: false,
					cantidad: 1,
					selection: '',
					variantes: { colors: [], size: [], style: [], pattern: [] },
					descripcion: '',
					categorias: '',
					imagenes: [],
					medidas: {
						dimensiones: '',
						largo: '',
						ancho: '',
						prof: '',
						peso: '',
						volumen: '',
					},
					rankings: {
						ranks: [],
						maxRank: '',
					},
					cupon: false,
					meta: '',
				};

				const webUrlAsin =
					'https://www.amazon.com/dp/' +
					asinsToScan[w].asin +
					'?%2AVersion%2A=1&%2Aentries%2A=0&ie=UTF8&language=es_US&viewID=';
				item.linkAsin = webUrlAsin;
				item.keyWord = keyWord;

				// eslint-disable-next-line no-loop-func
				await $.get(webUrlAsin).then(async function (html) {
					//-----------------------META -------------------------
					let metas = $(html).find('meta[name="keywords"]').attr('content');
					item.meta = metas;

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
					console.log(item.asin);

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

							let colorAct = 'Color ' + i;
							if (
								$(html)
									.find('#color_name_' + i)
									.attr('title') !== undefined
							) {
								colorAct = $(html)
									.find('#color_name_' + i)
									.attr('title')
									.replace('Haz clic para seleccionar ', '');
							}

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
							let sizeAct = 'Size ' + i;
							if (
								$(html)
									.find('#size_name_' + i)
									.attr('title') !== undefined
							) {
								sizeAct = $(html)
									.find('#color_name_' + i)
									.attr('title')
									.replace('Haz clic para seleccionar ', '');
							}
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

							let styleAct = 'Style ' + i;
							if (
								$(html)
									.find('#style_name_' + i)
									.attr('title') !== undefined
							) {
								styleAct = $(html)
									.find('#color_name_' + i)
									.attr('title')
									.replace('Haz clic para seleccionar ', '');
							}

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

							let patternAct = 'Pattern ' + i;
							if (
								$(html)
									.find('#pattern_name_' + i)
									.attr('title') !== undefined
							) {
								patternAct = $(html)
									.find('#color_name_' + i)
									.attr('title')
									.replace('Haz clic para seleccionar ', '');
							}

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
					//------------------------DETALLES-------------------------
					let postm0 = null;
					let postm1 = null;
					let detTipo01 = null;
					let medNum = null;
					let detTipo0 = '';
					let detTipo1 = [
						'prodDetails',
						'detail-bullets',
						'productOverview_feature_div',
						'detailBullets_feature_div',
					];

					//let tipoMed0 = '';
					let tipoMed1 = [
						'\nProduct Dimensions\n',
						'\nPackage Dimensions\n',
						'Product Dimensions',
						'Package Dimensions',
						'Información de producto',
						'\nInformación de producto\n',
						'Item Dimensions  LxWxH',
						'\nItem Dimensions  LxWxH\n',
						'Dimensiones del artículo Largo x Ancho x Altura',
						'\nDimensiones del artículo Largo x Ancho x Altura\n',
						'Dimensiones del producto',
						'\nDimensiones del producto\n',
						'Dimensiones del paquete',
						'\nDimensiones del paquete\n',
					];

					let uniMedida0 = '';
					let uniMedida1 = ['inches', 'cm', 'mm', 'pulgadas', 'm'];

					//let tipoPeso0 = '';
					let tipoPeso1 = [
						'\nItem Weight\n',
						'Shipping Weight',
						'Peso del producto',
						'\nPeso del producto\n',
					];

					let uniPeso0 = '';
					let uniPeso1 = [
						'Pounds',
						'pounds',
						'Libras',
						'libras',
						'Ounces',
						'ounces',
						'Onzas',
						'onzas',
						'lbs',
						'kg',
						'kgs',
						'gr',
						'grs',
					];

					// Tipo de Detalles del Producto y Tipo de Peso (Med)
					function checkTipoMedByClass(classType, val1) {
						val1 = $(html).find('.' + classType);

						for (let i = 0; i < val1.length; i++) {
							for (let j = 0; j < tipoMed1.length; j++) {
								if (val1[i].innerHTML === tipoMed1[j]) {
									//tipoMed0 = tipoMed1[j];
									postm0 = i;
									break;
								}
							}
							for (let j = 0; j < tipoPeso1.length; j++) {
								if (tipoPeso1[j] === val1[i].innerHTML) {
									//tipoPeso0 = tipoPeso1[j];
									postm1 = i;
									break;
								}
							}
						}
					}
					function checkTipoMedByLi(val1) {
						val1 = $(html).find('li');
						for (let i = 0; i < val1.length; i++) {
							for (j = 0; j < tipoMed1.length; j++) {
								if (val1[i].innerHTML.search(tipoMed1[j]) !== -1) {
									//tipoMed0 = tipoMed1[j];
									postm0 = i;
									break;
								}
							}

							for (j = 0; j < tipoPeso1.length; j++) {
								if (val1[i].innerHTML.search(tipoPeso1[j]) !== -1) {
									// tipoPeso0 = tipoPeso1[j];
									postm1 = i;
									break;
								}
							}
						}
					}

					// Tipo de unidad de medida
					function getMedNumByClass(classType) {
						if ($(html).find('.' + classType)[postm0] !== undefined) {
							if (
								$(html).find('.' + classType)[postm0].nextElementSibling !==
								null
							) {
								var uniMedida = $(html).find('.' + classType)[postm0]
									.nextElementSibling.innerHTML;
								var i;
								if (uniMedida !== undefined) {
									for (i = 0; i < uniMedida1.length; i++) {
										if (uniMedida.search(uniMedida1[i]) !== -1) {
											uniMedida0 = uniMedida1[i];
											medNum = uniMedida.substring(
												1,
												uniMedida.search(uniMedida0) - 1
											);
											item.medidas.dimensiones = medNum;
											var indices = [];
											for (var j = 0; j < medNum.length; j++) {
												if (medNum[j] === 'x') indices.push(j);
												item.medidas.largo = medNum.substring(
													0,
													indices[0] - 1
												);
												item.medidas.ancho = medNum.substring(
													indices[0] + 2,
													indices[1] - 1
												);
												item.medidas.prof = medNum.substring(indices[1] + 2);
											}
											break;
										} else {
											uniMedida0 = 'S/Inf';
										}
									}
								}
							}
						}
					}
					function getMedNumByLi() {
						if ($(html).find('li')[postm0] !== undefined) {
							var uniMedida = $(html).find('li')[postm0].innerText;
							for (i = 0; i < uniMedida1.length; i++) {
								if (uniMedida.search(uniMedida1[i]) !== -1) {
									uniMedida0 = uniMedida1[i];
									medNum = uniMedida.substring(
										uniMedida.indexOf(':') + 2,
										uniMedida.search(uniMedida0) - 1
									);
									item.medidas.dimensiones = medNum;
									var indices = [];
									for (var j = 0; j < medNum.length; j++) {
										if (medNum[j] === 'x') indices.push(j);
										item.medidas.largo = medNum.substring(0, indices[0] - 1);
										item.medidas.ancho = medNum.substring(
											indices[0] + 2,
											indices[1] - 1
										);
										item.medidas.prof = medNum.substring(indices[1] + 2);
									}
									break;
								} else {
									uniMedida0 = 'S/Inf';
								}
							}
						}
					}

					// Tipo de Envio 2da vuelta y medida
					function getTipoEnvByClass(classType) {
						if ($(html).find('.' + classType)[postm0] !== undefined) {
							if (
								$(html).find('.' + classType)[postm0].nextElementSibling !==
								null
							) {
								var uniPeso = $(html).find('.' + classType)[postm0]
									.nextElementSibling.innerHTML;

								for (i = 0; i < uniPeso1.length; i++) {
									if (uniPeso.search(uniPeso1[i]) !== -1) {
										uniPeso0 = uniPeso1[i];
										let sepDim = uniPeso.search('; ');
										let pesoNum = uniPeso.substring(
											sepDim + 2,
											uniPeso.search(uniPeso0) - 1
										);
										item.medidas.peso = pesoNum;
										break;
									}
								}
							}
						}
					}

					function getTipoEnvByLi() {
						if ($(html).find('li')[postm0] !== undefined) {
							var uniPeso = $(html).find('li')[postm0].innerText;
							for (i = 0; i < uniPeso1.length; i++) {
								if (uniPeso.search(uniPeso1[i]) !== -1) {
									uniPeso0 = uniPeso1[i];
									let sepDim = uniPeso.search('; ');
									let pesoNum = uniPeso.substring(
										sepDim + 2,
										uniPeso.search(uniPeso0) - 1
									);
									item.medidas.peso = pesoNum;
									break;
								} else {
									uniMedida0 = 'S/Inf';
								}
							}
						}
					}

					// Tipo de unidad de Envio
					function getPesoByClass(classType) {
						if ($(html).find('.' + classType)[postm1] !== undefined) {
							var uniPeso = $(html).find('.' + classType)[postm1]
								.nextElementSibling.innerHTML;
							for (i = 0; i < uniPeso1.length; i++) {
								if (uniPeso.search(uniPeso1[i]) !== -1) {
									let pesoNum = uniPeso.substr(1, uniPeso.indexOf(' ') - 1);
									uniPeso0 = uniPeso1[i];
									item.medidas.peso = pesoNum;
									break;
								} else {
									uniPeso0 = 'S/Inf';
								}
							}
						}
					}
					function getPesoByLi() {
						if ($(html).find('li')[postm1] !== undefined) {
							var uniPeso = $(html).find('li')[postm1].innerText;
							for (i = 0; i < uniPeso1.length; i++) {
								if (uniPeso.search(uniPeso1[i]) !== -1) {
									uniPeso0 = uniPeso1[i];
									let pesoNum = uniPeso.substring(
										uniPeso.indexOf(':') + 2,
										uniPeso.search(uniPeso0) - 1
									);
									item.medidas.peso = pesoNum;
									break;
								} else {
									uniPeso0 = 'S/Inf';
								}
							}
						}
					}

					var tipoDetalles = $(html).find('div');

					detTipo0 = [];
					for (let i = 0; i < tipoDetalles.length; i++) {
						for (let j = 0; j < detTipo1.length; j++) {
							if (detTipo1[j] === tipoDetalles[i].getAttribute('id')) {
								detTipo0.push({ attr: j, posicion: i });
							}
						}
					}
					var k;
					for (k = 0; k < detTipo0.length; k++) {
						if (detTipo0[k].attr === 0 || detTipo0[k].attr === 2) {
							checkTipoMedByClass('a-size-base', 'tipoMedida');
							detTipo01 = detTipo0[k].attr;
						} else if (detTipo0[k].attr === 1 || detTipo0[k].attr === 3) {
							checkTipoMedByLi('tipoLista', 'li');
							detTipo01 = detTipo0[k].attr;
						} else {
							postm0 = null;
						}
					}

					// Tipo de unidad de medida
					for (k = 0; k < detTipo0.length; k++) {
						if (detTipo01 === 0 || detTipo01 === 2) {
							getMedNumByClass('a-size-base');
						} else if (detTipo01 === 1 || detTipo01 === 3) {
							getMedNumByLi();
						} else {
							//tipoMed0 = 'S/Inf';
							postm0 = null;
						}
					}

					// Tipo de unidad de Envio
					if (postm1 === null) {
						for (k = 0; k < detTipo0.length; k++) {
							if (detTipo01 === 0 || detTipo01 === 2) {
								getTipoEnvByClass('a-size-base');
							} else if (detTipo01 === 1 || detTipo01 === 3) {
								getTipoEnvByLi();
							} else {
								//tipoMed0 = 'S/Inf';
								postm0 = null;
							}
						}
					} else {
						for (k = 0; k < detTipo0.length; k++) {
							if (detTipo01 === 0 || detTipo01 === 2) {
								getPesoByClass('a-size-base');
							} else if (detTipo01 === 1 || detTipo01 === 3) {
								getPesoByLi();
							} else {
								//tipoMed0 = 'S/Inf';
								postm0 = null;
							}
						}
					}
					function calculosIniciales() {
						// Costos de Envio

						// Conversion de medidas a inches

						if (uniMedida0 === uniMedida1[1]) {
							item.medidas.largo /= 2.54;
							item.medidas.ancho /= 2.54;
							item.medidas.prof /= 2.54;
						} else if (uniMedida0 === uniMedida1[2]) {
							item.medidas.largo /= 25.4;
							item.medidas.ancho /= 25.4;
							item.medidas.prof /= 25.4;
						} else if (uniMedida0 === uniMedida1[4]) {
							item.medidas.largo /= 0.0254;
							item.medidas.ancho /= 0.0254;
							item.medidas.prof /= 0.0254;
						}

						// Conversion de peso a libras

						if (
							uniPeso0 === uniPeso1[4] ||
							uniPeso0 === uniPeso1[5] ||
							uniPeso0 === uniPeso1[6] ||
							uniPeso0 === uniPeso1[6]
						) {
							item.medidas.peso *= 0.0625;
						} else if (uniPeso0 === uniPeso1[9] || uniPeso0 === uniPeso1[10]) {
							item.medidas.peso *= 2.20462;
						} else if (uniPeso0 === uniPeso1[11] || uniPeso0 === uniPeso1[12]) {
							item.medidas.peso *= 0.00220462;
						}

						// volumen

						item.medidas.volumen =
							item.medidas.largo *
							1 *
							(item.medidas.ancho * 1) *
							(item.medidas.prof * 1);
					}
					calculosIniciales();
					//-----------------------PRECIO --------------------------
					let precioTxt = '';
					if ($(html).find('#priceblock_ourprice').length !== 0) {
						precioTxt = $(html).find('#priceblock_ourprice').text();
					} else if ($(html).find('#priceblock_saleprice').length !== 0) {
						precioTxt = $(html).find('#priceblock_saleprice').text();
					} else if (item.variantes.colors.length !== 0) {
						precioTxt = item.variantes.colors[0].price;
					} else if (item.variantes.size.length !== 0) {
						precioTxt = item.variantes.size[0].price;
					} else if (item.variantes.style.length !== 0) {
						precioTxt = item.variantes.style[0].price;
					} else if (item.variantes.pattern.length !== 0) {
						precioTxt = item.variantes.pattern[0].price;
					}

					if (precioTxt !== '') {
						let precioBruto = precioTxt.substring(precioTxt.indexOf('$') + 1);
						item.precio = parseFloat(precioBruto.replace(',', ''));
					}
					/* let newItem = new AsinItem(item, id, variants);
					axiosServices.createAsin(newItem);
					axiosServices.updateAsinsConfirmed(newItem);
					axiosServices.updateKeyWord(newItem); */
					asins.push(item);
				});
				console.timeEnd('TimeAsin');
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
