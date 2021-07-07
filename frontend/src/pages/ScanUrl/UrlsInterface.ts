export interface UrlInterface {
	_id?: string;
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

	createdAt?: string | Date;
	updatedAt?: string | Date;
}
