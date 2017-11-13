import { push } from 'react-router-redux';
import { getMyPlaylists, getMyStatus, getPlaylistTracks } from '../api';

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
        numberOfTracks: json.data.body ? json.data.body.total : 0,
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

export const SET_PLAYLIST_OPEN = 'SET_PLAYLIST_OPEN';
export const setPlaylistOpen = (playlistID, isOpen) => {
    return {
        type: SET_PLAYLIST_OPEN,
        playlistID,
        isOpen
    };
};

export const SET_MY_PLAYLIST_VISITED = 'SET_MY_PLAYLIST_VISITED';
export const setMyPlaylistVisited = isVisited => {
    return {
        type: SET_MY_PLAYLIST_VISITED,
        isVisited
    };
};

export const REQUEST_PLAYLIST_TRACKS = 'REQUEST_PLAYLIST_TRACKS';
export const requestPlaylistTracks = () => {
    return {
        type: REQUEST_PLAYLIST_TRACKS
    };
};

export const RECEIVED_PLAYLIST_TRACKS = 'RECEIVED_PLAYLIST_TRACKS';
export const receivedPlaylistTracks = (playlistID, tracks) => {
    return {
        type: RECEIVED_PLAYLIST_TRACKS,
        receivedTracksAt: Date.now(),
        playlistID,
        tracks
    };
};

export const fetchPlaylistTracks = (userID, playlistID) => {
    return dispatch => {
        dispatch(requestPlaylistTracks());

        return getPlaylistTracks(userID, playlistID).then(response => {
            const { data: { body: payload } } = response;
            let tracks = [];

            if (payload) {
                tracks = payload.items;
            }
            dispatch(receivedPlaylistTracks(playlistID, tracks));
        });
    };
};
