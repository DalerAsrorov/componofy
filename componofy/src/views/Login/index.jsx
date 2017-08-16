// @flow

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Landing from 'components/Landing';
import './login.css';

class Login extends Component {
    render() {
        return (
            <Grid className="login">
                <Landing icon="someIcon" iconText="Authorize" title="Componofy" subTitle="by Daler Asrorov" />
            </Grid>
        );
    }
}

export default Login;
