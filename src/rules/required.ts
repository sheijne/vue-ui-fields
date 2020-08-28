const isEmptyArray = (arr: any): boolean => {
	return Array.isArray(arr) && arr.length === 0;
};

const isNullOrUndefined = (...values: any[]) => {
	return values.every((value) => {
		return value === null || value === undefined;
	});
};

/**
 * Check if there's a value in de input
 */
export default (value: any) => {
	if (isNullOrUndefined(value) || isEmptyArray(value)) {
		return false;
	}

	// incase a field considers `false` as an empty value like checkboxes.
	if (value === false) {
		return false;
	}

	return !!String(value).trim().length;
};
