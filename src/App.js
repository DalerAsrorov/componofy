import React from 'react';
import { Route, Switch } from 'react-router';
// TODO: craete a custom theme in this file
// import mainTheme from './themes/main.theme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PrivateRoute from './containers/PrivateRoute';
import Typography from '@material-ui/core/Typography';
import Loader from './components/Loader';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
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
    icon={<NotInterestedIcon />}
    className="not-found-page"
    shouldShowShadows
  />
);

const App = () => {
  console.log(Login, Main);

  return (
    <MuiThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/" component={(props) => <Login {...props} />} />
        <PrivateRoute path="/app" component={(props) => <Main {...props} />} />
        <Route component={NotFound} />
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
