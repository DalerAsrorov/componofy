import {
    SET_FINAL_PLAYLIST_URL,
    RECEIVE_MY_PLAYLISTS_FOR_SELECTION,
    REQUEST_MY_PLAYLISTS_FOR_SELECTION
} from '../actions';

const DEFAULT_STATE = {
    isFetching: false,
    listOfMyPlaylists: '',
    finalPlaylistUrl: ''
};

export const componoform = (state = DEFAULT_STATE, action) => {
    let listOfMyPlaylists, numberOfTracks;

    switch (action.type) {
        case SET_FINAL_PLAYLIST_URL:
            return Object.assign({}, state, {
                finalPlaylistUrl: action.url
            });
        case REQUEST_MY_PLAYLISTS_FOR_SELECTION:
            return Object.assign({}, state, { isFetching: true });
        case RECEIVE_MY_PLAYLISTS_FOR_SELECTION:
            listOfMyPlaylists = [
                ...state.listOfMyPlaylists,
                ...action.playlists
            ];

            numberOfTracks = action.numberOfTracks;

            return Object.assign({}, state, {
                listOfMyPlaylists,
                numberOfTracks,
                isFetching: false
            });
        default:
            return state;
    }
};
