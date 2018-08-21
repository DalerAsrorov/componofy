import * as R from 'ramda';

export const getTotalNumberOfTracksInPlaylistsEntity = playlists => {
  const calculateTotalLength = (accum, track) => {
    return accum + track.list.length;
  };

  const result = R.pipe(
    R.values,
    R.map(R.prop('tracks')),
    R.reduce(calculateTotalLength, 0)
  )(playlists);

  return result;
};

export const getEntityFromSchema = (
  { playlists: { entities = {} } = {} } = {},
  entity = ''
) => entities[entity];

export const getTotalPlaylistsScehmaTracks = playlistsSchema =>
  getTotalNumberOfTracksInPlaylistsEntity(
    getEntityFromSchema(playlistsSchema, 'playlists')
  );
