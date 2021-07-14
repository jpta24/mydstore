import { Schema, model } from 'mongoose';

const asinsSchema = new Schema(
	{
		asins: [],

		//more information update when done
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

export default model('Asins', asinsSchema);
