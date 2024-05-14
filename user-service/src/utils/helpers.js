export const filterObject = (obj, attrs) => {
	if (!(attrs === undefined) || (attrs && attrs.length <= 0))
		attrs.map((attr) => delete obj[attr]);
	return obj;
};
