import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { HotKeys } from 'react-hotkeys';
import { MenuItem } from 'material-ui/Menu';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Search as SearchIcon } from 'material-ui-icons';
import * as R from 'ramda';
import {
    PLAYLISTS_PROPTYPE,
    LOAD_MORE_STATUS,
    LIGHT_BLUE_COLOR,
    SCROLL_DURATION,
    OFFSET_LIMIT,
    menuButtonStyle,
    searchKeyMap
} from '../../utils/constants';
import FooterPanel from '../FooterPanel';
import List from '../List';
import Search from '../Search';

const styles = theme => ({
    hotKeys: {
        outline: 'none'
    },

    playlistRemaining: {
        textAlign: 'left',
        paddingLeft: `${theme.spacing.unit}px`,
        width: '100%'
    },

    searchAdortment: {
        position: 'relative',
        top: `${theme.spacing.unit / 2}px`,
        marginRight: `${theme.spacing.unit}px`,
        color: LIGHT_BLUE_COLOR
    }
});

let scroll = Scroll.animateScroll;

class PublicPlaylists extends PureComponent {
    static propTypes = {
        publicPlaylistsHasOpenPlaylist: PropTypes.bool.isRequired,
        setOpenStatusPublicPlaylists: PropTypes.func.isRequired,
        setOpenStatusForAllPlaylists: PropTypes.func.isRequired,
        setPublicPlaylistsVisited: PropTypes.func.isRequired,
        removePlaylistFromFinal: PropTypes.func.isRequired,
        setSearchResultsMessage: PropTypes.func.isRequired,
        setPublicPlaylistOpen: PropTypes.func.isRequired,
        searchPublicPlaylists: PropTypes.func.isRequired,
        setPublicSearchTerm: PropTypes.func.isRequired,
        publicPlaylists: PLAYLISTS_PROPTYPE.isRequired,
        addPlaylistToFinal: PropTypes.func.isRequired,
        logOutUser: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        menuButtonStyle: PropTypes.object
    };

    state = {
        settingsIsOpen: false,
        status: LOAD_MORE_STATUS[1],
        canScrollUp: false,
        anchorEl: null
    };

    _handleClickUp = () => {
        this._handleClickOption();

        scroll.scrollToTop({
            duration: SCROLL_DURATION
        });
    };

    _handleFocusOnSearch = event => {
        event.preventDefault();
        this.searchInputRef.focus();
    };

    _handleInputChange = event => {
        let { value: inputValue } = event.target;

        this.props.setPublicSearchTerm(inputValue);
    };

    _handleSearchSubmit = event => {
        const { publicPlaylists: { searchTerm } } = this.props;
        event.preventDefault();

        if (R.isEmpty(searchTerm)) {
            console.log('TODO::search featured/suggested playlists');
        } else {
            this.props.searchPublicPlaylists();
        }
    };

    _handleClickPlaylist = (id, isOpen) => {
        this.props.setPublicPlaylistOpen(id, !isOpen);
    };

    _handleAddPlaylist = (playlist, containsPlaylist) => {
        if (!containsPlaylist) {
            return this.props.addPlaylistToFinal(playlist);
        }

        return this.props.removePlaylistFromFinal(playlist);
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

    _handleLoadMore = event => {
        event.preventDefault();

        const { searchPublicPlaylists } = this.props;

        searchPublicPlaylists(true);
        scroll.scrollToBottom();
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
            publicPlaylistsHasOpenPlaylist,
            setOpenStatusPublicPlaylists
        } = this.props;

        this._handleClickOption();
        setOpenStatusPublicPlaylists(!publicPlaylistsHasOpenPlaylist);
    };

    _handleFocusOnSearch = event => {
        event.preventDefault();
        this.searchInputRef.focus();
    };

    _handleCanScrollUp = canScrollUp => {
        const { publicPlaylists: { playlists } } = this.props;
        const nPlaylists = playlists.length;

        if (canScrollUp && nPlaylists < OFFSET_LIMIT) {
            canScrollUp = false;
        }

        this.setState({
            canScrollUp
        });
    };

    componentDidMount() {
        const {
            publicPlaylists: { isVisited },
            setPublicPlaylistsVisited
        } = this.props;

        if (!isVisited) {
            setPublicPlaylistsVisited();
        }
    }

    componentWillReceiveProps(nextProps) {
        let { publicPlaylists: { canLoadMore, isFetching } } = nextProps;
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
        const { settingsIsOpen, canScrollUp, anchorEl, status } = this.state;
        const {
            publicPlaylists: {
                searchTerm,
                playlists,
                searchResultsMessage,
                canLoadMore,
                isFetching,
                playlistsRemaining,
                areAllOpen
            },
            publicPlaylistsHasOpenPlaylist,
            classes
        } = this.props;
        const loadMoreButtonIsEnabled =
            canLoadMore && !isFetching && !R.isEmpty(playlists);
        const collapseText = publicPlaylistsHasOpenPlaylist
            ? 'Collapse All'
            : 'Expand All';
        let listOfPlaylistsComponent, pageComponent;
        let hasPlaylists = !R.isEmpty(playlists);

        if (hasPlaylists) {
            listOfPlaylistsComponent = (
                <List
                    onClickMain={this._handleAddPlaylist}
                    onClickItem={this._handleClickPlaylist}
                    items={playlists}
                    subheader={searchResultsMessage}
                    isPlaylist={true}
                    collapseHasFixedHeight={!areAllOpen}
                    shouldShowTracksIncludedValue={true}
                />
            );
        }

        const playlistCounter = (
            <div className={classes.playlistRemaining}>
                {playlistsRemaining}
            </div>
        );

        const menuItems = (
            <div>
                <MenuItem disabled={!canScrollUp} onClick={this._handleClickUp}>
                    Up
                </MenuItem>
                <MenuItem onClick={this._handleClickCollapse}>
                    {collapseText}
                </MenuItem>
                <MenuItem onClick={this._handleLogOut}>Log Out</MenuItem>
                <Divider />
                <MenuItem onClick={this._handleClickNext}>Next</MenuItem>
            </div>
        );

        const serachHandlers = {
            focusSearch: this._handleFocusOnSearch
        };

        pageComponent = (
            <HotKeys
                keyMap={searchKeyMap}
                handlers={serachHandlers}
                className={classes.hotKeys}
            >
                <div id="publicPlaylists">
                    <form
                        onSubmit={this._handleSearchSubmit}
                        name="playlistsSearchForm"
                        className={classes.playlistsSearchForm}
                    >
                        <Waypoint
                            onEnter={() => {
                                this._handleCanScrollUp(false);
                            }}
                        />
                        <Search
                            onChange={this._handleInputChange}
                            inputId="publicPlaylistsSearch"
                            value={searchTerm}
                            startAdornment={
                                <SearchIcon
                                    onClick={this._handleFocusOnSearch}
                                    className={classes.searchAdortment}
                                />
                            }
                            placeholder="Search public playlists by artists, type, mood..."
                            inputRef={input => {
                                this.searchInputRef = input;
                            }}
                            autoComplete="off"
                            autoFocus
                        />
                        {listOfPlaylistsComponent}
                        <Waypoint
                            onEnter={() => {
                                this._handleCanScrollUp(true);
                            }}
                        />
                        <FooterPanel
                            shouldHideShowButton={!hasPlaylists}
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
                    </form>
                </div>
            </HotKeys>
        );

        return pageComponent;
    }
}

export default withStyles(styles)(PublicPlaylists);
