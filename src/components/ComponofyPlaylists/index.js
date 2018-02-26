import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { HotKeys } from 'react-hotkeys';
import Badge from 'material-ui/Badge';
import { MenuItem } from 'material-ui/Menu';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Dialog from '../../containers/Dialog';
import { PlaylistAddCheck, Audiotrack } from 'material-ui-icons';
import { Search as SearchIcon } from 'material-ui-icons';
import * as R from 'ramda';
import {
    MOST_LIGHT_BLUE_COLOR,
    LIGHT_BLUE_COLOR,
    LIGHT_CYAN_COLOR,
    SCROLL_DURATION,
    searchKeyMap,
    menuButtonStyle
} from '../../utils/constants';
import { filterSearchPlaylist, formatPlaylistsData } from '../../utils/helpers';
import FooterPanel from '../FooterPanel';
import MaterialList, {
    ListItem,
    ListItemIcon,
    ListItemText
} from 'material-ui/List';
import List from '../List';
import Search from '../Search';

const mainButtonStyle = {
    background: LIGHT_CYAN_COLOR,
    width: '100%',
    height: '100%'
};

const buttonMenuStyle = {
    flex: '1',
    position: 'relative'
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
    },

    tracklistBox: {
        margin: `${theme.spacing.unit}px 0`
    }
});

class ComponofyPlaylists extends PureComponent {
    state = {
        shouldFilterList: false,
        isOpenModal: false,
        isCustomMenuOpen: false,
        settingsIsOpen: false,
        canScrollUp: false,
        anchorEl: null
    };

    static propTypes = {
        numberOfTracksInFinalPlaylist: PropTypes.number.isRequired,
        finalPlaylistsHasOpenPlaylist: PropTypes.bool.isRequired,
        setOpenStatusForAllPlaylists: PropTypes.func.isRequired,
        fetchMyPlaylistsForSelection: PropTypes.func.isRequired,
        setOpenStatusFinalPlaylists: PropTypes.func.isRequired,
        setComponoformOpenStatus: PropTypes.func.isRequired,
        numberOfFinalPlaylists: PropTypes.number.isRequired,
        setFinalTracksShowStatus: PropTypes.func.isRequired,
        setFinalPlaylistOpen: PropTypes.func.isRequired,
        setFinalSearchTerm: PropTypes.func.isRequired,
        finalPlaylists: PropTypes.object.isRequired,
        setComponofyMode: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        setNavIndex: PropTypes.func.isRequired,
        logOutUser: PropTypes.func.isRequired,
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

    _handleLogOut = () => {
        const { logOutUser } = this.props;

        logOutUser();
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
        const { setComponoformOpenStatus } = this.props;

        setComponoformOpenStatus(true);
        this._handleSelectCustomMenuItem();
        this.setState({ isOpenModal: true });
    };

    _handleComponofyCreate = () => {
        this.props.setComponofyMode(true);
        this._handleComponofy();
    };

    _handleComponofyExisting = () => {
        this.props.setComponofyMode(false);
        this._handleComponofy();
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

    _handleReturnToMain = () => {
        this.setState({
            isOpenModal: false
        });

        this.props.navigateTo('/app');
        this.props.setNavIndex(0);
    };

    _handleClickCustomMenuOptions = event => {
        this.setState({
            settingsIsOpen: true,
            anchorEl: event.currentTarget
        });
    };

    _handleSelectCustomMenuItem = () => {
        this.setState({
            isCustomMenuOpen: false
        });
    };

    _handleCustomMenuClick = event => {
        this.setState({
            isCustomMenuOpen: true,
            customMenuAnchorEl: event.currentTarget
        });
    };

    _handleSelectShowTracksOnly = () => {
        this._handleClickOption();

        const {
            setFinalTracksShowStatus,
            finalPlaylists: { shouldShowOnlyTracks }
        } = this.props;

        setFinalTracksShowStatus(!shouldShowOnlyTracks);
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
            finalPlaylists: {
                playlists: playlistsFinal,
                shouldShowOnlyTracks,
                searchTerm,
                hasChosenNewCreate,
                areAllOpen
            },
            numberOfFinalPlaylists,
            numberOfTracksInFinalPlaylist,
            finalPlaylistsHasOpenPlaylist,
            classes
        } = this.props;
        const {
            shouldFilterList,
            isOpenModal,
            settingsIsOpen,
            isCustomMenuOpen,
            customMenuAnchorEl,
            canScrollUp
        } = this.state;
        const isNotEmpty = numberOfFinalPlaylists > 0;
        let playlistList, playlists, search, dialog;
        let collapseExpandText = finalPlaylistsHasOpenPlaylist
            ? 'Collapse All'
            : 'Expand All';
        ``;
        if (isNotEmpty) {
            const {
                entities: { playlists: playlistsMap, tracks: tracksMap }
            } = playlistsFinal;

            playlists = formatPlaylistsData(playlistsMap, tracksMap);

            if (shouldFilterList) {
                playlists = filterSearchPlaylist(searchTerm, playlists);
            }

            playlistList = (
                <List
                    onClickMain={this._handleRemovePlaylist}
                    onClickItem={this._handleClickPlaylist}
                    items={playlists}
                    showSubItemsOnly={shouldShowOnlyTracks}
                    isPlaylist={true}
                    collapseHasFixedHeight={!areAllOpen}
                />
            );

            search = (
                <Search
                    onChange={this._handleInputChange}
                    inputId="myPlaylistsSearch"
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
                <MenuItem onClick={this._handleSelectShowTracksOnly}>
                    {shouldShowOnlyTracks ? 'Hide' : 'View'} Tracks
                </MenuItem>
                <Divider />
                <MenuItem onClick={this._handleLogOut}>Log Out</MenuItem>
            </div>
        );

        const customLeftMenu = (
            <div>
                <MenuItem onClick={this._handleComponofyCreate}>
                    Create New Playlist
                </MenuItem>
                <MenuItem onClick={this._handleComponofyExisting}>
                    Add To Existing Playlist
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
            <span className={classes.mainButtonText}>Componofy</span>
        );

        const serachHandlers = {
            focusSearch: this._handleFocusOnSearch
        };

        return (
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
                        customButtonMenu={customLeftMenu}
                        onClick={this._handleCustomMenuClick}
                        onSelectCustomMenuItem={
                            this._handleSelectCustomMenuItem
                        }
                        customMenuAnchorEl={customMenuAnchorEl}
                        isCustomMenuOpen={isCustomMenuOpen}
                        circleText={statsComponent}
                        isOpen={settingsIsOpen}
                        menuItems={menuItems}
                        mainText={mainText}
                        mainButtonStyle={mainButtonStyle}
                        buttonMenuStyle={buttonMenuStyle}
                        hasFullWidthButtonMenu={true}
                    />
                    <Dialog
                        onClickClose={this._handleClickCloseModal}
                        isOpen={isOpenModal}
                        switchLabel="Public"
                        title="New playlist info"
                        onReturnToMain={this._handleReturnToMain}
                        isCreateMode={hasChosenNewCreate}
                    />
                </div>
            </HotKeys>
        );
    }
}

export default withStyles(styles)(ComponofyPlaylists);
