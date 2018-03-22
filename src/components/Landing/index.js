import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

import './Landing.css';

const ELEVATION = 8;
const XS = 12;

const styles = theme => ({
    root: {
        margin: 0,
        width: '100%',
        padding: '3.5em',
        textAlign: 'center'
    },

    authBtn: {
        marginTop: '25px'
    },

    icon: {
        color: '#7fc37f',
        fontSize: '2em',
        marginRight: '5px'
    },

    iconText: {}
});

class Landing extends PureComponent {
    static propTypes = {
        onAuth: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        subTitle: PropTypes.string.isRequired,
        children: PropTypes.object,
        iconText: PropTypes.string,
        classes: PropTypes.object
    };

    _handleAuthentication = (event: SyntheticInputEvent) => {
        const { onAuth } = this.props;

        if (onAuth) {
            onAuth();
        }
    };

    render() {
        const { title, subTitle, children, iconText, classes } = this.props;

        return (
            <Paper elevation={ELEVATION}>
                <Grid container className={classes.root}>
                    <Grid item xs={XS}>
                        <Typography
                            type="title"
                            color="textSecondary"
                            component="h1"
                        >
                            {title}
                        </Typography>
                        <Typography
                            className="sub-header"
                            type="body1"
                            color="secondary"
                            component="p"
                        >
                            {subTitle}
                        </Typography>
                        <Divider default className="subhead-div-hr" />
                    </Grid>
                    <Grid item xs={XS} className={classes.authBtn}>
                        <Button
                            onClick={this._handleAuthentication}
                            color="primary"
                            variant="raised"
                        >
                            <span className={classes.icon}>{children}</span>
                            <Typography
                                type="button"
                                color="inherit"
                                className={classes.iconText}
                            >
                                {iconText}
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(Landing);
