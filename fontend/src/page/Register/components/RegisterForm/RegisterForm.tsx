import React from 'react';
import { Button } from 'antd';
import styles from './RegisterForm.scss';
import { CustomForm, InputItemProps, getFormValues, Trigger } from '../../../../components/CustomForm/CustomForm';
import { validate, name, password, email, comfirmPassword, checkName, checkEmail, checkPassword, checkComfirmPassword } from '../../../../util/validator/validate';
const options = [
  {
    name: 'name',
    placeholder: '请输入用户名',
    type: 'text',
    className: styles['input-item'],
    value: '',
    formItem: {
      label: <span>姓名&emsp;&emsp;</span>,
      className: styles['label-item'],
    },
    validator: {
      dataValid: (val, formValues) => checkName(val),
      trigger: [Trigger.blur]
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
      className: styles['label-item'],
    },
    validator: {
      dataValid: (val, formValues) => checkEmail(val),
      trigger: [Trigger.blur]
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
      className: styles['label-item'],
    },
    validator: {
      dataValid: (val, formValues) => checkPassword(val),
      trigger: [Trigger.blur]
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
      className: styles['label-item'],
    },
    validator: {
      dataValid: (val, formValues) => {
        return checkPassword(val) && checkComfirmPassword([val, formValues['password']]);
      } ,
      trigger: [Trigger.change, Trigger.blur]
    }
  },
]

interface State {
  options: Array<InputItemProps>
}

export class RegisterForm extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      options: options
    }
  }


  callback = (e: React.ChangeEvent<HTMLInputElement>, item: InputItemProps) => {
    item.value = e.target.value;
    this.setState({
      options: options
    })
  }

  onSubmit=()=>{
    const options = getFormValues(this.state.options);
    this.register(options.name, options.email, options.password, [options.password, options.comfirmPassword]);
  }

  
  @validate
  register (@name name, @email email, @password password, @comfirmPassword passwords) {
    console.log('注册');
  }

  render() {
    return (
      <div className={styles['container']}>
        <div className={styles['title']}>注册</div>
        <CustomForm callback={this.callback} className={styles['form']} options={this.state.options} />
        <Button type="primary" onClick={this.onSubmit}>注册</Button>
      </div>
    )
  }
}