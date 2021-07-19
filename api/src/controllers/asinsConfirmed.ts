import { RequestHandler } from 'express';
import AsinsConfirmed from '../models/AsinsConfirmedSchema';

export const createAsinsConfirmed: RequestHandler = async (req, res) => {
	console.log(req.body);

	const newKW = new AsinsConfirmed([]);

	const savedAsinsConfirmed = await newKW.save();
	res.status(201).json(savedAsinsConfirmed);
};
