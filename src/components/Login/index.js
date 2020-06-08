import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FaSpotify from 'react-icons/lib/fa/spotify';
import { replaceTo } from '../../utils/helpers';
import Landing from '../Landing';

import './Login.css';

const styles = (theme) => ({
  root: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(30%)',
    margin: '0',
  },

  subRoot: {
    flex: 'inherit',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
});

class Login extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
  };

  _handleAuth = () => {
    replaceTo('/api/auth');
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid className={classes.root} container justify="center">
        <Grid item className={classes.subRoot}>
          <Landing
            appVersion="v2.0.0"
            iconText="Start"
            title="Componofy"
            subTitle="Make a perfect playlist from a bunch of playlists"
            onAuth={this._handleAuth}
          >
            <FaSpotify />
          </Landing>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
