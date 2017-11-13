import { removeDuplicates } from '../utils/helpers';
import {
    REQUEST_PLAYLISTS,
    RECEIVE_PLAYLISTS,
    RECEIVED_AUTH_STATE,
    LOAD_MORE_MY_PLAYLISTS,
    SET_PLAYLIST_OPEN,
    SET_MY_PLAYLIST_VISITED,
    REQUEST_PLAYLIST_TRACKS,
    RECEIVED_PLAYLIST_TRACKS
} from '../actions';

const OFFSET_LIMIT = 10;

export function myPlaylists(
    state = {
        isFetching: false,
        tracksFetching: false,
        playlists: [],
        numberOfTracks: 0,
        lastUpdated: 0,
        currentOffset: 0,
        playlistsRemaining: 0,
        canLoadMore: true,
        isVisited: false
    },
    action
) {
    switch (action.type) {
        case REQUEST_PLAYLISTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PLAYLISTS:
            let playlists = [...state.playlists, ...action.playlists];
            let {
                currentOffset,
                playlistsRemaining,
                numberOfTracks,
                canLoadMore
            } = state;
            numberOfTracks = action.numberOfTracks;

            if (numberOfTracks < OFFSET_LIMIT) {
                currentOffset = numberOfTracks;
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
            playlists = removeDuplicates(playlists, 'id');

            return Object.assign({}, state, {
                numberOfTracks: action.numberOfTracks,
                lastUpdated: action.receivedAt,
                isFetching: false,
                playlistsRemaining,
                currentOffset,
                canLoadMore,
                playlists
            });
        case RECEIVED_PLAYLIST_TRACKS:
            const updatedPlaylists = state.playlists.map(playlist => {
                if (playlist.id === action.playlistID) {
                    playlist.tracks.list = action.tracks;
                }
                return playlist;
            });

            return Object.assign({}, state, {
                playlists: updatedPlaylists,
                tracksFetching: false
            });
        case SET_PLAYLIST_OPEN:
            const { playlistID, isOpen } = action;
            let myPlaylists = Array.from(state.playlists);

            myPlaylists = myPlaylists.map(playlist => {
                if (playlist.id === playlistID) {
                    playlist.isOpen = isOpen;
                }

                return playlist;
            });

            return Object.assign({}, state, {
                playlists: myPlaylists
            });
        case SET_MY_PLAYLIST_VISITED:
            return Object.assign({}, state, {
                isVisited: action.isVisited
            });
        case REQUEST_PLAYLIST_TRACKS:
            return Object.assign({}, state, {
                tracksFetching: true
            });
        default:
            return state;
    }
}

export function user(state = {}, action) {
    switch (action.type) {
        case RECEIVED_AUTH_STATE:
            return Object.assign({}, state, action.userInfo);
        default:
            return state;
    }
}
