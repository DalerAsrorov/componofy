import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { withStyles } from 'material-ui/styles';
import { MY_PLAYLISTS_PROPTYPE } from '../../utils/constants';
import FooterPanel from '../FooterPanel';
import List from '../List';

const styles = theme => ({
    loadmore: {
        width: '100%'
    }
});

class ComponofyPlaylists extends PureComponent {
    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        numberOfFinalPlaylists: PropTypes.number.isRequired
    };

    componentDidMount() {
        const { numberOfFinalPlaylists, navigateTo } = this.props;
    }

    render() {
        return <h3>Hello World</h3>;
    }
}

export default withStyles(styles)(ComponofyPlaylists);
