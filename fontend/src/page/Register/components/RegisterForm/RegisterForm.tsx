import React from 'react';
import { Button, message } from 'antd';
import styles from './RegisterForm.scss';
import { CustomForm, InputItemProps, getFormValues, Trigger } from '../../../../components/CustomForm/CustomForm';
import {
	validate,
	name,
	password,
	comfirmPassword,
	checkName,
	checkPassword,
	checkComfirmPassword,
	phone,
	checkPhone
} from '../../../../util/validator/validate';
import { UserLogin } from '../../../../model/user.model';
import { catchError } from '../../../../util/catchError';
import { API } from '../../../../services/API';
import { RouterProps } from 'react-router';
const options = [
	{
		name: 'name',
		placeholder: '请输入用户名',
		type: 'text',
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>姓名&emsp;&emsp;</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string) => checkName(val),
			trigger: [ Trigger.blur ]
		}
	},
	{
		name: 'phone',
		placeholder: '请输入手机号',
		type: 'text',
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>手机号&emsp;</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string) => checkPhone(val),
			trigger: [ Trigger.blur ]
		}
	},
	{
		name: 'password',
		placeholder: '6-36位密码',
		type: 'password',
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>密码&emsp;&emsp;</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string, formValues: Array<string>) => checkPassword(val),
			trigger: [ Trigger.blur ]
		}
	},
	{
		name: 'comfirmPassword',
		placeholder: '确认密码',
		type: 'password',
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>确认密码</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string, formValues: Array<string>) => {
				return checkPassword(val) && checkComfirmPassword([ val, formValues['password'] ]);
			},
			trigger: [ Trigger.change, Trigger.blur ]
		}
	}
];

interface State {
	options: Array<InputItemProps>;
}

interface Props extends RouterProps {
	userLogin: UserLogin;
}

export class RegisterForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			options: options
		};
	}

	callback = (e: React.ChangeEvent<HTMLInputElement>, item: InputItemProps) => {
		item.value = e.target.value;
		this.setState({
			options: options
		});
	};

	onSubmit = () => {
		const options = getFormValues(this.state.options);
		this.register(options.name, options.phone, options.password, [ options.password, options.comfirmPassword ]);
	};

	@validate
	@catchError()
	async register(
		@name name: string,
		@phone phone: string,
		@password password: string,
		@comfirmPassword passwords: Array<string>
	) {
		const user = await API.user.register(name, phone, password);
		this.props.userLogin(user);
		message.success('注册成功，正在跳转');
		this.props.history.push('/');
	}

	render() {
		return (
			<div className={styles['container']}>
				<div className={styles['title']}>注册</div>
				<CustomForm callback={this.callback} className={styles['form']} options={this.state.options} />
				<Button type="primary" onClick={this.onSubmit}>
					注册
				</Button>
			</div>
		);
	}
}
