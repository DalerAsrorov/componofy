import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as reducers from './reducers';

export const history = createHistory();

const routeMiddleware = routerMiddleware(history);

const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer
});

const configureStore = () => {
    const store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(routeMiddleware, thunkMiddleware, logger)
    );

    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./reducers', () => {
                store.replaceReducer(rootReducer);
            });
        }
    }

    return store;
};

export default configureStore;
