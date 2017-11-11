import {
    REQUEST_PLAYLISTS,
    RECEIVE_PLAYLISTS,
    RECEIVED_AUTH_STATE,
    LOAD_MORE_MY_PLAYLISTS
} from '../actions';

const OFFSET_LIMIT = 10;

export function myPlaylists(
    state = {
        isFetching: false,
        playlists: [],
        numberOfTracks: 0,
        currentOffset: 0,
        playlistsRemaining: 0
    },
    action
) {
    switch (action.type) {
        case REQUEST_PLAYLISTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PLAYLISTS:
            const playlists = [...state.playlists, ...action.playlists];
            let { currentOffset, playlistsRemaining, numberOfTracks } = state;
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

            playlistsRemaining = numberOfTracks - currentOffset;

            console.log(numberOfTracks, playlistsRemaining, currentOffset);

            return Object.assign({}, state, {
                numberOfTracks: action.numberOfTracks,
                lastUpdated: action.receivedAt,
                isFetching: false,
                playlistsRemaining,
                currentOffset,
                playlists
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
