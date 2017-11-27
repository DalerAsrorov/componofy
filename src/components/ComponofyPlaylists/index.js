import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { HotKeys } from 'react-hotkeys';
import Badge from 'material-ui/Badge';
import { MenuItem } from 'material-ui/Menu';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
import { PlaylistAddCheck, Audiotrack } from 'material-ui-icons';
import { Search as SearchIcon } from 'material-ui-icons';
import * as R from 'ramda';
import {
    MY_PLAYLISTS_PROPTYPE,
    LIGHT_BLUE_COLOR,
    MOST_LIGHT_BLUE_COLOR,
    searchKeyMap,
    footerStyle,
    searchStyle
} from '../../utils/constants';
import { filterSearchPlaylist, formatPlaylistsData } from '../../utils/helpers';
import FooterPanel from '../FooterPanel';
import List from '../List';
import Search from '../Search';

const styles = theme => ({
    loadmore: {
        width: '100%'
    },

    statsInfo: {
        width: '100%',
        lineHeight: '2.5',
        paddingLeft: `${theme.spacing.unit}px`
    },

    badgeCommon: {
        padding: `${theme.spacing.unit}px 0 0 ${theme.spacing.unit}px`,
        color: MOST_LIGHT_BLUE_COLOR
    }
});

class ComponofyPlaylists extends PureComponent {
    static propTypes = {
        numberOfTracksInFinalPlaylist: PropTypes.number.isRequired,
        numberOfFinalPlaylists: PropTypes.number.isRequired,
        setFinalPlaylistOpen: PropTypes.func.isRequired,
        finalPlaylists: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
        setNavIndex: PropTypes.func.isRequired,
        navigateTo: PropTypes.func.isRequired
    };

    _handleRemovePlaylist = (playlist, containsPlaylist) => {
        this.props.removePlaylistFromFinal(playlist);
    };

    _handleClickPlaylist = (id, isOpen) => {
        this.props.setFinalPlaylistOpen(id, !isOpen);
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
        const {
            finalPlaylists,
            numberOfFinalPlaylists,
            numberOfTracksInFinalPlaylist,
            classes
        } = this.props;
        const isNotEmpty = numberOfFinalPlaylists > 0;
        let playlistList, tracks;

        if (isNotEmpty) {
            const {
                playlists: {
                    entities: { playlists: playlistsMap, tracks: tracksMap }
                }
            } = finalPlaylists;

            const playlists = formatPlaylistsData(playlistsMap, tracksMap);

            playlistList = (
                <List
                    onClickMain={this._handleRemovePlaylist}
                    onClickItem={this._handleClickPlaylist}
                    items={playlists}
                    isPlaylist={true}
                />
            );
        }

        const menuItems = (
            <div>
                <MenuItem>Up</MenuItem>
                <MenuItem>Collapse</MenuItem>
                <Divider />
                <MenuItem>Next</MenuItem>
            </div>
        );

        const statsComponent = (
            <div className={classes.statsInfo}>
                <Badge
                    className={classes.badgeCommon}
                    badgeContent={numberOfFinalPlaylists}
                >
                    <PlaylistAddCheck />
                </Badge>
                <Badge
                    className={classes.badgeCommon}
                    badgeContent={numberOfTracksInFinalPlaylist}
                >
                    <Audiotrack />
                </Badge>
            </div>
        );

        return (
            <div id="finalPlaylists">
                {playlistList}
                <FooterPanel
                    shouldShowCircle={isNotEmpty}
                    menuItems={menuItems}
                    onClickOptions={() => {}}
                    onSelectItem={() => {}}
                    circleText={statsComponent}
                    onClick={() => {}}
                    isOpen={false}
                    mainText={'something'}
                    style={footerStyle}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ComponofyPlaylists);
