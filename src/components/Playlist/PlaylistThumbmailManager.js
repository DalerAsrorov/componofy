import Avatar from '@material-ui/core/Avatar';
import { FavoriteBorder, LibraryMusic } from '@material-ui/icons';
import { equals, head, isEmpty } from 'ramda';
import React from 'react';
import {
  LIGHT_CYAN_COLOR,
  PLAYLIST_PROPTYPE,
  generateSugestedPlaylistTemplate,
} from '../../utils/constants';

export const PlaylistThumbmailManager = ({ playlist }) => {
  let playlistImage = (
    <Avatar alt={`${playlist.name} playlist cover`}>
      <LibraryMusic />
    </Avatar>
  );

  if (equals(playlist.id, generateSugestedPlaylistTemplate().id)) {
    playlistImage = (
      <Avatar
        alt={`${playlist.name} playlist cover`}
        style={{ backgroundColor: LIGHT_CYAN_COLOR }}
      >
        <FavoriteBorder />
      </Avatar>
    );
  } else if (!isEmpty(playlist.images)) {
    // takle the first image available
    const avatar = head(playlist.images);

    playlistImage = (
      <Avatar
        src={avatar.url}
        alt={`${playlist.name} playlist cover with default iamge`}
      />
    );
  }

  return playlistImage;
};

PlaylistThumbmailManager.propTypes = {
  playlist: PLAYLIST_PROPTYPE,
};
