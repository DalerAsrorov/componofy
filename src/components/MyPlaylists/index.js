import {
  Divider,
  MenuItem,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { isEmpty, trim } from 'ramda';
import React, { PureComponent } from 'react';
import { HotKeys } from 'react-hotkeys';
import Scroll from 'react-scroll';
import { Waypoint } from 'react-waypoint';
import {
  LOAD_MORE_STATUS,
  OFFSET_LIMIT,
  PLAYLISTS_PROPTYPE,
  SCROLL_DURATION,
  searchKeyMap,
} from '../../utils/constants';
import {
  filterSearchPlaylist,
  getExpandStatusText,
  toTop,
} from '../../utils/helpers';
import FooterPanel from '../FooterPanel';
import { List } from '../List';
import Search from '../Search';
import Loader from '../Loader';

const styles = (theme) => ({
  loadmore: {
    width: '100%',
  },

  hotKeys: {
    outline: 'none',
  },

  playlistRemaining: {
    textAlign: 'left',
    paddingLeft: `${theme.spacing(1)}px`,
    width: '100%',
  },

  footerPanel: {},
});

let scroll = Scroll.animateScroll;

class MyPlaylists extends PureComponent {
  static propTypes = {
    startPlaylistTracksReorderProcess: PropTypes.func.isRequired,
    setOpenStatusForAllPlaylists: PropTypes.func.isRequired,
    myPlaylistsHasOpenPlaylist: PropTypes.bool.isRequired,
    generateSuggestedPlaylists: PropTypes.func.isRequired,
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
  };

  state = {
    settingsIsOpen: false,
    shouldFilterList: false,
    status: LOAD_MORE_STATUS[1],
    canScrollUp: false,
    anchorEl: null,
  };

  _handleLoadMore = (event) => {
    event.preventDefault();

    const {
      fetchMyPlaylists,
      myPlaylists: { currentOffset },
    } = this.props;

    fetchMyPlaylists(currentOffset);
    scroll.scrollToBottom();
  };

  _handleClickOptions = (event) => {
    this.setState({
      settingsIsOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  _handleCloseSettings = () => {
    this.setState({
      settingsIsOpen: false,
    });
  };

  _handleClickOption = () => {
    this.setState({
      settingsIsOpen: false,
    });
  };

  _handleCanScrollUp = (canScrollUp) => {
    const {
      myPlaylists: { playlists },
    } = this.props;
    const nTracks = playlists.length;

    if (canScrollUp && nTracks < OFFSET_LIMIT) {
      canScrollUp = false;
    }

    this.setState({
      canScrollUp,
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
      duration: SCROLL_DURATION,
    });
  };

  _handleLogOut = () => {
    const { logOutUser } = this.props;

    logOutUser();
  };

  _handleClickCollapse = () => {
    const { setOpenStatusMyPlaylists, myPlaylistsHasOpenPlaylist } = this.props;

    this._handleClickOption();
    setOpenStatusMyPlaylists(!myPlaylistsHasOpenPlaylist);
  };

  _handleInputChange = (event) => {
    let { value: inputValue } = event.target;
    let shouldFilterList = false;

    this.props.setMySearchTerm(inputValue);

    if (!isEmpty(trim(inputValue))) {
      shouldFilterList = true;
    }

    this.setState({
      shouldFilterList,
    });
  };

  _handleFocusOnSearch = (event) => {
    event.preventDefault();
    this.searchInputRef.focus();
  };

  _handlePlaylistTracksReorder = (playlistId, trackId, startPos, endPos) => {
    const { startPlaylistTracksReorderProcess } = this.props;
    startPlaylistTracksReorderProcess(playlistId, trackId, startPos, endPos);
  };

  componentWillMount() {
    toTop();

    const {
      myPlaylists: { currentOffset, isVisited },
      generateSuggestedPlaylists,
      fetchMyPlaylists,
      setMyPlaylistVisited,
    } = this.props;

    if (!isVisited) {
      fetchMyPlaylists(currentOffset);
      generateSuggestedPlaylists();
      setMyPlaylistVisited(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      myPlaylists: { canLoadMore, isFetching },
    } = nextProps;
    let status = LOAD_MORE_STATUS[1];

    if (isFetching) {
      status = LOAD_MORE_STATUS[2];
    } else if (!canLoadMore) {
      status = LOAD_MORE_STATUS[0];
    }

    this.setState({
      status,
    });
  }

  render() {
    const {
      status,
      settingsIsOpen,
      anchorEl,
      canScrollUp,
      shouldFilterList,
    } = this.state;
    let {
      myPlaylists: {
        isFetching: isFetchingPlaylists,
        playlistsRemaining,
        canLoadMore,
        areAllOpen,
        searchTerm,
        playlists,
      },
      myPlaylistsHasOpenPlaylist,
      classes,
    } = this.props;
    const loadMoreButtonIsEnabled =
      canLoadMore && !isFetchingPlaylists && !isEmpty(playlists);
    const shouldShowLoader = isFetchingPlaylists && isEmpty(playlists);

    if (shouldFilterList) {
      playlists = filterSearchPlaylist(searchTerm, playlists);
    }

    return (
      <HotKeys
        id="myPlaylists"
        keyMap={searchKeyMap}
        handlers={{
          focusSearch: this._handleFocusOnSearch,
        }}
        className={classes.hotKeys}
      >
        <Search
          onChange={this._handleInputChange}
          onSearchIconClick={this._handleFocusOnSearch}
          inputId="myPlaylistsSearch"
          value={searchTerm}
          placeholder="Search by artists, songs, albums..."
          inputRef={(input) => {
            this.searchInputRef = input;
          }}
          autoFocus
        />
        <Waypoint
          onEnter={() => {
            this._handleCanScrollUp(false);
          }}
        />
        {shouldShowLoader ? (
          <div style={{ display: 'flex' }}>
            <Loader
              text={
                <Typography variant="h6" color="textSecondary">
                  Loading your playlists...
                </Typography>
              }
              icon={<CircularProgress thickness={7} />}
              square={true}
            />
          </div>
        ) : (
          <List
            onClickMain={this._handleAddPlaylist}
            onClickItem={this._handleClickPlaylist}
            items={playlists}
            isPlaylist={true}
            onDragAndDrop={this._handlePlaylistTracksReorder}
            collapseHasFixedHeight={!areAllOpen}
            shouldShowTracksIncludedValue={true}
          />
        )}
        <Waypoint
          onEnter={() => {
            this._handleCanScrollUp(true);
          }}
        />
        <FooterPanel
          onClickOptions={this._handleClickOptions}
          onCloseSettings={this._handleCloseSettings}
          onSelectItem={this._handleClickOption}
          onClickMainLeftSideButton={this._handleLoadMore}
          shouldShowCircle={loadMoreButtonIsEnabled}
          circleComponent={
            <div className={classes.playlistRemaining}>
              {playlistsRemaining}
            </div>
          }
          isOpen={settingsIsOpen}
          leftSideButtonText={status}
          anchorEl={anchorEl}
          menuItems={
            <div>
              <MenuItem disabled={!canScrollUp} onClick={this._handleClickUp}>
                Up
              </MenuItem>
              <MenuItem onClick={this._handleClickCollapse}>
                {getExpandStatusText(myPlaylistsHasOpenPlaylist)}
              </MenuItem>
              <Divider />
              <MenuItem onClick={this._handleLogOut}>Log Out</MenuItem>
            </div>
          }
        />
      </HotKeys>
    );
  }
}

export default withStyles(styles)(MyPlaylists);
