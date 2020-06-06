import * as actions from '../actions';
import { removeDuplicates } from '../utils/helpers';
import { OFFSET_LIMIT } from '../utils/constants';

const DEFAULT_STATE = {
  isFetching: false,
  areAllOpen: false,
  searchTerm: '',
  searchResultsMessage: '',
  playlists: [],
  numberOfTracks: 0,
  lastUpdated: 0,
  currentOffset: 0,
  playlistsRemaining: 0,
  hasReceivedResponse: false,
  canLoadMore: true,
  isVisited: false,
};

export const publicPlaylists = (state = DEFAULT_STATE, action) => {
  // eslint-disable-next-line no-unused-vars
  let playlists;

  switch (action.type) {
    case actions.RECEIVED_SEARCHED_PLAYLISTS:
      let playlists = [...state.playlists, ...action.playlists];
      let { currentOffset, playlistsRemaining, canLoadMore } = state;
      let { numberOfTracks } = action;

      if (action.numberOfTracks < OFFSET_LIMIT) {
      } else {
        if (playlistsRemaining < OFFSET_LIMIT && currentOffset !== 0) {
          currentOffset += playlistsRemaining;
        } else {
          currentOffset += OFFSET_LIMIT;
        }
      }

      if (currentOffset === numberOfTracks) {
        canLoadMore = false;
      }

      playlistsRemaining = numberOfTracks - currentOffset;

      return Object.assign({}, state, {
        lastUpdated: action.receivedAt,
        hasReceivedResponse: true,
        isFetching: false,
        playlistsRemaining,
        numberOfTracks,
        currentOffset,
        canLoadMore,
        playlists,
      });
    case actions.REQUEST_SEARCHED_PLAYLISTS:
      return Object.assign({}, state, {
        isFetching: true,
        hasReceivedResponse: false,
      });
    case actions.RECEIVED_PUBLIC_PLAYLIST_TRACKS:
      playlists = state.playlists.map((playlist) => {
        if (playlist.id === action.playlistId) {
          playlist.tracks.list = removeDuplicates(action.tracks, 'id');
        }
        return playlist;
      });

      return Object.assign({}, state, {
        playlists,
      });
    case actions.SET_PUBLIC_SEARCH_TERM:
      return Object.assign({}, state, { searchTerm: action.searchTerm });
    case actions.SET_PUBLIC_PLAYLISTS_VISITED:
      return Object.assign({}, state, { isVisited: action.isVisited });
    case actions.SET_PUBLIC_PLAYLIST_OPEN:
      playlists = state.playlists.map((playlist) => {
        if (playlist.id === action.playlistId) {
          playlist.isOpen = action.isOpen;
        }

        return playlist;
      });

      return Object.assign({}, state, {
        playlists,
      });
    case actions.SET_SEARCH_RESULTS_MESSAGE:
      return Object.assign({}, state, {
        searchResultsMessage: action.message,
      });
    case actions.CLEAN_PUBLIC_SEARCH_RESULTS:
      return Object.assign({}, state, {
        searchResultsMessage: '',
        playlists: [],
        numberOfTracks: 0,
        playlistsRemaining: 0,
        lastUpdated: Date.now(),
        currentOffset: 0,
        canLoadMore: true,
      });
    case actions.SET_OPEN_STATUS_PUBLIC_PLAYLISTS:
      playlists = state.playlists.map((playlist) => {
        playlist.isOpen = action.isOpen;
        return playlist;
      });

      return Object.assign({}, state, {
        areAllOpen: action.isOpen,
        playlists,
      });
    case actions.CLEAR_PUBLIC_DATA:
      return Object.assign({}, state, DEFAULT_STATE);
    default:
      return state;
  }
};
