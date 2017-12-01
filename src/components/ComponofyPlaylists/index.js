import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { HotKeys } from 'react-hotkeys';
import Badge from 'material-ui/Badge';
import { MenuItem } from 'material-ui/Menu';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Dialog from '../Dialog';
import { lightBlue } from 'material-ui/colors';
import { PlaylistAddCheck, Audiotrack } from 'material-ui-icons';
import { Search as SearchIcon } from 'material-ui-icons';
import * as R from 'ramda';
import {
    MY_PLAYLISTS_PROPTYPE,
    MOST_LIGHT_BLUE_COLOR,
    LIGHT_BLUE_COLOR,
    LIGHT_CYAN_COLOR,
    SCROLL_DURATION,
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

let scroll = Scroll.animateScroll;

const styles = theme => ({
    badgeCommon: {
        padding: `${theme.spacing.unit}px 0 0 ${theme.spacing.unit}px`,
        color: MOST_LIGHT_BLUE_COLOR
    },

    loadmore: {
        width: '100%'
    },

    hotKeys: {
        outline: 'none'
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
        shouldFilterList: false,
        isOpenModal: false,
        settingsIsOpen: false,
        canScrollUp: false,
        anchorEl: null
    };

    static propTypes = {
        numberOfTracksInFinalPlaylist: PropTypes.number.isRequired,
        finalPlaylistsHasOpenPlaylist: PropTypes.bool.isRequired,
        setOpenStatusFinalPlaylists: PropTypes.func.isRequired,
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

    _handleClickCollapse = () => {
        const {
            setOpenStatusFinalPlaylists,
            finalPlaylistsHasOpenPlaylist
        } = this.props;

        this._handleClickOption();
        setOpenStatusFinalPlaylists(!finalPlaylistsHasOpenPlaylist);
    };

    _handleFocusOnSearch = event => {
        event.preventDefault();
        this.searchInputRef.focus();
    };

    _handleClickOptions = event => {
        this.setState({
            settingsIsOpen: true,
            anchorEl: event.currentTarget
        });
    };

    _handleClickOption = () => {
        this.setState({
            settingsIsOpen: false
        });
    };

    _handleCanScrollUp = canScrollUp => {
        canScrollUp =
            this.props.numberOfTracksInFinalPlaylist <= 5 ? false : canScrollUp;

        this.setState({
            canScrollUp
        });
    };

    _handleComponofy = () => {
        this.setState({ isOpenModal: true });
        // full screen dialog
        // create state for the modal form with redux
    };

    _handleClickUp = () => {
        this._handleClickOption();

        scroll.scrollToTop({
            duration: SCROLL_DURATION
        });
    };

    _handleClickCloseModal = () => {
        this.setState({ isOpenModal: false });
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
            finalPlaylistsHasOpenPlaylist,
            searchTerm,
            classes
        } = this.props;
        const {
            shouldFilterList,
            isOpenModal,
            settingsIsOpen,
            canScrollUp,
            anchorEl
        } = this.state;
        const isNotEmpty = numberOfFinalPlaylists > 0;
        let playlistList, search, tracks;
        let collapseExpandText = finalPlaylistsHasOpenPlaylist
            ? 'Collapse All'
            : 'Expand All';

        if (isNotEmpty) {
            const {
                playlists: {
                    entities: { playlists: playlistsMap, tracks: tracksMap }
                },
                searchTerm
            } = finalPlaylists;

            let playlists = formatPlaylistsData(playlistsMap, tracksMap);

            if (shouldFilterList) {
                playlists = filterSearchPlaylist(searchTerm, playlists);
            }

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
                <MenuItem disabled={!canScrollUp} onClick={this._handleClickUp}>
                    Up
                </MenuItem>
                <MenuItem onClick={this._handleClickCollapse}>
                    {collapseExpandText}
                </MenuItem>
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

        const serachHandlers = {
            focusSearch: this._handleFocusOnSearch
        };

        let pageComponent = (
            <HotKeys
                keyMap={searchKeyMap}
                handlers={serachHandlers}
                className={classes.hotKeys}
            >
                <div id="componofyPlaylists">
                    {search}
                    <Waypoint
                        onEnter={() => {
                            this._handleCanScrollUp(false);
                        }}
                    />
                    {playlistList}
                    <Waypoint
                        onEnter={() => {
                            this._handleCanScrollUp(true);
                        }}
                    />
                    <FooterPanel
                        shouldShowCircle={isNotEmpty}
                        mainButtonColor="primary"
                        onClickOptions={this._handleClickOptions}
                        onSelectItem={this._handleClickOption}
                        onClick={this._handleComponofy}
                        circleText={statsComponent}
                        isOpen={settingsIsOpen}
                        menuItems={menuItems}
                        mainText={mainText}
                        style={footerStyle}
                        mainButtonStyle={mainButtonStyle}
                    />
                    <Dialog
                        onClickClose={this._handleClickCloseModal}
                        isOpen={isOpenModal}
                        switchLabel="Public"
                        title="New playlist info"
                    />
                </div>
            </HotKeys>
        );

        return pageComponent;
    }
}

export default withStyles(styles)(ComponofyPlaylists);
