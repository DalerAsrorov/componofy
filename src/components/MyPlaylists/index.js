import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Scroll from 'react-scroll';
import { MenuItem } from 'material-ui/Menu';
import { Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Search as SearchIcon } from 'material-ui-icons';
import { MY_PLAYLISTS_PROPTYPE } from '../../utils/constants';
import FooterPanel from '../FooterPanel';
import List from '../List';
import Search from '../Search';

const LIMIT = 10;

const styles = theme => ({
    loadmore: {
        width: '100%'
    },

    searchAdortment: {
        position: 'relative',
        top: `${theme.spacing.unit / 2}px`,
        marginRight: `${theme.spacing.unit}px`
    },

    footerPanel: {}
});

const SCROLL_DURATION = 500;
const STATUS = {
    // There is no tracks to load
    0: 'All playlists loaded',
    // There is more tracks to load
    1: 'Load more'
};

let scroll = Scroll.animateScroll;
const footerStyle = {
    position: 'sticky',
    bottom: '0'
};
const searchStyle = {
    position: 'sticky',
    top: '0',
    zIndex: '100'
};

class MyPlaylists extends PureComponent {
    static propTypes = {
        setOpenStatusMyPlaylists: PropTypes.func.isRequired,
        removePlaylistFromFinal: PropTypes.func.isRequired,
        myPlaylists: MY_PLAYLISTS_PROPTYPE.isRequired,
        addPlaylistToFinal: PropTypes.func.isRequired,
        fetchMyPlaylists: PropTypes.func.isRequired,
        setMySearchTerm: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
    };

    state = {
        settingsIsOpen: false,
        status: STATUS[1],
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

        if (canScrollUp && nTracks < LIMIT) {
            canScrollUp = false;
        }

        this.setState({
            canScrollUp
        });
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

    _handleAdd = () => {};

    _handleClickCollapse = () => {
        this._handleClickOption();
        this.props.setOpenStatusMyPlaylists();
    };

    _handleInputChange = event => {
        this.props.setMySearchTerm(event.target.value);
    };

    componentDidMount() {
        let { currentOffset } = this.state;
        const {
            fetchMyPlaylists,
            setMyPlaylistVisited,
            myPlaylists: { isVisited }
        } = this.props;

        if (!isVisited) {
            fetchMyPlaylists(currentOffset);
            setMyPlaylistVisited(true);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { myPlaylists: { canLoadMore } } = nextProps;

        if (!canLoadMore) {
            this.setState({
                status: STATUS[0]
            });
        }
    }

    render() {
        let {
            myPlaylists: {
                playlistsRemaining,
                canLoadMore,
                searchTerm,
                playlists
            },
            classes
        } = this.props;
        const { status, settingsIsOpen, anchorEl, canScrollUp } = this.state;
        playlistsRemaining =
            playlistsRemaining !== 0 ? playlistsRemaining : null;

        const menuItems = (
            <div>
                <MenuItem disabled={!canScrollUp} onClick={this._handleClickUp}>
                    Up
                </MenuItem>
                <MenuItem onClick={this._handleClickCollapse}>
                    Collapse
                </MenuItem>
                <Divider />
                <MenuItem onClick={this._handleClickNext}>Next</MenuItem>
            </div>
        );

        const ListOfMyPlaylists = (
            <List
                onClickMain={this._handleAddPlaylist}
                items={playlists}
                isPlaylist={true}
            />
        );

        return (
            <div id="myPlaylists">
                <Search
                    onChange={this._handleInputChange}
                    inputId="myPlaylistsSearch"
                    style={searchStyle}
                    value={searchTerm}
                    startAdornment={
                        <SearchIcon className={classes.searchAdortment} />
                    }
                    placeholder="Search by artists, songs, albums..."
                    autoFocus
                />
                <Waypoint
                    onEnter={() => {
                        this._handleCanScrollUp(false);
                    }}
                />
                {ListOfMyPlaylists}
                <Waypoint
                    onEnter={() => {
                        this._handleCanScrollUp(true);
                    }}
                />
                <FooterPanel
                    shouldShowCircle={canLoadMore}
                    onClickOptions={this._handleClickOptions}
                    onSelectItem={this._handleClickOption}
                    circleText={playlistsRemaining}
                    onClick={this._handleLoadMore}
                    isOpen={settingsIsOpen}
                    mainText={status}
                    anchorEl={anchorEl}
                    menuItems={menuItems}
                    style={footerStyle}
                />
            </div>
        );
    }
}

export default withStyles(styles)(MyPlaylists);
