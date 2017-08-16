// @flow

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Landing from 'components/Landing';
import './login.css';

class Login extends Component {
    render() {
        return <Landing icon="someIcon" iconText="Authorize" title="Componofy" subTitle="by Daler Asrorov" />;
    }
}

export default Login;
