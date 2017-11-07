import {
    REQUEST_PLAYLISTS,
    RECEIVE_PLAYLISTS,
    RECEIVED_AUTH_STATE
} from '../actions';

export function myPlaylists(
    state = { isFetching: false, playlists: [], numberOfTracks: 0 },
    action
) {
    switch (action.type) {
        case REQUEST_PLAYLISTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PLAYLISTS:
            const playlists = [...state.playlists, ...action.playlists];

            return Object.assign({}, state, {
                numberOfTracks: action.numberOfTracks,
                lastUpdated: action.receivedAt,
                isFetching: false,
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
