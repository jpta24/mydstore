import { Schema, model } from 'mongoose';

const asinsSchema = new Schema(
	{
		keyWord: String,
		linkAsin: String,
		nombre: String,
		asin: String,
		precio: Number,
		prime: Boolean,
		disponibilidad: Boolean,
		condicionNew: Boolean,
		cantidad: Number,
		selection: String,
		variantes: { colors: [], size: [], style: [], pattern: [] },
		descripcion: String,
		categorias: [],
		imagenes: [],
		medidas: {
			dimensiones: String,
			largo: String,
			ancho: String,
			prof: String,
			peso: String,
			volumen: String,
		},
		rankings: {
			ranks: [],
			maxRank: String,
		},
		cupon: Boolean,
		meta: String,
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Asins', asinsSchema);
