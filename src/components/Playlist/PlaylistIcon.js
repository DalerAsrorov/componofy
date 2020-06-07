import { AccessTime, PlaylistAdd, PlaylistAddCheck } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { TRACK_PROPTYPE } from '../../utils/constants';

export const PlaylistIcon = ({ tracks, isIncluded }) => {
  if (!tracks) {
    return <AccessTime />;
  }

  return isIncluded ? <PlaylistAddCheck /> : <PlaylistAdd />;
};

PlaylistIcon.propTypes = {
  isIncluded: PropTypes.bool.isRequired,
  tracks: PropTypes.arrayOf(TRACK_PROPTYPE),
};
