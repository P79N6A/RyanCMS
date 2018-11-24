import * as React from 'react';
import Header from '../../components/Header/Header';
import { RouteProps, RouterProps } from 'react-router';
import { User } from '../../interface/user.interface';
import { connect } from 'react-redux';
import { Reducers } from '../../reducers/reducers';
interface Props extends RouteProps, RouterProps {
	user: User;
}

@connect((state: Reducers) => ({
	user: state.user
}))
export class Layout extends React.Component<Props, {}> {
	render() {
		const { location, history, user } = this.props;
		return (
			<div>
				<Header location={location} history={history} user={user} />
			</div>
		);
	}
}
