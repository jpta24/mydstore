import { Schema, model } from 'mongoose';

const videoSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
			trim: true,
		},
		description: {
			type: String,
			trim: true,
		},
		url: {
			type: String,
			require: true,
			trim: true,
			unique: true,
		},
	},
	{
		versionKey: false, //   versionKey: false,  quita el key de cada elemante
		timestamps: true, //    timestamps: true,  crea una fecha de creacion y una fecha de update
	}
);

export default model('Video', videoSchema);
