import {
  Badge,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { green, yellow, cyan, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Audiotrack from '@material-ui/icons/Audiotrack';
import Star from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import { head } from 'ramda';
import React, { PureComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  MIN_POPULAR_SCORE,
  PLAYLIST_PROPTYPE,
  TRACK_PROPTYPE,
} from '../../utils/constants';
import { Preview } from './Preview';
import { HighlightOff, Remove } from '@material-ui/icons';

const styles = (theme) => ({
  trackInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackContent: {
    '&:hover': {
      color: cyan[700],
    },
  },
  secondaryAction: {
    marginRight: theme.spacing(2),
  },
});

const getTrackIconColor = (containsTrack, isDeleteType) => {
  let chosenColor = null;

  if (containsTrack) {
    chosenColor = green[400];
  }
  if (isDeleteType) {
    chosenColor = red[600];
  }

  return chosenColor;
};

const AddCheckBox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[700],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const DeleteCheckBox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => (
  <Checkbox checkedIcon={<HighlightOff />} color="default" {...props} />
));

class Track extends PureComponent {
  static propTypes = {
    removePlaylistTrackFromFinal: PropTypes.func.isRequired,
    playlistContainsThisTrack: PropTypes.bool.isRequired,
    addPlaylistTrackToFinal: PropTypes.func.isRequired,
    addErrorToApp: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    track: TRACK_PROPTYPE.isRequired,
    playlist: PLAYLIST_PROPTYPE,
    isDeleteType: PropTypes.bool,
  };

  _handleChecked = (event) => {
    const {
      track,
      playlist,
      addPlaylistTrackToFinal,
      removePlaylistTrackFromFinal,
      playlistContainsThisTrack,
    } = this.props;

    if (playlist) {
      if (playlistContainsThisTrack) {
        removePlaylistTrackFromFinal(track, playlist);
      } else {
        addPlaylistTrackToFinal(track, playlist);
      }
    }
  };

  render() {
    const {
      track,
      classes,
      playlistContainsThisTrack,
      index,
      isDeleteType,
    } = this.props;

    if (!track.id) {
      return null;
    }

    const {
      id: trackId,
      artists,
      name: trackName,
      album: {
        name: albumName,
        external_urls: { spotify: albumUrl },
      },
      external_urls: { spotify: trackUrl },
      preview_url,
      popularity,
    } = track;
    const {
      name: artistName,
      external_urls: { spotify: artistUrl },
    } = head(artists);
    const previewPlay = !!preview_url ? (
      <div className={classes.preview}>
        <Preview url={preview_url} />
      </div>
    ) : null;

    return (
      <Draggable key={trackId} draggableId={`${trackId}`} index={index}>
        {(provided) => (
          <ListItem
            ref={provided.innerRef}
            style={provided.draggableStyle}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            dense
            divider
          >
            <ListItemIcon
              onClick={this._handleChecked}
              style={{
                color: getTrackIconColor(
                  playlistContainsThisTrack,
                  isDeleteType
                ),
                cursor: 'pointer',
              }}
            >
              <Badge
                badgeContent={
                  MIN_POPULAR_SCORE <= popularity ? (
                    <Tooltip title="popular">
                      <Star style={{ color: yellow[700] }} />
                    </Tooltip>
                  ) : null
                }
              >
                {isDeleteType ? <Remove /> : <Audiotrack />}
              </Badge>
            </ListItemIcon>
            <ListItemText
              primary={
                <div className={classes.trackContent}>
                  <Typography variant="body1" display="block">
                    {trackName}
                  </Typography>
                  <Typography variant="caption" display="block">
                    {artistName}
                  </Typography>
                </div>
              }
            />
            <ListItemSecondaryAction className={classes.secondaryAction}>
              {previewPlay}
            </ListItemSecondaryAction>
            <ListItemSecondaryAction>
              {isDeleteType ? (
                <DeleteCheckBox
                  edge="end"
                  onClick={this._handleChecked}
                  checked={playlistContainsThisTrack}
                  inputProps={{
                    'aria-labelledby': trackId,
                    'aria-label': 'delete track checkbox',
                  }}
                />
              ) : (
                <AddCheckBox
                  edge="end"
                  onClick={this._handleChecked}
                  checked={playlistContainsThisTrack}
                  inputProps={{
                    'aria-labelledby': trackId,
                    'aria-label': 'add track checkbox',
                  }}
                />
              )}
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </Draggable>
    );
  }
}

export default withStyles(styles)(Track);
