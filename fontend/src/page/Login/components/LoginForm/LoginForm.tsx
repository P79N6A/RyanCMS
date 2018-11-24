import React from 'react';
import { Button, message } from 'antd';
import styles from './LoginForm.scss';
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
} from '../../../../util/decorators/validator/validate';
import { UserLogin } from '../../../../model/user.model';
import { catchError } from '../../../../util/decorators/catchError';
import { API } from '../../../../services/API';
import { RouterProps } from 'react-router';
import { loading } from '../../../../util/decorators/loading';
const options = [
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
	}
];

interface State {
	options: Array<InputItemProps>;
	loading: boolean;
}

interface Props extends RouterProps {
	userLogin: UserLogin;
}

export class LoginForm extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			options: options,
			loading: false
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
		this.login(options.phone, options.password);
	};

	@validate()
	@loading()
	@catchError()
	async login(@phone phone: string, @password password: string) {
		const user = await API.user.login(phone, password);
		this.props.userLogin(user);
		message.success('登录成功，正在跳转');
		this.props.history.push('/');
	}

	render() {
		const { loading } = this.state;
		return (
			<div className={styles['container']}>
				<div className={styles['title']}>登录</div>
				<CustomForm callback={this.callback} className={styles['form']} options={this.state.options}>
					<Button type="primary" onClick={this.onSubmit} loading={loading}>
						登录
					</Button>
				</CustomForm>
			</div>
		);
	}
}
