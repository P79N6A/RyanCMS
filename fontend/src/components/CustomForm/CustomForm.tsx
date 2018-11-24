import React, { ComponentProps } from 'react';
import { Form } from 'antd';
import styles from './CustomForm.scss';
import { CustomInput } from '../CustomInput/CustomInput';
import { InputProps } from 'antd/lib/input';
import { FormItemProps } from 'antd/lib/form';
const FormItem = Form.Item;
interface Props extends React.Props<null> {
	options: Array<InputItemProps>;
	className: string;
	callback: Function;
}
export enum Trigger {
	change = 'change',
	blur = 'blur'
}

export interface InputItemProps extends InputProps {
	value: string;
	name: string;
	validator?: {
		dataValid: Function;
		trigger: Array<Trigger>;
	};
	formItem?: FormItemProps;
}

export function getFormValue(name: string, options: Array<InputItemProps>) {
	return options.filter((item) => item.name === name)[0] || null;
}

export function getFormValues(options: Array<InputItemProps>): any {
	let optionObj = {};
	options.forEach((item) => {
		optionObj[item.name] = item.value;
	});
	return optionObj;
}

export function CustomForm(props: Props) {
	function onChange(e: React.ChangeEvent<HTMLInputElement>, item: InputItemProps, options: Array<InputItemProps>) {
		props.callback(e, item);
		setValidator(e.target.value, item, options, Trigger.change);
	}

	function onBlur(e: React.ChangeEvent<HTMLInputElement>, item: InputItemProps, options: Array<InputItemProps>) {
		props.callback(e, item);
		setValidator(e.target.value, item, options, Trigger.blur);
	}

	function setValidator(value: string, item: InputItemProps, options: Array<InputItemProps>, type: Trigger) {
		const validator = item.validator;
		if (!item.formItem) {
			item.formItem = {};
		}
		if (validator && validator.trigger.includes(type)) {
			item.formItem.validateStatus =
				validator && validator.dataValid(value, getFormValues(options)) ? 'success' : 'error';
		}
	}

	return (
		<div className={props.className}>
			<Form>
				{props.options.map((item, index) => {
					let inputProps = { ...item };
					delete inputProps.validator;
					delete inputProps.formItem;
					return (
						<FormItem key={index} hasFeedback={true} {...item.formItem}>
							<CustomInput
								{...inputProps}
								onChange={(e) => onChange(e, item, props.options)}
								onBlur={(e) => onBlur(e, item, props.options)}
							/>
						</FormItem>
					);
				})}
				{props.children}
			</Form>
		</div>
	);
}
