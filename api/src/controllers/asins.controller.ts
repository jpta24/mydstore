import { RequestHandler } from 'express';
import Asins from '../models/AsinsSchema';

export const createAsin: RequestHandler = async (req, res) => {
	console.log(req.body);

	for (let i = 0; i < req.body.length; i++) {
		const asinObj = JSON.parse(JSON.stringify(req.body[i]));

		const asinFound = await Asins.findOne({ asin: asinObj.asin });
		if (asinFound) {
			return res.status(301).json({ message: 'Error Duplicated' });
		}

		const newAsin = new Asins(req.body.item);

		const savedAsin = await newAsin.save();
		res.status(201).json(savedAsin);
	}
};

export const getAsins: RequestHandler = async (req, res) => {
	try {
		const asins = await Asins.find();
		return res.json(asins);
	} catch (error) {
		res.json(error).status(404);
	}
};
