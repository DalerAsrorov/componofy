import React from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PublicPlaylists from '../PublicPlaylists';
import Nav from '../../containers/Nav';
import MyPlaylists from '../../containers/MyPlaylists';

const styles = theme => ({
    root: {
        // Fix for the extra space created
        // after track preview is being rendered
        // on the page
        flexDirection: 'initial'
    }
});

const Main = ({ classes, match: { url } }) => {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            className={classes.root}
        >
            <Grid item xs={12}>
                <Nav />
            </Grid>
            <Grid item xs={12}>
                <Route exact path={`${url}`} component={MyPlaylists} />
                <Route path={`${url}/public`} component={PublicPlaylists} />
            </Grid>
        </Grid>
    );
};

Main.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
