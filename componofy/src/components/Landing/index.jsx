import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import './landing.css';

class Landing extends Component {
    props: {
        icon: String,
        title: String,
        subTitle: String,
        iconText: String
    };

    render() {
        return (
            <Grid container spacing={0} className="landing" justify="center">
                <Grid item xs={12}>
                    <h1>
                        {this.props.title}
                    </h1>
                </Grid>
                <Grid item xs={12}>
                    <h5>
                        {this.props.subTitle}
                    </h5>
                    <Divider light />
                </Grid>
                <Grid item xs={12}>
                    <h1>
                        {this.props.icon}
                    </h1>
                    <h5>
                        {this.props.iconText}
                    </h5>
                </Grid>
            </Grid>
        );
    }
}

export default Landing;
