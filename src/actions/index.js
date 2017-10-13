import { push } from 'react-router-redux';
import { getMyPlaylists, getMyStatus } from '../api';

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

export const RECEIVED_AUTH_STATE = 'RECEIVED_AUTH_STATE';
const receivedAuthState = isAuthenticated => {
    return {
        type: RECEIVED_AUTH_STATE,
        isAuthenticated
    };
};

export const checkIfAuthenticated = () => {
    return dispatch => {
        return getMyStatus()
            .then(data => {
                const { isAuthenticated } = data;
                dispatch(receivedAuthState(isAuthenticated));

                if (!isAuthenticated) {
                    dispatch(push('/'));
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
};
