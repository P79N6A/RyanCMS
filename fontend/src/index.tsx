import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './reducers/reducers';
import './public.scss';
import { RouterConfig } from './router/router';

const store = createStore(reducers);

render(
	<Provider store={store}>
		<RouterConfig />
	</Provider>,
	document.getElementById('root') as HTMLElement
);
