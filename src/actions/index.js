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
        playlists: json.data.body ? json.data.body.items : [],
        receivedAt: Date.now()
    };
};

export const fetchMyPlaylists = offset => {
    return dispatch => {
        dispatch(requestPlaylists());
        return getMyPlaylists(offset).then(json =>
            dispatch(receivePlaylists(json))
        );
    };
};

export const RECEIVED_AUTH_STATE = 'RECEIVED_AUTH_STATE';
const receivedAuthState = userInfo => {
    return {
        type: RECEIVED_AUTH_STATE,
        userInfo
    };
};

export const checkIfAuthenticated = () => {
    return dispatch => {
        return getMyStatus()
            .then(userInfo => {
                const { isAuthenticated } = userInfo;
                dispatch(receivedAuthState(userInfo));

                if (!isAuthenticated) {
                    dispatch(push('/'));
                }
            })
            .catch(error => {
                console.error(error);
            });
    };
};
