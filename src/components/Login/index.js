import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import FaSpotify from 'react-icons/lib/fa/spotify';
import { replaceTo } from 'utils/helpers';
import Landing from 'components/Landing';

import './Login.css';

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

class Login extends PureComponent {
    static propTypes = {
        classes: PropTypes.object
    };

    _handleAuth = () => {
        replaceTo('/auth');
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container align="center" justify="center">
                <Grid item xs={12}>
                    <Landing
                        iconText="Authorize"
                        title="Componofy"
                        subTitle="Make a perfect playlist from a bunch of playlists"
                        width={600}
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
