import MaterialList from '@material-ui/core/List';
import PropTypes from 'prop-types';
import React from 'react';
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
