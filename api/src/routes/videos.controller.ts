import { RequestHandler } from 'express';
import Video from './UrlSchema';

export const createVideo: RequestHandler = async (req, res) => {
	const videoFound = await Video.findOne({ url: req.body.url });
	if (videoFound)
		return res.status(301).json({ message: 'Video already exists' });

	const video = new Video(req.body);
	const savedVideo = await video.save();
	res.json(savedVideo);
};

export const getVideos: RequestHandler = async (req, res) => {
	try {
		const videos = await Video.find();
		return res.json(videos);
	} catch (error) {
		res.json(error);
	}
};

export const getVideo: RequestHandler = async (req, res) => {
	try {
		const videoFound = await Video.findById(req.params.id);
		return res.json(videoFound);
	} catch (error) {
		return res.json('Video not Found').status(204);
	}
};

export const deleteVideo: RequestHandler = async (req, res) => {
	try {
		const videoFound = await Video.findByIdAndDelete(req.params.id);
		return res.json(videoFound);
	} catch (error) {
		return res.json('Video not Found').status(204);
	}
};

export const updateVideo: RequestHandler = async (req, res) => {
	try {
		const videoUpdated = await Video.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		return res.json(videoUpdated);
	} catch (error) {
		return res.json('Video not Found').status(204);
	}
};
