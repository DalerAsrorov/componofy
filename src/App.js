import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import mainTheme from './themes/main.theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
// import PrivateRoute from './containers/PrivateRoute';
import Main from './components/Main';
import Login from './components/Login';

import './App.css';

injectTapEventPlugin();

const theme = createMuiTheme();

const Notfound = () => (
    <div>
        <span>Wrong route</span>
    </div>
);

const App = () => (
    <MuiThemeProvider theme={theme}>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/app" component={Main} />
            <Route component={Notfound} />
        </Switch>
    </MuiThemeProvider>
);

export default App;
