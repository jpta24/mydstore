import GetOneAsinInfo from './BtnGetOneAsinInfo';

async function getOneAsin(asin, keyWord) {
	let item = await GetOneAsinInfo(asin, keyWord);
	return item;
}

export default getOneAsin;
