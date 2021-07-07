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
				},
				checked: {
					type: Boolean,
					require: true,
					trim: true,
				},
			},
		],
		nUrls: {
			checked: {
				type: Number,
				require: true,
			},
			unchecked: {
				type: Number,
				require: true,
			},
			total: {
				type: Number,
				require: true,
			},
		},
		nAsins: {
			checked: {
				type: Number,
				require: true,
			},
			unchecked: {
				type: Number,
				require: true,
			},
			total: {
				type: Number,
				require: true,
			},
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('KeyWord', keyWordSchema);
