import { RequestHandler } from 'express';
import Asins from '../models/AsinsSchema';

export const createAsin: RequestHandler = async (req, res) => {
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
