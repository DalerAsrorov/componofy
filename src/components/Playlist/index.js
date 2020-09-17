import {
  Badge,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AccessTime, DeleteForever } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isEmpty } from 'ramda';
import React, { PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Element } from 'react-scroll';
import {
  LIGHT_CYAN_COLOR,
  MAX_NUMBER_OF_TRACKS_FOR_BADGE,
  PLAYLIST_PROPTYPE,
  SUCCESS_COLOR,
} from '../../utils/constants';
import Expand from './Expand';
import './Playlist.css';
import { PlaylistIcon } from './PlaylistIcon';
import { PlaylistThumbmailManager } from './PlaylistThumbmailManager';
import { TrackListWithLoader } from './TrackListWithLoader';

const styles = (theme) => ({
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

const MAX_EXPAND_TRACK_SIZE = 10;

class Playlist extends PureComponent {
  static propTypes = {
    containsThisPlaylist: PropTypes.bool.isRequired,
    onClickPlaylist: PropTypes.func.isRequired,
    playlist: PLAYLIST_PROPTYPE.isRequired,
    onClickIcon: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    numberOfAddedTracksFromThisPlaylist: PropTypes.number,
    shouldShowTracksIncludedValue: PropTypes.bool,
    isDeleteType: PropTypes.bool,
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
      isDeleteType,
    } = this.props;
    const {
      tracks: { list: tracks, total: totalNumberOfTracks },
      isOpen: playlistIsOpen,
    } = playlist;
    const nTracks = tracks ? tracks.length : <AccessTime />;
    const shouldShowExpandBtn =
      collapseHasFixedHeight &&
      tracks &&
      tracks.length > MAX_EXPAND_TRACK_SIZE &&
      !showTracksOnly;
    const isOpen = showTracksOnly ? true : playlistIsOpen;
    let badgeForAddedTracks = null;

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

    return (
      <React.Fragment>
        <ListItem
          onClick={this._handleClick}
          disabled={isEmpty(tracks)}
          className={classNames({ 'no-display': showTracksOnly })}
          button
          divider
        >
          <ListItemIcon
            className="playlist-icon"
            onClick={this._handleIconClick}
          >
            <Element id={`element-playlist-${playlist.id}`} name={playlist.id}>
              {isDeleteType ? (
                <DeleteForever color="error" />
              ) : (
                <PlaylistIcon
                  isIncluded={containsThisPlaylist}
                  tracks={tracks}
                />
              )}
            </Element>
          </ListItemIcon>
          <PlaylistThumbmailManager playlist={playlist} />
          <ListItemText inset primary={playlist.name} />
          <div className={classes.badgeSet}>
            {badgeForAddedTracks}
            {isDeleteType ? (
              <Typography color="textSecondary" variant="body1">
                {`${numberOfAddedTracksFromThisPlaylist} / ${totalNumberOfTracks}`}
              </Typography>
            ) : (
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
            )}
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
                <Container ref={provided.innerRef}>
                  <TrackListWithLoader
                    classes={classes}
                    playlist={playlist}
                    tracks={tracks}
                    isDeleteType={isDeleteType}
                  />
                  {provided.placeholder}
                </Container>
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Playlist);
