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
			for (let i = 0; i < req.body.urls.length; i++) {
				console.log(i);

				const newObj = {
					id: req.body.id,
					urls: {
						link: req.body.urls[i],
						checked: false,
					},
				};

				await KeyWord.findByIdAndUpdate(
					newObj.id,
					{
						$inc: { 'nUrls.unchecked': 1, 'nUrls.total': 1 },
						$push: { urls: newObj.urls },
					},
					{ new: true }
				);
			}
			return res.status(201);
		} else if (req.body.update === 2) {
			const obj = [];

			for (let i = 0; i < req.body.asin.length; i++) {
				const asin = {
					asin: req.body.asin[i],
					checked: false,
				};

				obj.push(asin);
			}

			for (let i = 0; i < req.body.urlsChecked.length; i++) {
				await KeyWord.findOneAndUpdate(
					{ _id: req.body.id, 'urls.link': req.body.urlsChecked[i] },
					{
						$set: { 'urls.$.checked': true },
					},
					{ new: true }
				);
			}

			const KWUpdated = await KeyWord.findByIdAndUpdate(
				req.body.id,
				{
					$inc: {
						'nAsins.unchecked': req.body.nAsins,
						'nAsins.total': req.body.nAsins,
						'nUrls.checked': req.body.nUrls,
						'nUrls.unchecked': -req.body.nUrls,
					},
					$push: {
						asins: { $each: obj },
					},
				},
				{ new: true }
			);

			for (let i = 0; i < req.body.urlsChecked.length; i++) {
				await KeyWord.findOneAndUpdate(
					{ _id: req.body.id, 'urls.link': req.body.urlsChecked[i] },
					{
						$set: { 'urls.$.checked': true },
					},
					{ new: true }
				);
			}

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
