import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { HotKeys } from 'react-hotkeys';
import { MenuItem } from 'material-ui/Menu';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Search as SearchIcon } from 'material-ui-icons';
import { isEmpty, trim } from 'ramda';
import {
    PLAYLISTS_PROPTYPE,
    LIGHT_BLUE_COLOR,
    SCROLL_DURATION,
    searchKeyMap,
    menuButtonStyle,
    OFFSET_LIMIT,
    LOAD_MORE_STATUS
} from '../../utils/constants';
import { filterSearchPlaylist, toTop } from '../../utils/helpers';
import FooterPanel from '../FooterPanel';
import List from '../List';
import Search from '../Search';

const styles = theme => ({
    loadmore: {
        width: '100%'
    },

    searchAdortment: {
        position: 'relative',
        top: `${theme.spacing.unit / 2}px`,
        marginRight: `${theme.spacing.unit}px`,
        color: LIGHT_BLUE_COLOR
    },

    hotKeys: {
        outline: 'none'
    },

    playlistRemaining: {
        textAlign: 'left',
        paddingLeft: `${theme.spacing.unit}px`,
        width: '100%'
    },

    footerPanel: {}
});

let scroll = Scroll.animateScroll;

class MyPlaylists extends PureComponent {
    static propTypes = {
        startPlaylistTracksReorderProcess: PropTypes.func.isRequired,
        setOpenStatusForAllPlaylists: PropTypes.func.isRequired,
        myPlaylistsHasOpenPlaylist: PropTypes.bool.isRequired,
        setOpenStatusMyPlaylists: PropTypes.func.isRequired,
        removePlaylistFromFinal: PropTypes.func.isRequired,
        reorderPlaylistTracks: PropTypes.func.isRequired,
        setPlaylistDragStatus: PropTypes.func.isRequired,
        addPlaylistToFinal: PropTypes.func.isRequired,
        fetchMyPlaylists: PropTypes.func.isRequired,
        myPlaylists: PLAYLISTS_PROPTYPE.isRequired,
        setPlaylistOpen: PropTypes.func.isRequired,
        setMySearchTerm: PropTypes.func.isRequired,
        addErrorToApp: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        logOutUser: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        menuButtonStyle: PropTypes.object
    };

    state = {
        settingsIsOpen: false,
        shouldFilterList: false,
        status: LOAD_MORE_STATUS[1],
        canScrollUp: false,
        anchorEl: null
    };

    _handleLoadMore = event => {
        event.preventDefault();

        const { fetchMyPlaylists, myPlaylists: { currentOffset } } = this.props;

        fetchMyPlaylists(currentOffset);
        scroll.scrollToBottom();
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
        const { myPlaylists: { playlists } } = this.props;
        const nTracks = playlists.length;

        if (canScrollUp && nTracks < OFFSET_LIMIT) {
            canScrollUp = false;
        }

        this.setState({
            canScrollUp
        });
    };

    _handleClickPlaylist = (id, isOpen) => {
        this.props.setPlaylistOpen(id, !isOpen);
    };

    _handleAddPlaylist = (playlist, containsPlaylist) => {
        if (!containsPlaylist) {
            return this.props.addPlaylistToFinal(playlist);
        }

        return this.props.removePlaylistFromFinal(playlist);
    };

    _handleClickUp = () => {
        this._handleClickOption();

        scroll.scrollToTop({
            duration: SCROLL_DURATION
        });
    };

    _handleClickNext = () => {
        const {
            setNavIndex,
            navigateTo,
            navigation: { nextPage, nextIndex }
        } = this.props;

        setNavIndex(nextIndex);
        navigateTo(nextPage);
    };

    _handleLogOut = () => {
        const { logOutUser } = this.props;

        logOutUser();
    };

    _handleClickCollapse = () => {
        const {
            setOpenStatusMyPlaylists,
            myPlaylistsHasOpenPlaylist
        } = this.props;

        this._handleClickOption();
        setOpenStatusMyPlaylists(!myPlaylistsHasOpenPlaylist);
    };

    _handleInputChange = event => {
        let { value: inputValue } = event.target;
        let shouldFilterList = false;

        this.props.setMySearchTerm(inputValue);

        if (!isEmpty(trim(inputValue))) {
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

    _handlePlaylistTracksReorder = (playlistId, trackId, startPos, endPos) => {
        const { startPlaylistTracksReorderProcess } = this.props;
        startPlaylistTracksReorderProcess(
            playlistId,
            trackId,
            startPos,
            endPos
        );
    };

    componentDidMount() {
        toTop();

        const {
            myPlaylists: { currentOffset, isVisited },
            setMyPlaylistVisited,
            fetchMyPlaylists
        } = this.props;

        if (!isVisited) {
            fetchMyPlaylists(currentOffset);
            setMyPlaylistVisited(true);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { myPlaylists: { canLoadMore, isFetching } } = nextProps;
        let status = LOAD_MORE_STATUS[1];

        if (isFetching) {
            status = LOAD_MORE_STATUS[2];
        } else if (!canLoadMore) {
            status = LOAD_MORE_STATUS[0];
        }

        this.setState({
            status
        });
    }

    render() {
        const {
            status,
            settingsIsOpen,
            anchorEl,
            canScrollUp,
            shouldFilterList
        } = this.state;
        let {
            myPlaylists: {
                playlistsRemaining,
                canLoadMore,
                areAllOpen,
                isFetching,
                searchTerm,
                playlists
            },
            myPlaylistsHasOpenPlaylist,
            classes
        } = this.props;
        const loadMoreButtonIsEnabled =
            canLoadMore && !isFetching && !isEmpty(playlists);

        let collapseText = myPlaylistsHasOpenPlaylist
            ? 'Collapse All'
            : 'Expand All';
        playlistsRemaining =
            playlistsRemaining !== 0 ? playlistsRemaining : null;

        if (shouldFilterList) {
            playlists = filterSearchPlaylist(searchTerm, playlists);
        }

        const menuItems = (
            <div>
                <MenuItem disabled={!canScrollUp} onClick={this._handleClickUp}>
                    Up
                </MenuItem>
                <MenuItem onClick={this._handleClickCollapse}>
                    {collapseText}
                </MenuItem>
                <MenuItem onClick={this._handleClickNext}>Next</MenuItem>
                <Divider />
                <MenuItem onClick={this._handleLogOut}>Log Out</MenuItem>
            </div>
        );

        const playlistCounter = (
            <div className={classes.playlistRemaining}>
                {playlistsRemaining}
            </div>
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
                <div id="myPlaylists">
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
                    <Waypoint
                        onEnter={() => {
                            this._handleCanScrollUp(false);
                        }}
                    />
                    <List
                        onClickMain={this._handleAddPlaylist}
                        onClickItem={this._handleClickPlaylist}
                        items={playlists}
                        isPlaylist={true}
                        onDragAndDrop={this._handlePlaylistTracksReorder}
                        collapseHasFixedHeight={!areAllOpen}
                        shouldShowTracksIncludedValue={true}
                    />
                    <Waypoint
                        onEnter={() => {
                            this._handleCanScrollUp(true);
                        }}
                    />
                    <FooterPanel
                        shouldShowCircle={loadMoreButtonIsEnabled}
                        mainButtonColor="accent"
                        onClickOptions={this._handleClickOptions}
                        onSelectItem={this._handleClickOption}
                        circleText={playlistCounter}
                        onClick={this._handleLoadMore}
                        isOpen={settingsIsOpen}
                        mainText={status}
                        anchorEl={anchorEl}
                        menuItems={menuItems}
                        menuButtonStyle={menuButtonStyle}
                    />
                </div>
            </HotKeys>
        );
    }
}

export default withStyles(styles)(MyPlaylists);
