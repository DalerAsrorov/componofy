import { createBrowserHistory } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';

export const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routeMiddleware = routerMiddleware(history);
const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer,
});

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(routeMiddleware, thunkMiddleware))
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
