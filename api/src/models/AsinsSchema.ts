import { Schema, model } from 'mongoose';

const asinsSchema = new Schema(
	{
		keyWord: {
			type: String,
			trim: true,
		},
		linkAsin: {
			type: String,
			trim: true,
		},
		nombre: {
			type: String,
			trim: true,
		},
		asin: {
			type: String,
			require: true,
			trim: true,
			unique: true,
		},
		precio: {
			type: Number,
		},
		prime: Boolean,
		disponibilidad: Boolean,
		condicionNew: Boolean,
		cantidad: {
			type: Number,
		},
		selection: {
			type: String,
			trim: true,
		},
		variantes: {
			colors: {
				type: Array,
			},
			size: {
				type: Array,
			},
			style: {
				type: Array,
			},
			pattern: {
				type: Array,
			},
		},
		descripcion: {
			type: String,
			trim: true,
		},
		features: {
			type: Array,
		},
		features2: {
			type: Array,
		},
		categorias: {
			type: Array,
		},
		imagenes: {
			type: Array,
		},
		medidas: {
			dimensiones: {
				type: String,
				trim: true,
			},
			largo: {
				type: String,
				trim: true,
			},
			ancho: {
				type: String,
				trim: true,
			},
			prof: {
				type: String,
				trim: true,
			},
			peso: {
				type: String,
				trim: true,
			},
			volumen: {
				type: Number,
			},
		},
		rankings: {
			ranks: {
				type: Array,
			},
			maxRank: {
				type: Number,
			},
		},
		cupon: Boolean,
		meta: {
			type: String,
			trim: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Asins', asinsSchema);
