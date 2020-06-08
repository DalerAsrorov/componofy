import { Badge, Divider, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Audiotrack, PlaylistAddCheck } from '@material-ui/icons';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import React, { PureComponent } from 'react';
import { HotKeys } from 'react-hotkeys';
import Scroll from 'react-scroll';
import { Waypoint } from 'react-waypoint';
import Dialog from '../../containers/Dialog';
import {
  LIGHT_CYAN_COLOR,
  MAX_NUMBER_OF_TRACKS_FOR_BADGE,
  MOST_LIGHT_BLUE_COLOR,
  OFFSET_LIMIT,
  SCROLL_DURATION,
  searchKeyMap,
} from '../../utils/constants';
import {
  filterSearchPlaylist,
  formatPlaylistsData,
  getExpandStatusText,
} from '../../utils/helpers';
import FooterPanel from '../FooterPanel';
import { List } from '../List';
import Search from '../Search';

const mainButtonStyle = {
  background: LIGHT_CYAN_COLOR,
  width: '100%',
};

const buttonMenuStyle = {
  flex: '1',
  position: 'relative',
};

let scroll = Scroll.animateScroll;

const styles = (theme) => ({
  badgeCommon: {
    padding: `${theme.spacing(1)}px 0 0 ${theme.spacing(1)}px`,
    color: MOST_LIGHT_BLUE_COLOR,
  },

  loadmore: {
    width: '100%',
  },

  hotKeys: {
    outline: 'none',
  },

  mainButtonText: {
    color: MOST_LIGHT_BLUE_COLOR,
  },

  statsInfo: {
    width: '100%',
    lineHeight: '2.5',
    paddingLeft: `${theme.spacing(1)}px`,
  },

  tracklistBox: {
    margin: `${theme.spacing(1)}px 0`,
  },
});

class ComponofyPlaylists extends PureComponent {
  state = {
    shouldFilterList: false,
    isOpenModal: false,
    isCustomMenuOpen: false,
    settingsIsOpen: false,
    canScrollUp: false,
    anchorEl: null,
  };

  static propTypes = {
    numberOfTracksInFinalPlaylist: PropTypes.number.isRequired,
    numberOfFinalPlaylists: PropTypes.number.isRequired,
    finalPlaylistsHasOpenPlaylist: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    setOpenStatusForAllPlaylists: PropTypes.func.isRequired,
    fetchMyPlaylistsForSelection: PropTypes.func.isRequired,
    setOpenStatusFinalPlaylists: PropTypes.func.isRequired,
    setComponoformOpenStatus: PropTypes.func.isRequired,
    setFinalTracksShowStatus: PropTypes.func.isRequired,
    setFinalPlaylistOpen: PropTypes.func.isRequired,
    setFinalSearchTerm: PropTypes.func.isRequired,
    setComponofyMode: PropTypes.func.isRequired,
    setNavIndex: PropTypes.func.isRequired,
    logOutUser: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
  };

  _handleRemovePlaylist = (playlist, containsPlaylist) => {
    this.props.removePlaylistFromFinal(playlist);
  };

  _handleClickPlaylist = (id, isOpen) => {
    this.props.setFinalPlaylistOpen(id, !isOpen);
  };

  _handleInputChange = (event) => {
    let { value: inputValue } = event.target;
    let shouldFilterList = false;

    this.props.setFinalSearchTerm(inputValue);

    if (!R.isEmpty(R.trim(inputValue))) {
      shouldFilterList = true;
    }

    this.setState({
      shouldFilterList,
    });
  };

  _handleLogOut = () => {
    const { logOutUser } = this.props;

    logOutUser();
  };

  _handleClickCollapse = () => {
    const {
      setOpenStatusFinalPlaylists,
      finalPlaylistsHasOpenPlaylist,
    } = this.props;

    this._handleClickOption();
    setOpenStatusFinalPlaylists(!finalPlaylistsHasOpenPlaylist);
  };

  _handleFocusOnSearch = (event) => {
    event.preventDefault();
    this.searchInputRef.focus();
  };

  _handleClickOptions = (event) => {
    this.setState({
      settingsIsOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  _handleClickOption = () => {
    this.setState({
      settingsIsOpen: false,
    });
  };

  _handleCloseSettings = () => {
    this.setState({
      settingsIsOpen: false,
    });
  };

  _handleCanScrollUp = (canScrollUp) => {
    const nTracks = this.props.numberOfTracksInFinalPlaylist;

    if (canScrollUp && nTracks < OFFSET_LIMIT) {
      canScrollUp = false;
    }

    this.setState({
      canScrollUp,
    });
  };

  _handleComponofy = () => {
    const { setComponoformOpenStatus } = this.props;

    setComponoformOpenStatus(true);
    this._closeCustomMenu();
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
      duration: SCROLL_DURATION,
    });
  };

  _handleClickCloseModal = () => {
    this.setState({ isOpenModal: false });
  };

  _handleReturnToMain = () => {
    this.setState({
      isOpenModal: false,
    });

    this.props.navigateTo('/app');
    this.props.setNavIndex(0);
  };

  _closeCustomMenu = () => {
    this.setState({
      isCustomMenuOpen: false,
    });
  };

  _handleCustomMenuClick = (event) => {
    this.setState({
      isCustomMenuOpen: true,
      customMenuAnchorEl: event.currentTarget,
    });
  };

  _handleSelectShowTracksOnly = () => {
    this._handleClickOption();

    const { setFinalTracksShowStatus, shouldShowOnlyTracks } = this.props;

    setFinalTracksShowStatus(!shouldShowOnlyTracks);
  };

  componentDidMount() {
    const {
      navigateTo,
      setNavIndex,
      navigation,
      numberOfFinalPlaylists,
    } = this.props;

    if (numberOfFinalPlaylists === 0) {
      const pageIndex = navigation.routeToIndexMap['/app'];

      setNavIndex(pageIndex);
      navigateTo(navigation.indexToRouteMap[pageIndex]);
    }
  }

  render() {
    const {
      playlists: playlistsFinal,
      shouldShowOnlyTracks,
      searchTerm,
      hasChosenNewCreate,
      areAllOpen,
      numberOfFinalPlaylists,
      numberOfTracksInFinalPlaylist,
      finalPlaylistsHasOpenPlaylist,
      classes,
    } = this.props;
    const {
      anchorEl,
      shouldFilterList,
      isOpenModal,
      settingsIsOpen,
      isCustomMenuOpen,
      customMenuAnchorEl,
      canScrollUp,
    } = this.state;
    const isNotEmpty = numberOfFinalPlaylists > 0;
    let playlistList, playlists, search;
    let collapseExpandText = getExpandStatusText(finalPlaylistsHasOpenPlaylist);

    if (isNotEmpty) {
      const {
        entities: { playlists: playlistsMap, tracks: tracksMap },
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
          onSearchIconClick={this._handleFocusOnSearch}
          inputId="myPlaylistsSearch"
          value={searchTerm}
          placeholder="Search by artists, songs, albums..."
          inputRef={(input) => {
            this.searchInputRef = input;
          }}
          autoFocus
        />
      );
    }

    return (
      <HotKeys
        id="componofyPlaylists"
        keyMap={searchKeyMap}
        handlers={{
          focusSearch: this._handleFocusOnSearch,
        }}
        className={classes.hotKeys}
      >
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
          leftSideButtonText="Componofy"
          onClickOptions={this._handleClickOptions}
          onCloseSettings={this._handleCloseSettings}
          onSelectItem={this._handleClickOption}
          anchorEl={anchorEl}
          onClickMainLeftSideButton={this._handleCustomMenuClick}
          onCloseCustomMenu={this._closeCustomMenu}
          shouldShowCircle={isNotEmpty}
          customMenuAnchorEl={customMenuAnchorEl}
          isCustomMenuOpen={isCustomMenuOpen}
          circleComponent={
            <div id="componofyStatBadges" className={classes.statsInfo}>
              <Badge
                className={classes.badgeCommon}
                badgeContent={numberOfFinalPlaylists}
                max={MAX_NUMBER_OF_TRACKS_FOR_BADGE}
              >
                <PlaylistAddCheck />
              </Badge>
              <Badge
                className={classes.badgeCommon}
                badgeContent={numberOfTracksInFinalPlaylist}
                max={MAX_NUMBER_OF_TRACKS_FOR_BADGE}
              >
                <Audiotrack />
              </Badge>
            </div>
          }
          isOpen={settingsIsOpen}
          mainButtonStyle={mainButtonStyle}
          buttonMenuStyle={buttonMenuStyle}
          hasFullWidthButtonMenu={true}
          menuItems={
            <div id="settingsMenuContainer">
              <MenuItem disabled={!canScrollUp} onClick={this._handleClickUp}>
                Up
              </MenuItem>
              <MenuItem onClick={this._handleClickCollapse}>
                {collapseExpandText}
              </MenuItem>
              <MenuItem onClick={this._handleSelectShowTracksOnly}>
                {shouldShowOnlyTracks ? 'Hide' : 'View'}
              </MenuItem>
              <Divider />
              <MenuItem onClick={this._handleLogOut}>Log Out</MenuItem>
            </div>
          }
          customMenuItems={
            <div id="customSettingsMenuContainer">
              <MenuItem onClick={this._handleComponofyCreate}>
                Create New Playlist
              </MenuItem>
              <MenuItem onClick={this._handleComponofyExisting}>
                Add To Existing Playlist
              </MenuItem>
            </div>
          }
        />
        <Dialog
          onClickClose={this._handleClickCloseModal}
          isOpen={isOpenModal}
          switchLabel="Public"
          title="New Playlist Info"
          onReturnToMain={this._handleReturnToMain}
          isCreateMode={hasChosenNewCreate}
        />
      </HotKeys>
    );
  }
}

export default withStyles(styles)(ComponofyPlaylists);
