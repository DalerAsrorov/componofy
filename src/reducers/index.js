import {
    REQUEST_PLAYLISTS,
    RECEIVE_PLAYLISTS,
    RECEIVED_AUTH_STATE
} from '../actions';

export function myPlaylists(
    state = { isFetching: false, playlists: [] },
    action
) {
    switch (action.type) {
        case REQUEST_PLAYLISTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_PLAYLISTS:
            return Object.assign({}, state, {
                isFetching: false,
                playlists: action.playlists,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

export function isAuthenticated(state = false, action) {
    switch (action.type) {
        case RECEIVED_AUTH_STATE:
            return action.isAuthenticated;
        default:
            return state;
    }
}
