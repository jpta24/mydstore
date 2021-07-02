import { Schema, model } from 'mongoose';

const urlSchema = new Schema(
	{
		link: {
			type: String,
			require: true,
			trim: true,
			unique: true,
		},
		keyWord: {
			type: String,
			trim: true,
		},
		checked: {
			type: Boolean,
			require: true,
			trim: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Url', urlSchema);
