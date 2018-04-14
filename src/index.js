import React from 'react';
import ReactDOM from 'react-dom';
import configureStore, { history } from './configureStore';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
}

registerServiceWorker();
