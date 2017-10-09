import React from 'react';
import ReactDOM from 'react-dom';
// Routing modules
import createHistory from 'history/createBrowserHistory';
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware
} from 'react-router-redux';
// Redux modules
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import * as reducers from './reducers';
// App modules
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const routeMiddleware = routerMiddleware(history, logger);
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    {},
    applyMiddleware(routeMiddleware, thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
