import * as R from 'ramda';

const HOST_URL = window.location.origin;
// eslint-disable-next-line no-unused-vars
const DEV_SERVER_URL = 'http://localhost:3001';

export const replaceTo = (path) => {
  window.location.replace(`${DEV_SERVER_URL}${path}`);
};

export const formatTracks = (tracks) => {
  return tracks.map((trackObject) => {
    const { track, ...rest } = trackObject;

    return {
      ...track,
      ...rest,
    };
  });
};

export const removeDuplicates = R.curry((data, prop) => {
  return R.pipe(
    R.groupBy(R.prop(prop)),
    R.values,
    R.pipe(R.map(R.take(1)), R.flatten)
  )(data);
});

export const swapKeysAndValues = (map, fn = toString) => {
  return R.zipObj(R.values(map), R.map(fn, R.keys(map)));
};

export const filterSearchPlaylist = (searchTerm, playlists) => {
  const stringContains = (mainStr, compareToStr) =>
    R.toUpper(mainStr).indexOf(R.toUpper(compareToStr)) > -1;

  const containsInfo = (playlist) => {
    if (stringContains(playlist.name, searchTerm)) {
      return true;
    }

    return !!R.find(
      R.propSatisfies((name) => stringContains(name, searchTerm), 'name')
    )(playlist.tracks.list);
  };

  return R.filter(containsInfo, playlists);
};

export const formatPlaylistsData = (playlistsMap, tracksMap) => {
  return R.pipe(
    R.toPairs,
    R.map(([playlistKey, playlistData]) => {
      let { list, ...restTrackProps } = playlistData.tracks;
      list = playlistData.tracks.list.map((trackID) => tracksMap[trackID]);

      return {
        ...playlistData,
        id: playlistKey,
        tracks: {
          list,
          ...restTrackProps,
        },
      };
    })
  )(playlistsMap);
};

export const isDomElementInFocus = (domElement) =>
  domElement === document.activeElement;

export const safeString = (str = '') => str;
export const safeBool = (bool = true) => bool;

export const getAllPlaylistsTrackIds = (playlistsMap = {}) => {
  return R.pipe(
    R.values,
    R.map(R.path(['tracks', 'list'])),
    R.flatten,
    // filter undefined and null values
    R.filter((item) => item)
  )(playlistsMap);
};

export const mergeTuples = (accum, tuple) => {
  let playlistId = tuple[1];
  let playlistTrackIds = tuple[0];

  let newTuple = playlistTrackIds.map((trackId) => [trackId, playlistId]);

  accum = accum.concat(newTuple);
  return accum;
};

// returns a tuple with [trackId, playlistId]
export const getAllPlaylistTracksTuple = (playlistMap = {}) => {
  const getTrackPlaylistTuple = (playlistObject) => [
    playlistObject.tracks.list,
    playlistObject.id,
  ];

  return R.pipe(
    R.values,
    R.map(getTrackPlaylistTuple),
    R.reduce(mergeTuples, [])
  )(playlistMap);
};

export const getAllPlaylistTracksFromMap = (
  playlistsState,
  shouldAssignPlaylist = false
) => {
  if (R.isEmpty(playlistsState.entities)) {
    return;
  }

  const {
    entities: { playlists: playlistMap },
  } = playlistsState;
  const {
    entities: { tracks: tracksMap },
  } = playlistsState;

  const trackPlaylistTuples = getAllPlaylistTracksTuple(playlistMap);
  const allAddedTracks = trackPlaylistTuples.map((tuple) => {
    let track = tracksMap[tuple[0]];

    if (shouldAssignPlaylist) {
      track.playlist = playlistMap[tuple[1]];
    }

    return track;
  });

  return allAddedTracks;
};

export const getExpandStatusText = (hasOpenPlaylist = false) => {
  return hasOpenPlaylist ? 'Collapse' : 'Expand';
};

export const toTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
