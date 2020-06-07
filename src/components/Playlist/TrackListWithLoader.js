import { CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { PLAYLIST_PROPTYPE, TRACK_PROPTYPE } from '../../utils/constants';
import Loader from '../Loader';
import TrackList from './TrackList';

export const TrackListWithLoader = (props) =>
  props.tracks ? (
    <TrackList tracks={props.tracks} playlist={props.playlist} />
  ) : (
    <Loader
      text={
        <Typography variant="h3" color="textSecondary">
          Loading tracks...
        </Typography>
      }
      icon={
        <CircularProgress thickness={7} className={props.classes.progress} />
      }
    />
  );

TrackListWithLoader.propTypes = {
  tracks: PropTypes.arrayOf(TRACK_PROPTYPE).isRequired,
  playlist: PLAYLIST_PROPTYPE,
  classes: PropTypes.any,
};
