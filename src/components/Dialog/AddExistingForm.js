import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Waypoint } from 'react-waypoint';
import { head } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  InputLabel,
  CircularProgress,
  FormControl,
  ListItemText,
  ListItemIcon,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { LIGHT_CYAN_COLOR, PLAYLIST_OFFSET_LIMIT } from '../../utils/constants';

const styles = (theme) => ({
  formControl: {
    width: '100%',
  },

  loaderWrapper: {
    textAlign: 'center',
    width: '100%',
  },

  playlistName: {
    width: '100%',
    paddingLeft: `${theme.spacing(1)}px`,
  },

  progress: {
    margin: `0 ${theme.spacing(2)}px`,
    color: LIGHT_CYAN_COLOR,
  },

  select: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1.5)}px`,
  },

  wrapper: {
    width: '100%',
  },
});

class AddExistingForm extends PureComponent {
  static propTypes = {
    onSetAddExistingOpenStatus: PropTypes.func.isRequired,
    onFetchPlaylistSelection: PropTypes.func.isRequired,
    totalNumberOfPlaylists: PropTypes.number.isRequired,
    selectedPlaylist: PropTypes.string.isRequired,
    wasAddExistingOpen: PropTypes.bool.isRequired,
    wasDialogOpen: PropTypes.bool,
    onSetCurrentOffset: PropTypes.func.isRequired,
    isFetchingOptions: PropTypes.bool.isRequired,
    onSelectPlaylist: PropTypes.func.isRequired,
    playlistOptions: PropTypes.array.isRequired,
    currentOffset: PropTypes.number.isRequired,
    error: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  };

  _handleSelectionFetch = () => {
    const {
      onSetCurrentOffset,
      onFetchPlaylistSelection,
      totalNumberOfPlaylists,
      currentOffset,
    } = this.props;

    if (currentOffset < totalNumberOfPlaylists) {
      onFetchPlaylistSelection(currentOffset, PLAYLIST_OFFSET_LIMIT);
      onSetCurrentOffset(currentOffset + PLAYLIST_OFFSET_LIMIT);
    }
  };

  componentDidMount() {
    const {
      onFetchPlaylistSelection,
      onSetAddExistingOpenStatus,
      onSetCurrentOffset,
      wasAddExistingOpen,
      currentOffset,
    } = this.props;

    if (!wasAddExistingOpen) {
      onSetAddExistingOpenStatus(true);
      onFetchPlaylistSelection(currentOffset, PLAYLIST_OFFSET_LIMIT);
      onSetCurrentOffset(PLAYLIST_OFFSET_LIMIT);
    }
  }

  _handlePlaylistSelect = (event) => {
    const { onSelectPlaylist } = this.props;

    onSelectPlaylist(event.target.value);
  };

  render() {
    const {
      selectedPlaylist: selectedPlaylistId,
      playlistOptions,
      isFetchingOptions,
      currentOffset,
      classes,
      error,
    } = this.props;
    const playlistMenuOptions = playlistOptions.map(
      ({ id, name, images = [] }) => {
        return (
          <MenuItem key={id} value={id}>
            <ListItemIcon className={classes.icon}>
              <Avatar src={head(images).url} alt={`${name} cover image`} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="h4"
                  color="textSecondary"
                  component="p"
                  className={classes.playlistName}
                >
                  {name}
                </Typography>
              }
            />
          </MenuItem>
        );
      }
    );

    let contentComponent = (
      <div className={classes.loaderWrapper}>
        <CircularProgress className={classes.progress} thickness={7} />
        <Typography variant="caption" color="textSecondary">
          Loading your playlists...
        </Typography>
      </div>
    );

    if (!isFetchingOptions || currentOffset >= PLAYLIST_OFFSET_LIMIT) {
      contentComponent = (
        <FormControl className={classes.formControl} error={error}>
          <InputLabel htmlFor="playlist-choice">Choose Playlist</InputLabel>
          <Select
            value={selectedPlaylistId}
            onChange={this._handlePlaylistSelect}
            name="playlist"
            classes={{
              select: classes.select,
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 420,
                },
              },
            }}
          >
            {playlistMenuOptions}
            <Waypoint
              onEnter={() => {
                this._handleSelectionFetch();
              }}
            />
          </Select>
        </FormControl>
      );
    }

    return (
      <main id="addExistingForm" className={classes.wrapper}>
        {contentComponent}
      </main>
    );
  }
}

export default withStyles(styles)(AddExistingForm);
