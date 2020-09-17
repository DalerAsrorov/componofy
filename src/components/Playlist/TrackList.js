import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import React from 'react';
import Track from '../../containers/Track';

import './Playlist.css';

const TrackList = (props) => (
  <List>
    {props.tracks.map((track, index) => (
      <Track
        key={track.id}
        track={track}
        playlist={props.playlist}
        isDeleteType={props.isDeleteType}
        index={index}
      />
    ))}
  </List>
);

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  playlist: PropTypes.object.isRequired,
  isDeleteType: PropTypes.bool,
};

export default TrackList;
