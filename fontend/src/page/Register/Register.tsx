import { Rate } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Reducers } from '../../reducers/reducers';
import { RouteProps, RouterProps } from 'react-router';
import { Row, Col } from 'antd';
import * as styles from './Register.scss';
import { RegisterInfo } from './components/RegisterInfo/RegisterInfo';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { userLogin, UserLogin } from '../../model/user.model';
import { User } from '../../interface/user.interface';
interface Props extends RouteProps, RouterProps {
	user: User;
	userLogin: UserLogin;
}
interface State {}
@connect(
	(state: Reducers) => ({
		user: state.user
	}),
	{
		userLogin
	}
)
export class Register extends React.Component<Props, State> {
	public render() {
		const { userLogin, history } = this.props;
		return (
			<div className={styles['container']}>
				<Row gutter={24}>
					<Col span={12}>
						<RegisterInfo />
					</Col>
					<Col span={12}>
						<RegisterForm history={history} userLogin={userLogin} />
					</Col>
				</Row>
			</div>
		);
	}
}
