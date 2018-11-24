import { Rate } from 'antd';
import * as React from 'react';
import { RouteProps, RouterProps } from 'react-router';
import * as styles from './Home.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Reducers } from '../../reducers/reducers';
import { User } from '../../interface/user.interface';
import { logout, Logout } from '../../model/user.model';
interface Props extends RouteProps, RouterProps {
	user: User;
	logout: Logout;
}
@connect(
	(state: Reducers) => ({
		user: state.user
	}),
	{
		logout
	}
)
export class Home extends React.Component<Props, any> {
	public render() {
		this.props.children
		return (
			<div className={styles['App']}>
				<p className={styles['App-intro']}>
					<Link to="/register">rehoster</Link>
				</p>
				<div onClick={this.props.logout}>退出</div>
			</div>
		);
	}
}
