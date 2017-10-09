import { getMyPlaylists } from '../api';

export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
const requestPlaylists = () => {
    return {
        type: REQUEST_PLAYLISTS
    };
};

export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
const receivePlaylists = json => {
    return {
        type: RECEIVE_PLAYLISTS,
        playlists: json.data.body.items,
        receivedAt: Date.now()
    };
};

export const fetchMyPlaylists = () => {
    return dispatch => {
        dispatch(requestPlaylists());
        return getMyPlaylists().then(json => dispatch(receivePlaylists(json)));
    };
};
