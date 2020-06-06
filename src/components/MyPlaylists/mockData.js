import {
  MOCK_EXTERNAL_URL,
  MOCK_ALBUM,
  MOCK_TRACK,
  MOCK_TRACKS,
  MOCK_IMAGE,
  MOCK_ARTIST,
  MOCK_NAVIGATION,
  MOCK_PLAYLISTS,
} from '../../utils/mocks';

export const MOCK_MY_PLAYLISTS = {
  playlists: MOCK_PLAYLISTS,
  isFetching: false,
  numberOfTracks: MOCK_PLAYLISTS.length,
  currentOffset: 0,
  playlistsRemaining: 0,
  areAllOpen: false,
  canLoadMore: false,
  isVisited: false,
};
