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
    LIGHT_CYAN_COLOR,
    searchKeyMap,
    footerStyle,
    searchStyle
} from '../../utils/constants';
import { filterSearchPlaylist, formatPlaylistsData } from '../../utils/helpers';
import FooterPanel from '../FooterPanel';
import List from '../List';
import Search from '../Search';

const mainButtonStyle = {
    background: LIGHT_CYAN_COLOR
};

const styles = theme => ({
    badgeCommon: {
        padding: `${theme.spacing.unit}px 0 0 ${theme.spacing.unit}px`,
        color: MOST_LIGHT_BLUE_COLOR
    },

    loadmore: {
        width: '100%'
    },

    mainButtonText: {
        color: MOST_LIGHT_BLUE_COLOR
    },

    searchAdortment: {
        position: 'relative',
        top: `${theme.spacing.unit / 2}px`,
        marginRight: `${theme.spacing.unit}px`,
        color: LIGHT_BLUE_COLOR
    },

    statsInfo: {
        width: '100%',
        lineHeight: '2.5',
        paddingLeft: `${theme.spacing.unit}px`
    }
});

class ComponofyPlaylists extends PureComponent {
    state = {
        shouldFilterList: false
    };

    static propTypes = {
        numberOfTracksInFinalPlaylist: PropTypes.number.isRequired,
        numberOfFinalPlaylists: PropTypes.number.isRequired,
        setFinalPlaylistOpen: PropTypes.func.isRequired,
        setFinalSearchTerm: PropTypes.func.isRequired,
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

    _handleInputChange = event => {
        let { value: inputValue } = event.target;
        let shouldFilterList = false;

        this.props.setFinalSearchTerm(inputValue);

        if (!R.isEmpty(R.trim(inputValue))) {
            shouldFilterList = true;
        }

        this.setState({
            shouldFilterList
        });
    };

    _handleFocusOnSearch = event => {
        event.preventDefault();
        this.searchInputRef.focus();
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
            searchTerm,
            classes
        } = this.props;
        const isNotEmpty = numberOfFinalPlaylists > 0;
        let playlistList, search, tracks;

        if (isNotEmpty) {
            const {
                playlists: {
                    entities: { playlists: playlistsMap, tracks: tracksMap }
                },
                searchTerm
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

            search = (
                <Search
                    onChange={this._handleInputChange}
                    inputId="myPlaylistsSearch"
                    style={searchStyle}
                    value={searchTerm}
                    startAdornment={
                        <SearchIcon
                            onClick={this._handleFocusOnSearch}
                            className={classes.searchAdortment}
                        />
                    }
                    placeholder="Search by artists, songs, albums..."
                    inputRef={input => {
                        this.searchInputRef = input;
                    }}
                    autoFocus
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

        const mainText = (
            <span className={classes.mainButtonText}>Componofy!</span>
        );

        return (
            <div id="finalPlaylists">
                {search}
                {playlistList}
                <FooterPanel
                    shouldShowCircle={isNotEmpty}
                    mainButtonColor="primary"
                    menuItems={menuItems}
                    onClickOptions={() => {}}
                    onSelectItem={() => {}}
                    circleText={statsComponent}
                    onClick={() => {}}
                    isOpen={false}
                    mainText={mainText}
                    style={footerStyle}
                    mainButtonStyle={mainButtonStyle}
                />
            </div>
        );
    }
}

export default withStyles(styles)(ComponofyPlaylists);
