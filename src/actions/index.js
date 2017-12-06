import { push } from 'react-router-redux';
import {
    getMyPlaylists,
    getMyStatus,
    getPlaylistTracks,
    createPlaylist,
    addTracksToPlaylist,
    uploadPlaylistCoverImage
} from '../api';
import { isEmpty } from 'ramda';
import { formatTracks, getAllPlaylistsTrackIds } from '../utils/helpers';

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
        tracks: formatTracks(tracks),
        playlistID
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

export const SET_MERGER_STATUS = 'SET_MERGER_STATUS';
export const setMergerStatus = (status, statusText) => {
    return {
        type: SET_MERGER_STATUS,
        statusText,
        status
    };
};

export const launchPlaylistMerger = () => {
    return (dispatch, getState) => {
        const {
            finalPlaylists: { playlists: { entities: { playlists } } },
            componoform: { playlistName, imageUri }
        } = getState();
        const tracks = getAllPlaylistsTrackIds(playlists);

        dispatch(setMergerStatus(true, 'Creating playlist...'));
        createPlaylist(playlistName).then(response => {
            dispatch(setMergerStatus(true, 'Adding tracks...'));
            const { data: { body: { id: playlistId } } } = response;

            addTracksToPlaylist(playlistId, tracks).then(response => {
                console.log('response', response);
                if (!isEmpty(imageUri)) {
                    dispatch(setMergerStatus(true, 'Adding cover image...'));

                    uploadPlaylistCoverImage(
                        playlistId,
                        imageUri
                    ).then(response => {
                        dispatch(setMergerStatus(false, 'Finished!'));
                        dispatch(setMergerStatus(false, ''));
                    });
                } else {
                    dispatch(setMergerStatus(false, 'Finished!'));
                    dispatch(setMergerStatus(false, ''));
                }
            });
        });
    };
};

export const SET_OPEN_STATUS_MY_PLAYLISTS = 'SET_OPEN_STATUS_MY_PLAYLISTS';
export const setOpenStatusMyPlaylists = isOpen => {
    return {
        type: SET_OPEN_STATUS_MY_PLAYLISTS,
        isOpen
    };
};

export const ADD_PLAYLIST_TO_FINAL = 'ADD_PLAYLIST_TO_FINAL';
export const addPlaylistToFinal = playlist => {
    return {
        type: ADD_PLAYLIST_TO_FINAL,
        receivedAt: Date.now(),
        playlist
    };
};

export const REMOVE_PLAYLIST_FROM_FINAL = 'REMOVE_PLAYLIST_FROM_FINAL';
export const removePlaylistFromFinal = playlist => {
    return {
        type: REMOVE_PLAYLIST_FROM_FINAL,
        receivedAt: Date.now(),
        playlist
    };
};

export const ADD_PLAYLIST_TRACK_TO_FINAL = 'ADD_PLAYLIST_TRACK_TO_FINAL';
export const addPlaylistTrackToFinal = (track, playlist) => {
    return {
        type: ADD_PLAYLIST_TRACK_TO_FINAL,
        receivedAt: Date.now(),
        playlist,
        track
    };
};

export const REMOVE_PLAYLIST_TRACK_FROM_FINAL =
    'REMOVE_PLAYLIST_TRACK_FROM_FINAL';
export const removePlaylistTrackFromFinal = (track, playlist) => {
    return {
        type: REMOVE_PLAYLIST_TRACK_FROM_FINAL,
        receivedAt: Date.now(),
        playlist,
        track
    };
};

// Nav actions
export const SET_NAV_INDEX = 'SET_NAV_INDEX';
export const setNavIndex = (index = 0) => {
    return {
        type: SET_NAV_INDEX,
        index
    };
};

// My playlists search term
export const SET_MY_SEARCH_TERM = 'SET_MY_SEARCH_TERM';
export const setMySearchTerm = (searchTerm = '') => {
    return {
        type: SET_MY_SEARCH_TERM,
        searchTerm
    };
};

// final playlist actions
export const SET_FINAL_PLAYLIST_OPEN = 'SET_FINAL_PLAYLIST_OPEN';
export const setFinalPlaylistOpen = (playlistID, isOpen) => {
    return {
        type: SET_FINAL_PLAYLIST_OPEN,
        playlistID,
        isOpen
    };
};

export const SET_FINAL_SEARCH_TERM = 'SET_FINAL_SEARCH_TERM';
export const setFinalSearchTerm = (searchTerm = '') => {
    return {
        type: SET_FINAL_SEARCH_TERM,
        searchTerm
    };
};

export const SET_OPEN_STATUS_FINAL_PLAYLISTS =
    'SET_OPEN_STATUS_FINAL_PLAYLISTS';
export const setOpenStatusFinalPlaylists = (isOpen = false) => {
    return {
        type: SET_OPEN_STATUS_FINAL_PLAYLISTS,
        isOpen
    };
};

export const SET_NEW_PLAYLIST_NAME = 'SET_NEW_PLAYLIST_NAME';
export const setNewPlaylistName = playlsitName => {
    return {
        type: SET_NEW_PLAYLIST_NAME,
        playlsitName
    };
};

export const SET_NEW_PLAYLIST_DESC = 'SET_NEW_PLAYLIST_DESC';
export const setNewPlaylistDesc = playlistDesc => {
    return {
        type: SET_NEW_PLAYLIST_DESC,
        playlistDesc
    };
};

export const SET_FINAL_PLAYLIST_PUBLIC = 'SET_FINAL_PLAYLIST_PUBLIC';
export const setFinalPlaylistPublic = isPublic => {
    return {
        type: SET_FINAL_PLAYLIST_PUBLIC,
        isPublic
    };
};

export const SET_FINAL_PLAYLIST_IMAGE_URI = 'SET_FINAL_PLAYLIST_IMAGE_URI';
export const setFinalPlaylistImageURI = imageUri => {
    return {
        type: SET_FINAL_PLAYLIST_IMAGE_URI,
        imageUri
    };
};
