import React from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import PublicPlaylists from '../PublicPlaylists';
import Nav from '../../containers/Nav';
import MyPlaylists from '../../containers/MyPlaylists';
import ComponofyPlaylists from '../../containers/ComponofyPlaylists';

import './Main.css';

const styles = theme => ({
    root: {
        // Fix for the extra space created
        // after track preview is being rendered
        // on the page
        flexDirection: 'initial'
    }
});

const Main = ({ classes, match: { url } }) => {
    let gridClasses = classNames(classes.root, 'main');

    return (
        <Grid
            container
            direction="column"
            justify="center"
            className={gridClasses}
        >
            <Grid item xs={12}>
                <Nav />
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    paddingTop: '0',
                    paddingBottom: '0'
                }}
            >
                <Route exact path={`${url}`} component={MyPlaylists} />
                <Route path={`${url}/public`} component={PublicPlaylists} />
                <Route
                    path={`${url}/componofy`}
                    component={ComponofyPlaylists}
                />
            </Grid>
        </Grid>
    );
};

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
