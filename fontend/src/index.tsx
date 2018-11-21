import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import Routes from './router/router';
import { reducers } from './reducers/reducers';
import './public.scss';

// 使用初始 state 创建 Redux store
const store = createStore(reducers);

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
