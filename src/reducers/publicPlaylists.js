import {
    SET_PUBLIC_SEARCH_TERM,
    SET_PUBLIC_PLAYLISTS_VISITED,
    RECEIVED_SEARCHED_PLAYLISTS,
    REQUEST_SEARCHED_PLAYLISTS,
    SET_PUBLIC_PLAYLIST_OPEN,
    RECEIVED_PUBLIC_PLAYLIST_TRACKS,
    SET_SEARCH_RESULTS_MESSAGE
} from '../actions';
import { OFFSET_LIMIT } from '../utils/constants';

const DEFAULT_STATE = {
    isFetching: false,
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
                    playlist.tracks.list = action.tracks;
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
        default:
            return state;
    }
};
