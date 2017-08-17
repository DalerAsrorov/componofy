import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import FaSpotify from 'react-icons/lib/fa/spotify';
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
            <Grid container spacing={8} className="landing" justify="center">
                <Grid item xs={12}>
                    <Typography type="root" color="accent" component="h1">
                        {this.props.title}
                    </Typography>
                    <Typography type="gutterBottom" color="secondary" component="p">
                        {this.props.subTitle}
                    </Typography>
                    <Divider default className="subhead-div-hr" />
                </Grid>
                <Grid item xs={12}>
                    <Button raised color="primary">
                        <FaSpotify />
                        {this.props.iconText}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default Landing;
