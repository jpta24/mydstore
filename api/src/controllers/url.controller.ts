import { RequestHandler } from 'express';
import Url from '../models/UrlSchema';
import getPaginations from '../libs/urls';

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

export const createUrl: RequestHandler = async (req, res) => {
	const { link, keyWord } = req.body;
	var checked = false;

	const newObj = {
		link: link,
		keyWord: keyWord,
		checked: checked,
	};

	const urlFound = await Url.findOne({ url: newObj.link });

	if (urlFound) return res.status(301).json({ message: 'Url already exists' });

	const newUrl = new Url(newObj);

	const savedUrl = await newUrl.save();
	res.status(201).json('done');
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
