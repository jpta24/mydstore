import { Schema, model } from 'mongoose';

const keyWordSchema = new Schema(
	{
		keyWord: {
			type: String,
			require: true,
			trim: true,
			unique: true,
		},
		urls: [
			{
				link: {
					type: String,
					trim: true,
					unique: true,
				},
				checked: {
					type: Boolean,
					require: true,
					trim: true,
				},
			},
		],
		asins: [
			{
				asin: {
					type: String,
					trim: true,
					unique: true,
				},
				checked: {
					type: Boolean,
					require: true,
					trim: true,
				},
			},
		],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Url', keyWordSchema);
