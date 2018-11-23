import * as React from 'react';
import { Route, Switch } from 'react-router';
// 服务端渲染
import { Home } from '../page/Home/Home';
import { Register } from '../page/Register/Register';

function RouterConfig() {
	console.log(arguments);
	return (
		<React.Fragment>
			<Route beforeEach path="/" exact={true} component={Home} />
			<Route path="/register" exact={true} component={Register} />
		</React.Fragment>
	);
}

export default RouterConfig;
