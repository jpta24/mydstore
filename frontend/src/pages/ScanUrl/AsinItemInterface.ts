export interface AsinItemInterface {
	keyWord: string;
	linkAsin: string;
	nombre: string;
	asin: string;
	precio?: number;
	prime?: boolean;
	disponibilidad?: boolean;
	condicionNew?: boolean;
	cantidad: number;
	selection: string;
	variantes: { colors: []; size: []; style: []; pattern: [] };
	descripcion?: string;
	features?: [];
	features2?: [];
	categorias?: [];
	imagenes?: [];
	medidas: {
		dimensiones: string;
		largo: string;
		ancho: string;
		prof: string;
		peso: string;
		volumen: number;
	};
	rankings?: {
		ranks: [];
		maxRank: number;
	};
	cupon?: boolean;
	meta?: string;

	createdAt?: string | Date;
	updatedAt?: string | Date;
}
