import React from 'react';
import PropTypes from 'prop-types';
import MaterialList from '@material-ui/core/List';
import Track from '../../containers/Track';

import './Playlist.css';

const TrackList = (props) => (
  <MaterialList>
    {props.tracks.map((track, index) => (
      <Track
        key={track.id}
        track={track}
        playlist={props.playlist}
        index={index}
      />
    ))}
  </MaterialList>
);

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  playlist: PropTypes.object.isRequired,
};

export default TrackList;
