import * as React from 'react';
import { Route, Switch } from 'react-router';
// 服务端渲染
import Home from '../page/Home/Home';
import Register from '../page/Register/Register';


function RouterConfig() {
  return (
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/register" exact={true} component={Register} />
    </Switch>
  );
}

export default RouterConfig;
