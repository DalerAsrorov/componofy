import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router';
import ComponofyPlaylists from '../../containers/ComponofyPlaylists';
import MyPlaylists from '../../containers/MyPlaylists';
import Nav from '../../containers/Nav';
import PublicPlaylists from '../../containers/PublicPlaylists';

import './Main.css';

const styles = (theme) => ({
  root: {
    // Fix for the extra space created
    // after track preview is being rendered
    // on the page
    flexDirection: 'initial',
  },
});

const Main = ({ classes, match: { url } }) => {
  let gridClasses = classNames(classes.root, 'main');

  return (
    <Container maxWidth="lg">
      <Grid className={gridClasses}>
        <Grid item xs={12}>
          <Nav />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            paddingTop: '0',
            paddingBottom: '0',
          }}
        >
          <Route exact path={`${url}`} component={MyPlaylists} />
          <Route path={`${url}/public`} component={PublicPlaylists} />
          <Route path={`${url}/componofy`} component={ComponofyPlaylists} />
        </Grid>
      </Grid>
    </Container>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
