import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Element } from 'react-scroll';
import {
  Avatar,
  Badge,
  CircularProgress,
  Collapse,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import {
  PlaylistAdd,
  PlaylistAddCheck,
  LibraryMusic,
  FavoriteBorder,
  AccessTime,
} from '@material-ui/icons';
import classNames from 'classnames';
import * as R from 'ramda';
import {
  PLAYLIST_PROPTYPE,
  LIGHT_CYAN_COLOR,
  SUCCESS_COLOR,
  SUGGESTED_PLAYLIST_PLACEHOLDER,
} from '../../utils/constants';
import Expand from './Expand';
import TrackList from './TrackList';
import Loader from '../Loader';

import './Playlist.css';

const styles = (theme) => ({
  badgeSet: {},

  collapse: {
    maxHeight: '420px',
    overflowY: 'auto',
  },

  trackBadge: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing.unit / 4,
  },

  includedTracksBadge: {
    color: SUCCESS_COLOR,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit / 4,
    border: `1px solid ${SUCCESS_COLOR}`,
  },

  margin: {
    margin: theme.spacing.unit * 2,
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },

  playlistAvatar: {},

  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    color: LIGHT_CYAN_COLOR,
  },
});

class Playlist extends PureComponent {
  static propTypes = {
    containsThisPlaylist: PropTypes.bool.isRequired,
    onClickPlaylist: PropTypes.func.isRequired,
    playlist: PLAYLIST_PROPTYPE.isRequired,
    onClickIcon: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    numberOfAddedTracksFromThisPlaylist: PropTypes.number,
    shouldShowTracksIncludedValue: PropTypes.bool,
    collapseHasFixedHeight: PropTypes.bool,
    onDragAndDrop: PropTypes.func,
    showPlaylist: PropTypes.bool,
  };

  state = {
    isExpanded: false,
  };

  componentDidMount = () => {
    const {
      playlist: {
        id: playlistID,
        owner: { id: userId },
        isCustom,
      },
      fetchPlaylistTracks,
    } = this.props;

    if (!isCustom) {
      fetchPlaylistTracks(userId, playlistID);
    }
  };

  _handleExpandMore = (event) => {
    const { isExpanded } = this.state;

    this.setState({
      isExpanded: !isExpanded,
    });
  };

  _handleClick = (event) => {
    event.preventDefault();
    const {
      onClickPlaylist,
      playlist: { id, isOpen },
    } = this.props;

    onClickPlaylist(id, isOpen);
  };

  _handleIconClick = (event) => {
    event.stopPropagation();

    const { playlist, onClickIcon, containsThisPlaylist } = this.props;

    if (onClickIcon) {
      onClickIcon(playlist, containsThisPlaylist);
    }
  };

  _handleDragEnd = (result) => {
    const { onDragAndDrop } = this.props;

    // don't do anything if position is the same
    if (!result.destination) {
      return;
    }

    const {
      droppableId: trackId,
      source: { droppableId: playlistId, index: startPos } = {},
      destination: { index: endPos } = {},
    } = result;

    onDragAndDrop(playlistId, trackId, startPos, endPos);
  };

  render() {
    const { isExpanded } = this.state;
    const {
      playlist,
      containsThisPlaylist,
      classes,
      showTracksOnly,
      collapseHasFixedHeight,
      numberOfAddedTracksFromThisPlaylist,
      shouldShowTracksIncludedValue,
    } = this.props;
    const {
      tracks: { list: tracks },
      images: playlistImages,
      isOpen: playlistIsOpen,
    } = playlist;
    const nTracks = tracks ? tracks.length : <AccessTime />;
    let playlistClassName = classNames({ 'no-display': showTracksOnly });
    let isOpen = showTracksOnly ? true : playlistIsOpen;
    let playlistIconComponent = containsThisPlaylist ? (
      <PlaylistAddCheck />
    ) : (
      <PlaylistAdd />
    );
    let badgeForAddedTracks, expandButton;

    if (!tracks) {
      playlistIconComponent = <AccessTime />;
    }

    if (
      collapseHasFixedHeight &&
      tracks &&
      tracks.length > 4 &&
      !showTracksOnly
    ) {
      expandButton = (
        <Expand
          to={playlist.id}
          shouldSpy={true}
          isStickyBottom={true}
          showUpArrow={isExpanded}
          onClick={this._handleExpandMore}
          variant="raised"
        />
      );
    }

    if (numberOfAddedTracksFromThisPlaylist && shouldShowTracksIncludedValue) {
      badgeForAddedTracks = (
        <Badge
          badgeContent={numberOfAddedTracksFromThisPlaylist}
          className={classes.margin}
          classes={{
            badge: classes.includedTracksBadge,
          }}
        >
          <span />
        </Badge>
      );
    }

    let tracklist = tracks ? (
      <TrackList tracks={tracks} playlist={playlist} />
    ) : (
      <Loader
        text={
          <Typography variant="subheading" color="textSecondary">
            Loading tracks...
          </Typography>
        }
        icon={<CircularProgress thickness={7} className={classes.progress} />}
      />
    );

    let playlistImage = (
      <Avatar
        alt={`${playlist.name} playlist cover`}
        className={classes.playlistAvatar}
      >
        <LibraryMusic />
      </Avatar>
    );

    if (R.equals(playlist.id, SUGGESTED_PLAYLIST_PLACEHOLDER().id)) {
      playlistImage = (
        <Avatar
          alt={`${playlist.name} playlist cover`}
          style={{ backgroundColor: LIGHT_CYAN_COLOR }}
          className={classes.playlistAvatar}
        >
          <FavoriteBorder />
        </Avatar>
      );
    } else if (!R.isEmpty(playlistImages)) {
      const avatar = R.head(playlistImages);
      playlistImage = (
        <Avatar
          src={avatar.url}
          alt={`${playlist.name} playlist cover`}
          className={classes.playlistAvatar}
        />
      );
    }

    return (
      <div>
        <ListItem
          onClick={this._handleClick}
          disabled={R.isEmpty(tracks)}
          className={playlistClassName}
          button
          divider
        >
          <ListItemIcon
            className="playlist-icon"
            onClick={this._handleIconClick}
          >
            <Element id={`element-playlist-${playlist.id}`} name={playlist.id}>
              {playlistIconComponent}
            </Element>
          </ListItemIcon>
          {playlistImage}
          <ListItemText inset primary={playlist.name} />
          <div className={classes.badgeSet}>
            {badgeForAddedTracks}
            <Badge
              badgeContent={nTracks}
              className={classes.margin}
              classes={{
                badge: classes.trackBadge,
              }}
            >
              <span />
            </Badge>
          </div>
        </ListItem>
        <Collapse
          in={isOpen}
          className={classNames({
            [classes.collapse]:
              collapseHasFixedHeight && !isExpanded && !showTracksOnly,
          })}
          timeout="auto"
          unmountOnExit
        >
          <DragDropContext onDragEnd={this._handleDragEnd}>
            <Droppable droppableId={playlist.id}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {tracklist}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {expandButton}
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Playlist);
