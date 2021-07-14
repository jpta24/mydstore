import { Schema, model } from 'mongoose';

const asinsConfirmedSchema = new Schema(
	{
		asins: [],
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('AsinsConfirmed', asinsConfirmedSchema);
