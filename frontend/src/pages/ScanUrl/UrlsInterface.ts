export interface UrlInterface {
	keyWord: string;
	urls?: [
		{
			link?: string;
			cheched?: boolean;
		}
	];
	nUrls?: {
		checked?: number;
		unchecked?: number;
		total?: number;
	};
	asins?: [
		{
			link?: string;
			cheched?: boolean;
		}
	];
	nAsins?: {
		checked?: number;
		unchecked?: number;
		total?: number;
	};
}
