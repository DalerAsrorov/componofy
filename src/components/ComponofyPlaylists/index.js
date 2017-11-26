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
import * as R from 'ramda';
import { MY_PLAYLISTS_PROPTYPE, searchKeyMap } from '../../utils/constants';
import { filterSearchPlaylist, formatPlaylistsData } from '../../utils/helpers';
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
        finalPlaylists: PropTypes.object.isRequired,
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

        console.log(this.props);

        if (numberOfFinalPlaylists === 0) {
            const pageIndex = navigation.routeToIndexMap['/app'];

            setNavIndex(pageIndex);
            navigateTo(navigation.indexToRouteMap[pageIndex]);
        }
    }

    render() {
        const { finalPlaylists } = this.props;
        let playlists, tracks;

        if (!R.isEmpty(finalPlaylists.playlists)) {
            const {
                playlists: {
                    entities: { playlists: playlistsMap, tracks: tracksMap }
                }
            } = finalPlaylists;

            playlists = formatPlaylistsData(playlistsMap, tracksMap);
        }

        return <h1>h3llo</h1>;
    }
}

export default withStyles(styles)(ComponofyPlaylists);
