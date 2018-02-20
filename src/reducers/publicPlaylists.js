import {
    SET_PUBLIC_SEARCH_TERM,
    SET_PUBLIC_PLAYLISTS_VISITED,
    RECEIVED_SEARCHED_PLAYLISTS,
    REQUEST_SEARCHED_PLAYLISTS,
    SET_PUBLIC_PLAYLIST_OPEN,
    RECEIVED_PUBLIC_PLAYLIST_TRACKS,
    SET_SEARCH_RESULTS_MESSAGE,
    CLEAN_PUBLIC_SEARCH_RESULTS,
    SET_OPEN_STATUS_PUBLIC_PLAYLISTS,
    CLEAR_PUBLIC_DATA
} from '../actions';
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
    canLoadMore: true,
    isVisited: false
};

export const publicPlaylists = (state = DEFAULT_STATE, action) => {
    // eslint-disable-next-line no-unused-vars
    let playlists;

    switch (action.type) {
        case RECEIVED_SEARCHED_PLAYLISTS:
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
                isFetching: false,
                playlistsRemaining,
                numberOfTracks,
                currentOffset,
                canLoadMore,
                playlists
            });
        case REQUEST_SEARCHED_PLAYLISTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVED_PUBLIC_PLAYLIST_TRACKS:
            playlists = state.playlists.map(playlist => {
                if (playlist.id === action.playlistId) {
                    playlist.tracks.list = removeDuplicates(
                        action.tracks,
                        'id'
                    );
                }
                return playlist;
            });

            return Object.assign({}, state, {
                playlists
            });
        case SET_PUBLIC_SEARCH_TERM:
            return Object.assign({}, state, { searchTerm: action.searchTerm });
        case SET_PUBLIC_PLAYLISTS_VISITED:
            return Object.assign({}, state, { isVisited: action.isVisited });
        case SET_PUBLIC_PLAYLIST_OPEN:
            playlists = state.playlists.map(playlist => {
                if (playlist.id === action.playlistId) {
                    playlist.isOpen = action.isOpen;
                }

                return playlist;
            });

            return Object.assign({}, state, {
                playlists
            });
        case SET_SEARCH_RESULTS_MESSAGE:
            return Object.assign({}, state, {
                searchResultsMessage: action.message
            });
        case CLEAN_PUBLIC_SEARCH_RESULTS:
            return Object.assign({}, state, {
                searchResultsMessage: '',
                playlists: [],
                numberOfTracks: 0,
                playlistsRemaining: 0,
                lastUpdated: Date.now(),
                currentOffset: 0,
                canLoadMore: true
            });
        case SET_OPEN_STATUS_PUBLIC_PLAYLISTS:
            playlists = state.playlists.map(playlist => {
                playlist.isOpen = action.isOpen;
                return playlist;
            });

            return Object.assign({}, state, {
                areAllOpen: action.isOpen,
                playlists
            });
        case CLEAR_PUBLIC_DATA:
            return Object.assign({}, state, DEFAULT_STATE);
        default:
            return state;
    }
};
