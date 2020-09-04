import { UIFieldsOptions } from './options';

export type FieldDependentSettings = {
	persistent: boolean;
	validation: any; //Fix this
};

export type FieldOptions = {
	label: string;
	value: string;
	selected?: boolean;
	disabled?: boolean;
};

export type FieldDefault = {
	name: string;
	value?: string;
	type: string;
	label: string;
	requiredText?: string;
	classes?: string[];
	datalist?: string[];
};

export type FieldHTMLSettings = {
	autocomplete?: string;
	accept?: string;
	disabled?: boolean;
	max?: number | string;
	maxlength?: number | string;
	min?: number | string;
	minlength?: number | string;
	multiple?: boolean;
	placeholder?: string;
	required?: boolean;
	step?: number;
	autofocus?: boolean;
	maxUploadSize?: number;
};

export interface Field {
	customData?: any;
	dependentSettings: FieldDependentSettings;
	htmlSettings: FieldHTMLSettings;
	datalist: string[];
	label: string;
	name: string;
	requiredText: string;
	type: string;
	componentType: ComponentType;
}

export type ComponentType = 'UiText' | 'UiHidden' | 'UiSelect' | 'UiFile' | 'UiCheckbox' | 'UiRadio' | 'UiTextarea';

export type FieldTypes =
	| 'text'
	| 'phone'
	| 'date'
	| 'number'
	| 'email'
	| 'tel'
	| 'password'
	| 'range'
	| 'hidden'
	| 'file'
	| 'select'
	| 'radio'
	| 'checkbox'
	| 'textarea';

export type SetField = {
	name: string;
	value: string | string[];
	type: FieldTypes;
	label: string;
	requiredText: string;
	classes: string | string[];
	datalist: string[];
	autocomplete: string;
	accept: string;
	disabled: boolean;
	max: string | number;
	min: string | number;
	maxlength: string | number;
	minlength: string | number;
	multiple: string;
	placeholder: string;
	required: boolean;
	step: number;
	autofocus: boolean;
	maxUploadSize: number;
	persistent: boolean;
	validation: ValidationSettings[];
	options: FieldOptions[];
	baseSettings: FieldDefault;
	htmlSettings: FieldHTMLSettings;
	dependentSettings: FieldDependentSettings;
	customData: any;
	componentType: ComponentType;
};
export type FieldError = {
	name: string;
	message: string;
	valid: boolean;
};
export type FormatValue = {
	key:
		| 'name'
		| 'value'
		| 'type'
		| 'label'
		| 'requiredText'
		| 'classes'
		| 'datalist'
		| 'autocomplete'
		| 'accept'
		| 'disabled'
		| 'max'
		| 'min'
		| 'maxlength'
		| 'minlength'
		| 'multiple'
		| 'placeholder'
		| 'required'
		| 'step'
		| 'autofocus'
		| 'maxUploadSize'
		| 'persistent'
		| 'validation'
		| 'options';
	type: 'string' | 'any' | 'number' | 'boolean' | 'array';
	default?: any;
};

export type FormatOptions = {
	key: string;
	values: FormatValue[];
};

export type ValidationOptions =
	| 'required'
	| 'email'
	| 'postalcode'
	| 'number'
	| 'minlength'
	| 'maxlength'
	| 'min'
	| 'max'
	| 'creditcard'
	| 'date'
	| 'url'
	| 'equalTo'
	| 'notEqualTo'
	| 'vat'
	| 'phone'
	| 'text'
	| 'includes'
	| 'custom';

export type ValidationSettings = {
	name: ValidationOptions;
	message?: string | void;
	options?: any;
	validation?: any;
};

export interface Form {
	options: UIFieldsOptions;
	name: string;
	fields: Record<string, Field>;
	values: Record<string, any>;
	errors: Record<string, any>;
	includesFile: boolean;
	className: string;
	getFormName: () => string;
	getFieldKeys: () => string[];
	getFields: () => Record<string, Field>;
	getField: (name: string) => Field;
	setFields: (fields: SetField[]) => void;
	setField: (field: SetField) => void;
	setValue: (fieldName: string, value: any, addToStorage: boolean) => void;
	getValue: (fieldName: string) => string;
	getFormattedValues: () => any;
	formatComponentType: (type: FieldTypes) => ComponentType;
	subscribe: (listener: (...args: any) => void) => void;
	subscribeField: (fieldName: string, listener: (...args: any) => void) => void;
	subscribeError: (fieldName: string, listener: (...args: any) => void) => void;
	unsubscribe: () => void;
	unsubscribeField: (fieldName: string) => void;
	_setError: (fieldName: string, errorName: string, error: FieldError) => void;
	getError: (fieldName: string, errorName: string) => FieldError | undefined;
	getErrors: () => Record<string, FieldError>;
	getErrorKeys: () => string[];
	removeError: (fieldName: string, errorName: string) => void;
	validator: (type: ValidationOptions) => void;
	defineValidation: (validation: ValidationSettings[], name: string) => void;
	addToLocalStorage: (name: string, value: string) => void;
	getOldValue: (name: string) => Record<string, any> | undefined | false;
}

export interface UIFields {
	className: string;
	forms: Record<string, any>;
	formListeners: Record<string, any>;
	fieldListeners: Record<string, any>;
	conditionListeners: Record<string, any>;
	errorListeners: Record<string, any>;
	waitedListeners: Record<string, any>;
	getValue: (formName: string, fieldName: string) => string;
	new: (name: string) => Form;
	getFieldKeys: (key: string) => string[];
	getField: (formName: string, fieldName: string) => Field | undefined;
	getFields: (formName: string) => Record<string, Field> | undefined;
	getForm: (formName: string) => Form;
	getValues: (formName: string) => string[];
	getFormattedValues: (formName: string) => any;
	setField: (name: string, options: SetField) => void;
	setFields: (name: string, options: SetField[]) => void;
	setValue: (formName: string, name: string, value: string | string[], checkError?: boolean) => void;
	subscribe: (formName: string, listener: (...args: any[]) => void) => void;
	_unsubscribeCustomErrors: (name: string) => void;
	subscribeError: (name: string, fieldName: string, listener: (...args: any[]) => void) => void;
	subscribeField: (formName: string, fieldName: string, listener: (...args: any[]) => void) => void;
	unsubscribe: (formName: string) => void;
	unsubscribeField: (formName: string, fieldName: string) => void;
	unsubscribeFields: (formName: string) => void;
	unsubscribeError: (formName: string, fieldName: string) => void;
	unsubscribeErrors: (formName: string) => void;
	delete: (formName: string) => void;
	_listen: (formName: string, fieldName: string, value: string | string[]) => void;
	checkError: (formName: string, fieldName: string, value: string | string[]) => void;
	_setError: (formName: string, fieldName: string, errorName: string, error: FieldError) => void;
	setError: (formName: string, fieldName: string, error: string) => void;
	_subscribeError: (name: string, data: any) => void;
	removeError: (formName: string, fieldName: string, errorName: string) => void;
	getError: (formName: string, fieldName: string, errorName: string) => FieldError | undefined;
	getErrors: (formName: string) => Record<string, FieldError | any>;
	validate: (formName: string) => void;
	getClassName: (formName: string) => string;
	removeCustomErrors: (formName: string, fieldName: string) => void;
	setCondition: (...args: [string, string, any, string, string | string[]]) => void;
	subscribeCondition: (name: string, listener: (...args: any[]) => void) => void;
	unsubscribeCondition: (formName: string, fieldName: string) => void;
}
