import { RequestHandler } from 'express';
import AsinsConfirmedSchema from '../models/AsinsConfirmedSchema';
import AsinsConfirmed from '../models/AsinsConfirmedSchema';

export const createAsinsConfirmed: RequestHandler = async (req, res) => {
	console.log(req.body);

	const newKW = new AsinsConfirmed([]);

	const savedAsinsConfirmed = await newKW.save();
	res.status(201).json(savedAsinsConfirmed);
};

export const updateAsinsConfirmed: RequestHandler = async (req, res) => {
	try {
		await AsinsConfirmed.findByIdAndUpdate(
			'60f4a3fa05307829c406d449',
			{
				$push: { $each: req.body },
			},
			{ new: true }
		);
		return res.status(201);
	} catch (error) {
		return res.json(error);
	}
};

export const getAsinsConfirmed: RequestHandler = async (req, res) => {
	try {
		const asinsConfirmed = await AsinsConfirmed.find();
		return res.json(asinsConfirmed);
	} catch (error) {
		res.json(error).status(404);
	}
};
