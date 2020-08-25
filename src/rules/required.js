const isEmptyArray = (arr) => {
	return Array.isArray(arr) && arr.length === 0;
};

const isNullOrUndefined = (...values) => {
	return values.every((value) => {
		return value === null || value === undefined;
	});
};

/**
 * Check if there's a value in de input
 * @param {String} value
 */
export default (value) => {
	if (isNullOrUndefined(value) || isEmptyArray(value)) {
		return false;
	}

	// incase a field considers `false` as an empty value like checkboxes.
	if (value === false) {
		return false;
	}

	return !!String(value).trim().length;
};
