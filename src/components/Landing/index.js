import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { DEMO_YOUTUBE_LINK } from '../../utils/constants';

import './Landing.css';

const ELEVATION = 8;
const XS = 12;

const styles = (theme) => ({
  demoLinkWrapper: {
    marginTop: theme.spacing(2),
  },

  demoLink: {
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(1),
  },

  root: {
    margin: 0,
    width: '100%',
    padding: `${theme.spacing(6)}px ${theme.spacing(2)}px
        ${theme.spacing(6)}px ${theme.spacing(2)}px`,
    textAlign: 'center',
  },

  subheader: {
    fontStyle: 'italic',
  },

  authBtn: {
    marginTop: '25px',
  },

  icon: {
    color: '#7fc37f',
    fontSize: '2em',
    marginRight: '5px',
  },
});

class Landing extends PureComponent {
  static propTypes = {
    onAuth: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    children: PropTypes.object,
    iconText: PropTypes.string,
    classes: PropTypes.object,
  };

  _handleAuthentication = (event) => {
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
            <Typography variant="h2" color="secondary" component="h1">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.subheader}
              color="textSecondary"
            >
              {subTitle}
            </Typography>
            <Divider default className="subhead-div-hr" />
          </Grid>
          <Grid item xs={XS} className={classes.authBtn}>
            <Button
              onClick={this._handleAuthentication}
              color="primary"
              variant="outlined"
            >
              <span className={classes.icon}>{children}</span>
              <Typography variant="button" className={classes.iconText}>
                {iconText}
              </Typography>
            </Button>
            <div className={classes.demoLinkWrapper}>
              <Typography
                className={classes.demoLink}
                color="textSecondary"
                align="center"
                variant="overline"
                component="a"
                target="__blank"
                href={DEMO_YOUTUBE_LINK}
                gutterBottom
              >
                Watch Demo!
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Landing);
