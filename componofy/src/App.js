// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Login from './views/Login';
// import logo from './logo.svg';
import './App.css';

injectTapEventPlugin();

const App = () =>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="app">
            <Route exact path="/" component={(props: any) => <Login props={props} />} />
        </div>
    </MuiThemeProvider>;

export default App;
