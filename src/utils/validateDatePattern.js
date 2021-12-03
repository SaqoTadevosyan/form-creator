export const validateDatePattern = (pattern) => {
	if (
		pattern.length === 10 &&
		pattern[0] !== '/' &&
		pattern[9] !== '/' &&
		pattern.includes('yyyy') &&
		pattern.includes('mm') &&
		pattern.includes('dd') &&
		(pattern.match(/\//g) || []).length === 2 &&
		!pattern.includes('//')
	) {
		return true;
	}
	return 'Please input valid format. Ex yyyy/mm/dd';
};
