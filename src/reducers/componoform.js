import {
    SET_FINAL_PLAYLIST_URL,
    RECEIVE_MY_PLAYLISTS_FOR_SELECTION,
    REQUEST_MY_PLAYLISTS_FOR_SELECTION,
    SET_COMPONOFORM_OPEN_STATUS,
    SET_COMPONOFORM_ADD_EXISTING_STATUS
} from '../actions';

const DEFAULT_STATE = {
    isFetching: false,
    wasOpen: false,
    wasAddExistingOpen: false,
    listOfMyPlaylists: [],
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
        case SET_COMPONOFORM_OPEN_STATUS:
            return Object.assign({}, state, { wasOpen: action.wasOpen });
        case SET_COMPONOFORM_ADD_EXISTING_STATUS:
            return Object.assign({}, state, {
                wasAddExistingOpen: action.wasAddExistingOpen
            });
        default:
            return state;
    }
};
