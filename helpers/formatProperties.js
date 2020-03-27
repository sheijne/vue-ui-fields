const formatProperties = (object, ...args) => {
	if (!Array.isArray(args)) {
		return object;
	}

	if (!args.length) {
		return object;
	}

	const [options] = args.splice(0, 1);
	const properties = {};

	options.values.forEach((defaultProp) => {
		const prop = object[defaultProp.key];
		if (defaultProp.default) {
			properties[defaultProp.key] = defaultProp.default;
		}
		if (defaultProp.type === 'array') {
			if (
				prop !== 'undefined' &&
        prop !== null &&
        (Array.isArray(prop))
			) {
				properties[defaultProp.key] = prop;
				delete object[defaultProp.key];
			}
		} else {
			if (prop !== 'undefined' && prop !== null && (typeof prop === defaultProp.type || defaultProp.type === 'any')) {
				properties[defaultProp.key] = prop;
				delete object[defaultProp.key];
			}
		}
	});
	object[options.key] = properties;
	return formatProperties(object, ...args);
};

export default formatProperties;