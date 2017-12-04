import {
    SET_NEW_PLAYLIST_NAME,
    SET_NEW_PLAYLIST_DESC,
    SET_FINAL_PLAYLIST_PUBLIC,
    SET_FINAL_PLAYLIST_IMAGE_URI
} from '../actions';

export const componoform = (
    state = {
        playlistName: '',
        playlistDesc: '',
        imageUri: '',
        isPublic: true
    },
    action
) => {
    switch (action.type) {
        case SET_NEW_PLAYLIST_NAME:
            return Object.assign({}, state, {
                playlistName: action.playlsitName
            });
        case SET_NEW_PLAYLIST_DESC:
            return Object.assign({}, state, {
                playlistDesc: action.playlistDesc
            });
        case SET_FINAL_PLAYLIST_PUBLIC:
            return Object.assign({}, state, {
                isPublic: action.isPublic
            });
        case SET_FINAL_PLAYLIST_IMAGE_URI:
            return Object.assign({}, state, { imageUri: action.imageUri });
        default:
            return state;
    }
};
