export default (value, otherField) => {
	const field = otherField();
	if (field) {
		return field.value !== value;
	}
	return false;
};
