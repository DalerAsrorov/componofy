import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter key={Math.random()}>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
