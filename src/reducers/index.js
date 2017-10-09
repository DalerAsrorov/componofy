import { REQUEST_PLAYLISTS, RECEIVE_PLAYLISTS } from '../actions';

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
