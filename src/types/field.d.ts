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

export type SetField = {
	name: string;
	value: string | string[];
	type:
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
	datalist: string[];
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
