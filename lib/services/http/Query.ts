//Emaple possible pagination fron your database
export type Pagination = {
	page?: number;
	pageSize?: number;
	total?: number;
	limit?: number;
	start?: number;
};
//Example meta response from your backend
export type MetaData = {
	pagination: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: number;
	}
};
//example query to your backend
type Query = {
	filters?: Object;
	fields?: Array<string>;
	sort?: Array<string>;
	pagination?: Pagination;
	locale?: string;
};

export default Query;
