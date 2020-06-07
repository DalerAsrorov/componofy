import {
  Badge,
  CircularProgress,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AccessTime, PlaylistAdd, PlaylistAddCheck } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import React, { PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Element } from 'react-scroll';
import {
  LIGHT_CYAN_COLOR,
  MAX_NUMBER_OF_TRACKS_FOR_BADGE,
  PLAYLIST_PROPTYPE,
  SUCCESS_COLOR,
} from '../../utils/constants';
import Loader from '../Loader';
import { PlaylistThumbmailManager } from './PlaylistThumbmailManager';
import Expand from './Expand';
import TrackList from './TrackList';

import './Playlist.css';

const styles = (theme) => ({
  badgeSet: {},

  collapse: {
    maxHeight: '420px',
    overflowY: 'auto',
  },

  customBadgeCl: {
    margin: theme.spacing(2),
  },

  numberOfTracksBadge: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(0.25),
  },

  addedTracksBadge: {
    color: SUCCESS_COLOR,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0.25),
    border: `1px solid ${SUCCESS_COLOR}`,
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },

  progress: {
    margin: `0 ${theme.spacing(2)}px`,
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
    const shouldShowExpandBtn =
      collapseHasFixedHeight && tracks && tracks.length > 5 && !showTracksOnly;
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

    if (numberOfAddedTracksFromThisPlaylist && shouldShowTracksIncludedValue) {
      badgeForAddedTracks = (
        <Badge
          badgeContent={numberOfAddedTracksFromThisPlaylist}
          className={classes.customBadgeCl}
          classes={{
            badge: classes.addedTracksBadge,
          }}
          max={MAX_NUMBER_OF_TRACKS_FOR_BADGE}
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
          <Typography variant="h3" color="textSecondary">
            Loading tracks...
          </Typography>
        }
        icon={<CircularProgress thickness={7} className={classes.progress} />}
      />
    );

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
          <PlaylistThumbmailManager playlist={playlist} />
          <ListItemText inset primary={playlist.name} />
          <div className={classes.badgeSet}>
            {badgeForAddedTracks}
            <Badge
              badgeContent={nTracks}
              className={classes.customBadgeCl}
              classes={{
                badge: classes.numberOfTracksBadge,
              }}
              max={MAX_NUMBER_OF_TRACKS_FOR_BADGE}
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
          {shouldShowExpandBtn && (
            <Expand
              to={playlist.id}
              shouldSpy={true}
              isStickyBottom={true}
              showUpArrow={isExpanded}
              onClick={this._handleExpandMore}
              variant="outlined"
            />
          )}
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Playlist);
