import React from 'react';
import { Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import mainTheme from './themes/main.theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createMuiTheme from 'material-ui/styles/theme';
import Login from './components/Login';
import Nav from './components/Nav';
import MyPlaylists from './containers/MyPlaylists';

import './App.css';

injectTapEventPlugin();

const theme = createMuiTheme();

const App = () => (
    <MuiThemeProvider theme={theme}>
        <div className="app">
            <Route exact path="/" component={Login} />

            <div id="main">
                <Nav />
                <Route path="/myplaylists" component={MyPlaylists} />
            </div>
        </div>
    </MuiThemeProvider>
);

export default App;
