import React from 'react';
import { Route, Switch } from 'react-router';
// TODO: craete a custom theme in this file
// import mainTheme from './themes/main.theme';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import PrivateRoute from './containers/PrivateRoute';
import Typography from 'material-ui/Typography';
import Loader from './components/Loader';
import { DoNotDisturb } from 'material-ui-icons';
import Main from './components/Main';
import Login from './components/Login';

import './App.css';

const theme = createMuiTheme();

const NotFound = () => (
    <Loader
        text={
            <Typography variant="display3" color="textSecondary">
                This page does not exist
            </Typography>
        }
        icon={<DoNotDisturb />}
        className="not-found-page"
        shouldShowShadows
    />
);

const App = () => (
    <MuiThemeProvider theme={theme}>
        <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/app" component={Main} />
            <Route component={NotFound} />
        </Switch>
    </MuiThemeProvider>
);

export default App;
