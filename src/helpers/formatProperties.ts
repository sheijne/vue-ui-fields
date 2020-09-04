import type { SetField, FormatOptions, FormatValue } from '../types';

const formatProperties = (object: SetField, ...args: FormatOptions[]): any => {
	if (!Array.isArray(args)) {
		return object;
	}

	if (!args.length) {
		return object;
	}

	//Take first option
	const [options] = args.splice(0, 1);

	const properties = {};
	const values = options.values as FormatValue[];

	values.forEach((defaultProp) => {
		const prop = object[defaultProp.key];
		if (defaultProp.default) {
			Object.defineProperty(properties, defaultProp.key, {
				value: defaultProp.default,
				configurable: true,
			});
		}
		//When array define the array
		if (defaultProp.type === 'array') {
			if (prop !== 'undefined' && prop !== null && Array.isArray(prop)) {
				Object.defineProperty(properties, defaultProp.key, {
					value: prop,
					configurable: true,
				});
				delete object[defaultProp.key];
			}
		} else {
			if (prop !== 'undefined' && prop !== null && (typeof prop === defaultProp.type || defaultProp.type === 'any')) {
				Object.defineProperty(properties, defaultProp.key, {
					value: prop,
					configurable: true,
				});
				delete object[defaultProp.key];
			}
		}
	});
	Object.defineProperty(object, options.key, {
		value: properties,
		configurable: true,
	});
	return formatProperties(object, ...args);
};

export default formatProperties;
