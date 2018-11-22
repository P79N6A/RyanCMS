import React from 'react';
import { Button } from 'antd';
import styles from './RegisterForm.scss';
import { CustomForm, InputItemProps, getFormValues, Trigger } from '../../../../components/CustomForm/CustomForm';
import {
	validate,
	name,
	password,
	email,
	comfirmPassword,
	checkName,
	checkEmail,
	checkPassword,
	checkComfirmPassword
} from '../../../../util/validator/validate';
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
		name: 'email',
		placeholder: '请输入邮箱',
		type: 'text',
		className: styles['input-item'],
		value: '',
		formItem: {
			label: <span>邮箱&emsp;&emsp;</span>,
			className: styles['label-item']
		},
		validator: {
			dataValid: (val: string) => checkEmail(val),
			trigger: [ Trigger.blur ]
		}
	},
	{
		name: 'password',
		placeholder: '至少8位密码',
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

interface Props {
	userUpdate: Function;
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
		this.register(options.name, options.email, options.password, [ options.password, options.comfirmPassword ]);
	};

	@validate
	register(
		@name name: string,
		@email email: string,
		@password password: string,
		@comfirmPassword passwords: Array<string>
	) {
		console.log('注册');
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
