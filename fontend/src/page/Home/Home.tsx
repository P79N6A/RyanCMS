import { Rate } from 'antd';
import * as React from 'react';
import { validate, phone, password } from '../../util/validator/validate';
import { RouteProps, RouterProps } from 'react-router';
import * as styles from './Home.scss';
interface Props extends RouteProps, RouterProps {}

export default class App extends React.Component<Props, any> {
	componentDidMount() {
		this.login('183206650111', '1254asd');
	}

	@validate
	login(@phone phone: string, @password password: string) {
		return {
			name: 'Ryan',
			phone: phone,
			sex: 1
		};
	}

	public render() {
		return (
			<div className={styles['App']}>
				<p className={styles['App-intro']}>
					To get started, edit <code>src/App.tsx</code> and save to reload.
				</p>
				<Rate character="6" />
			</div>
		);
	}
}
