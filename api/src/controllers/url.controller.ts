import { RequestHandler } from 'express';
import Url from '../models/UrlSchema';

export const createUrl: RequestHandler = async (req, res) => {
	const urlFound = await Url.findOne({ url: req.body.url });
	if (urlFound)
		return res.status(301).json({ message: 'Url already exists' });

	const newUrl = new Url(req.body);
	const savedUrl = await newUrl.save();
	res.status(201).json(savedUrl);
};

export const getUrls: RequestHandler = async (req, res) => {
	try {
		const urls = await Url.find();
		return res.json(urls);
	} catch (error) {
		res.json(error);
	}
};

export const getUrl: RequestHandler = async (req, res) => {
	try {
		const urlFound = await Url.findById(req.params.id);
		return res.json(urlFound);
	} catch (error) {
		return res.json('Url not Found').status(204);
	}
};

export const deleteUrl: RequestHandler = async (req, res) => {
	try {
		const urlFound = await Url.findByIdAndDelete(req.params.id);
		return res.json(urlFound);
	} catch (error) {
		return res.json('Url not Found').status(204);
	}
};

export const updateUrl: RequestHandler = async (req, res) => {
	try {
		const urlUpdated = await Url.findByIdAndUpdate(
			req.params.id, // el objeto que va a buscar
			req.body, // los cambios que va a ejecutar
			{ new: true } // para que muestre los nuevos cambios
		);
		return res.json(urlUpdated);
	} catch (error) {
		return res.json('Url not Found').status(204);
	}
};
