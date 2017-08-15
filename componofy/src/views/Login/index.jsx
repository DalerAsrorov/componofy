// @flow

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './login.css';

const paperStyle = {
    width: '100px',
    height: '100px',
    margin: '20px'
};

class Login extends Component {
    render() {
        return (
            <div id="loginView">
                <Paper style={paperStyle} zDepth={2} />
            </div>
        );
    }
}

export default Login;
