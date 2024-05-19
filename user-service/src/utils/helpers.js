export const filterObject = (obj, attrs) => {
	if (!(attrs === undefined) || (attrs && attrs.length <= 0))
		attrs.map((attr) => delete obj[attr]);
	return obj;
};

export const stringifyQueryParams = (queryParams) => {
	return Object.entries(queryParams)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
};