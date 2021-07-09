import { RequestHandler } from 'express';
import KeyWord from '../models/KeyWordSchema';

export const createUrl: RequestHandler = async (req, res) => {
	const keyWordObj = JSON.parse(JSON.stringify(req.body));

	const { keyWord } = keyWordObj;

	const newObj = {
		keyWord: keyWord,
		urls: [],
		asins: [],
		nUrls: {
			checked: 0,
			unchecked: 0,
			total: 0,
		},
		nAsins: {
			checked: 0,
			unchecked: 0,
			total: 0,
		},
	};

	const keyWordFound = await KeyWord.findOne({ keyWord: newObj.keyWord });

	if (keyWordFound) {
		return res.status(301).json({ message: 'Error Duplicated' });
	}

	const newKW = new KeyWord(newObj);

	const savedUrl = await newKW.save();
	res.status(201).json(savedUrl);
};

export const updateUrl: RequestHandler = async (req, res) => {
	try {
		if (req.body.update === 1) {
			const newObj = {
				id: req.body.id,
				urls: {
					link: req.body.urls.link,
					checked: req.body.urls.checked,
				},
			};
			const KWUpdated = await KeyWord.findByIdAndUpdate(
				newObj.id,
				{
					$inc: { 'nUrls.unchecked': 1, 'nUrls.total': 1 },
					$push: { urls: newObj.urls },
				},
				{ new: true }
			);
			return res.status(201).json(KWUpdated);
		} else if (req.body.update === 2) {
			const newObj = {
				asins: {
					asin: req.body.asins.asin,
					checked: false,
				},
			};
			const KWUpdated = await KeyWord.findByIdAndUpdate(
				req.body.id,
				{
					$inc: {
						'nAsins.unchecked': 1,
						'nAsins.total': 1,
					},
					$push: { asins: newObj.asins },
				},
				{ new: true }
			);
			return res.status(201).json(KWUpdated);
		} else if (req.body.update === 3) {
			const KWUpdated = await KeyWord.findByIdAndUpdate(
				req.body.id,
				{
					$inc: {
						'nUrls.unchecked': -1,
						'nUrls.checked': 1,
					},
				},
				{ new: true }
			);
			return res.status(201).json(KWUpdated);
		}
	} catch (error) {
		return res.json(error);
	}
};

export const getUrls: RequestHandler = async (req, res) => {
	try {
		const keyWords = await KeyWord.find();
		return res.json(keyWords);
	} catch (error) {
		res.json(error).status(404);
	}
};

export const deleteUrl: RequestHandler = async (req, res) => {
	try {
		const keyWordFound = await KeyWord.findByIdAndDelete(req.params.id);
		return res.json(keyWordFound);
	} catch (error) {
		res.json(error).status(404);
	}
};
