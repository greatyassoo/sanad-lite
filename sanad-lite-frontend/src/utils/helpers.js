export const stringifyQueryParams = (queryParams) => {
	return Object.entries(queryParams)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
};
