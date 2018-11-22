import { Rate } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Reducers } from '../../reducers/reducers';
import { RouteProps, RouterProps } from 'react-router';
import { Row, Col } from 'antd';
import * as styles from './Register.scss';
import { RegisterInfo } from './components/RegisterInfo/RegisterInfo';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { userUpdate } from '../../model/User';

interface Props extends RouteProps, RouterProps {
	userUpdate: () => void;
}

@(connect as any)(
	(state: Reducers) => ({
		books: state.user
	}),
	{
		userUpdate
	}
)
export default class App extends React.Component<Props, any> {
	public render() {
		const { userUpdate } = this.props;
		return (
			<div className={styles['container']}>
				<Row gutter={24}>
					<Col span={12}>
						<RegisterInfo />
					</Col>
					<Col span={12}>
						<RegisterForm userUpdate={userUpdate} />
					</Col>
				</Row>
			</div>
		);
	}
}
