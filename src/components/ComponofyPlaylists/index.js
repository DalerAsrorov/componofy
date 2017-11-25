import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { HotKeys } from 'react-hotkeys';
import { MenuItem } from 'material-ui/Menu';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
import { Search as SearchIcon } from 'material-ui-icons';
import { isEmpty, trim } from 'ramda';
import { MY_PLAYLISTS_PROPTYPE, searchKeyMap } from '../../utils/constants';
import { filterSearchPlaylist } from '../../utils/helpers';
import FooterPanel from '../FooterPanel';
import List from '../List';
import Search from '../Search';

const styles = theme => ({
    loadmore: {
        width: '100%'
    }
});

class ComponofyPlaylists extends PureComponent {
    static propTypes = {
        numberOfFinalPlaylists: PropTypes.number.isRequired,
        navigation: PropTypes.object.isRequired,
        setNavIndex: PropTypes.func.isRequired,
        navigateTo: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {
            navigateTo,
            setNavIndex,
            navigation,
            numberOfFinalPlaylists
        } = this.props;

        if (numberOfFinalPlaylists === 0) {
            const pageIndex = navigation.routeToIndexMap['/app'];

            setNavIndex(pageIndex);
            navigateTo(navigation.indexToRouteMap[pageIndex]);
        }
    }

    render() {
        return <h3>Hello World</h3>;
    }
}

export default withStyles(styles)(ComponofyPlaylists);
