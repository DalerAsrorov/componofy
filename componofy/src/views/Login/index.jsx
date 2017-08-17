// @flow

import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Landing from 'components/Landing';
import './login.css';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
});

class Login extends Component {
    render() {
        const classes = this.props.classes;

        return (
            <Grid className={classes.root}>
                <Landing
                    icon="someIcon"
                    iconText="Authorize"
                    title="Componofy"
                    subTitle="by Daler Asrorov"
                    width={600}
                />
            </Grid>
        );
    }
}

export default withStyles(styles)(Login);
