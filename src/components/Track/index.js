import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core';
import Audiotrack from '@material-ui/icons/Audiotrack';

import { withStyles } from '@material-ui/core/styles';
import { head } from 'ramda';
import {
  TRACK_PROPTYPE,
  PLAYLIST_PROPTYPE,
  MIN_POPULAR_SCORE,
} from '../../utils/constants';
import { Preview } from './Preview';
import { green } from '@material-ui/core/colors';

const styles = (theme) => ({
  trackInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryAction: {
    marginRight: theme.spacing(2),
  },
});

const AddCheckBox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[700],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

class Track extends PureComponent {
  static propTypes = {
    removePlaylistTrackFromFinal: PropTypes.func.isRequired,
    playlistContainsThisTrack: PropTypes.bool.isRequired,
    addPlaylistTrackToFinal: PropTypes.func.isRequired,
    addErrorToApp: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    track: TRACK_PROPTYPE.isRequired,
    playlist: PLAYLIST_PROPTYPE,
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
    const { track, classes, playlistContainsThisTrack, index } = this.props;

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
              style={{
                color: playlistContainsThisTrack ? green[400] : null,
              }}
            >
              <Audiotrack />
            </ListItemIcon>
            <ListItemText primary={trackName} />
            <ListItemSecondaryAction className={classes.secondaryAction}>
              {previewPlay}
            </ListItemSecondaryAction>
            <ListItemSecondaryAction>
              <AddCheckBox
                edge="end"
                onClick={this._handleChecked}
                checked={playlistContainsThisTrack}
                inputProps={{
                  'aria-labelledby': trackId,
                  'aria-label': 'add track checkbox',
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </Draggable>
    );
  }
}

export default withStyles(styles)(Track);
