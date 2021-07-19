import { Schema, model } from 'mongoose';

const asinsConfirmedSchema = new Schema(
	{
		asins: {
			type: Array,
			require: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('AsinsConfirmed', asinsConfirmedSchema);
