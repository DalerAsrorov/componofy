import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import FaSpotify from 'react-icons/lib/fa/spotify';
import './landing.css';

const styles = theme => ({
    root: {
        margin: 0,
        width: '100%',
        textAlign: 'center'
    },

    authBtn: {
        marginTop: '10px'
    }
});

class Landing extends Component {
    props: {
        icon: String,
        title: String,
        subTitle: String,
        iconText: String,
        classes: any
    };

    render() {
        const classes = this.props.classes;

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Typography type="display3" color="accent" component="h1">
                        {this.props.title}
                    </Typography>
                    <Typography className="sub-header" type="body1" color="secondary" component="p">
                        {this.props.subTitle}
                    </Typography>
                    <Divider default className="subhead-div-hr" />
                </Grid>
                <Grid item xs={12} className={classes.authBtn}>
                    <Button raised color="primary">
                        <FaSpotify />
                        {this.props.iconText}
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Landing);
