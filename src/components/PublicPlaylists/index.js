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
    MY_PLAYLISTS_PROPTYPE,
    LOAD_MORE_STATUS,
    LIGHT_BLUE_COLOR,
    SCROLL_DURATION,
    searchKeyMap,
    footerStyle,
    searchStyle
} from '../../utils/constants';
import { filterSearchPlaylist } from '../../utils/helpers';
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
        setPublicPlaylistsVisited: PropTypes.func.isRequired,
        removePlaylistFromFinal: PropTypes.func.isRequired,
        setSearchResultsMessage: PropTypes.func.isRequired,
        setPublicPlaylistOpen: PropTypes.func.isRequired,
        searchPublicPlaylists: PropTypes.func.isRequired,
        setPublicSearchTerm: PropTypes.func.isRequired,
        addPlaylistToFinal: PropTypes.func.isRequired,
        publicPlaylists: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
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
            console.log('search featured/suggested playlists');
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

        const {
            searchPublicPlaylists,
            publicPlaylists: { currentOffset }
        } = this.props;

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

    _handleClickCollapse = () => {
        const {
            setOpenStatusPublicPlaylists,
            publicPlaylistsHasOpenPlaylist
        } = this.props;

        this._handleClickOption();
        setOpenStatusPublicPlaylists(!publicPlaylistsHasOpenPlaylist);
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
        const { publicPlaylists: { canLoadMore } } = nextProps;

        if (!canLoadMore) {
            this.setState({
                status: LOAD_MORE_STATUS[0]
            });
        }
    }

    render() {
        const { settingsIsOpen, canScrollUp, anchorEl, status } = this.state;
        const {
            publicPlaylists: {
                searchTerm,
                playlists,
                searchResultsMessage,
                canLoadMore,
                playlistsRemaining
            },
            publicPlaylistsHasOpenPlaylist,
            classes
        } = this.props;
        let listOfPlaylistsComponent, pageComponent;
        let collapseText = publicPlaylistsHasOpenPlaylist
            ? 'Collapse All'
            : 'Expand All';

        if (!R.isEmpty(playlists)) {
            listOfPlaylistsComponent = (
                <List
                    onClickMain={this._handleAddPlaylist}
                    onClickItem={this._handleClickPlaylist}
                    items={playlists}
                    subheader={searchResultsMessage}
                    isPlaylist={true}
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
                <Divider />
                <MenuItem onClick={this._handleClickNext}>Next</MenuItem>
            </div>
        );

        pageComponent = (
            <form
                onSubmit={this._handleSearchSubmit}
                name="playlistsSearchForm"
                className={classes.playlistsSearchForm}
            >
                <Search
                    onChange={this._handleInputChange}
                    inputId="publicPlaylistsSearch"
                    style={searchStyle}
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
                <FooterPanel
                    shouldShowCircle={canLoadMore}
                    mainButtonColor="accent"
                    onClickOptions={this._handleClickOptions}
                    onSelectItem={this._handleClickOption}
                    circleText={playlistCounter}
                    onClick={this._handleLoadMore}
                    isOpen={settingsIsOpen}
                    mainText={status}
                    anchorEl={anchorEl}
                    menuItems={menuItems}
                    style={footerStyle}
                />
            </form>
        );

        return pageComponent;
    }
}

export default withStyles(styles)(PublicPlaylists);
