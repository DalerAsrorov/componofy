import PropTypes from 'prop-types';
import React from 'react';
import { Media, Player } from 'react-media-player';
import PlayPause from './PlayPause';

export const Preview = (props) => (
  <Media>
    <React.Fragment>
      <Player src={props.url} vendor="audio" />
      <PlayPause color="secondary" />
    </React.Fragment>
  </Media>
);

Preview.propTypes = {
  url: PropTypes.string.isRequired,
};
