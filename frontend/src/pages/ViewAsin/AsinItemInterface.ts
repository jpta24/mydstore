export interface AsinItemInterface {
	keyWord: string;
	linkAsin: string;
	nombre: string;
	asin: string;
	precio: number;
	prime: boolean;
	disponibilidad: boolean;
	condicionNew: boolean;
	cantidad: number;
	selection: string[];
	variantes: {
		colors: Variant[];
		size: Variant[];
		style: Variant[];
		pattern: Variant[];
	};
	descripcion?: string;
	features?: string[];
	features2?: string[];
	categorias?: string[];
	imagenes?: Imgs[];
	medidas?: {
		dimensiones: string;
		largo: number;
		ancho: number;
		prof: number;
		peso: number;
		volumen: number;
	};
	rankings?: {
		ranks: number[];
		maxRank: number;
	};
	cupon?: boolean;
	meta?: string;
}

interface Variant {
	asin: string;
	price: string;
	option: string;
}

interface Imgs {
	src: string;
	detImgAsin: string;
}
