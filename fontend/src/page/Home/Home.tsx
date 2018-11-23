import { Rate } from 'antd';
import * as React from 'react';
import { validate, phone, password } from '../../util/validator/validate';
import { RouteProps, RouterProps } from 'react-router';
import * as styles from './Home.scss';
import { TOKEN } from '../../config/constant';
interface Props extends RouteProps, RouterProps {}

export class Home extends React.Component<Props, any> {
	componentDidMount() {
		console.log(this.props.history);
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
