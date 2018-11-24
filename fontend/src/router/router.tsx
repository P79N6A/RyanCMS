import * as React from 'react';
import { Route, Switch, RouteProps, RouterProps, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Reducers } from '../reducers/reducers';
import { API } from '../services/API';
import { TOKEN } from '../config/constant';
import { userLogin, UserLogin } from '../model/user.model';
import { catchError } from '../util/decorators/catchError';
import { routes } from './routes';
import { afterState } from '../util/decorators/afterState';
import { User } from '../interface/user.interface';

interface State {
	mounted: boolean;
}

// interface Props {
// 	userLogin: UserLogin;
// 	user: User;
// }
@connect(
	(state: Reducers) => ({
		user: state.user
	}),
	{
		userLogin
	}
)
export class RouterConfig extends React.Component<any, State> {
	state = {
		mounted: false
	};
	componentWillMount() {
		const token = localStorage.getItem(TOKEN);
		if (token) {
			this.getUserInfo();
		} else {
			this.setState({
				mounted: true
			});
		}
	}

	@catchError()
	@afterState({
		mounted: true
	})
	async getUserInfo() {
		const user = await API.user.getInfo();
		this.props.userLogin(user);
	}

	render() {
		const { user } = this.props;
		const { mounted } = this.state;
		return mounted ? (
			<BrowserRouter>
				<Switch>
					{routes.map((route, index) => {
						return (
							<Route
								key={index}
								path={route.path}
								exact={true}
								render={(props) => {
									const RouteComponent = route.component as any;
									return route.isAuth && !user ? (
										<Redirect key={index} to="/login" />
									) : (
										<RouteComponent {...props} />
									);
								}}
							/>
						);
					})}
				</Switch>
			</BrowserRouter>
		) : null;
	}
}
