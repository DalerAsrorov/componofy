import {
    SET_FINAL_PLAYLIST_URL,
    RECEIVE_MY_PLAYLISTS_FOR_SELECTION,
    REQUEST_MY_PLAYLISTS_FOR_SELECTION,
    SET_COMPONOFORM_OPEN_STATUS,
    SET_COMPONOFORM_ADD_EXISTING_STATUS,
    SET_SELECTED_PLAYLIST,
    CLEAR_COMPONOFORM_DATA
} from '../actions';

const DEFAULT_STATE = {
    isFetchingOptions: false,
    wasOpen: false,
    wasAddExistingOpen: false,
    listOfMyPlaylists: [],
    finalPlaylistUrl: '',
    selectedPlaylistId: ''
};

export const componoform = (state = DEFAULT_STATE, action) => {
    let listOfMyPlaylists, numberOfTracks;

    switch (action.type) {
        case SET_FINAL_PLAYLIST_URL:
            return Object.assign({}, state, {
                finalPlaylistUrl: action.url
            });
        case REQUEST_MY_PLAYLISTS_FOR_SELECTION:
            return Object.assign({}, state, { isFetchingOptions: true });
        case RECEIVE_MY_PLAYLISTS_FOR_SELECTION:
            listOfMyPlaylists = [
                ...state.listOfMyPlaylists,
                ...action.playlists
            ];

            numberOfTracks = action.numberOfTracks;

            return Object.assign({}, state, {
                listOfMyPlaylists,
                numberOfTracks,
                isFetchingOptions: false
            });
        case SET_COMPONOFORM_OPEN_STATUS:
            return Object.assign({}, state, { wasOpen: action.wasOpen });
        case SET_COMPONOFORM_ADD_EXISTING_STATUS:
            return Object.assign({}, state, {
                wasAddExistingOpen: action.wasAddExistingOpen
            });
        case SET_SELECTED_PLAYLIST:
            return Object.assign({}, state, {
                selectedPlaylistId: action.playlistId
            });
        case CLEAR_COMPONOFORM_DATA:
            return Object.assign({}, state, DEFAULT_STATE);
        default:
            return state;
    }
};
