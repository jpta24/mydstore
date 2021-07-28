import axios from 'axios';
import { UrlInterface } from './UrlsInterface';
import { AsinItemInterface } from './AsinItemInterface';
import { AsinsConfirmedInterface } from './AsinsConfirmedInterface';

const API = 'http://localhost:8000/keywords';
const API2 = 'http://localhost:8000/asinsconfirmed';
const API3 = 'http://localhost:8000/asins';

export const updateKeyWord = async (
	obj: UrlInterface,
	responseCallback?: string
) => {
	return await axios.put<UrlInterface>(API, obj);
};

export const createKeyWord = async (obj: UrlInterface) => {
	return await axios.post(API, obj);
};

export const getKeyWords = async () => {
	return await axios.get<UrlInterface[]>(API);
};

export const deleteKeyWord = async (id: string) => {
	return await axios.delete<UrlInterface>(`${API}/${id}`);
};

export const updateAsinsConfirmed = async (
	item: AsinItemInterface,
	responseCallback?: string
) => {
	return await axios.put<AsinItemInterface>(API2, item);
};

export const getAsinsConfirmed = async () => {
	return await axios.get<AsinsConfirmedInterface[]>(API2);
};

export const createAsin = async (
	item: AsinItemInterface,
	responseCallback?: string
) => {
	return await axios.post<AsinItemInterface>(API3, item);
};

/* export const getVideos = async () => {
	return await axios.get<Video[]>(`${API}/videos`);
};


export const createVideo = async (video: Video) => {
	return await axios.post(`${API}/videos`, video);
};

export const getVideo = async (id: string) => {
	return await axios.get<Video>(`${API}/videos/${id}`);
};

export const updateVideo = async (id: string, video: Video) => {
	return await axios.put<Video>(`${API}/videos/${id}`, video);
};

export const deleteVideo = async (id: string) => {
	return await axios.delete<Video>(`${API}/videos/${id}`);
}; */
