import { SET_NEW_PLAYLIST_NAME, SET_FINAL_PLAYLIST_PUBLIC } from '../actions';

export const componoform = (
    state = {
        playlistName: '',
        isPublic: true
    },
    action
) => {
    switch (action.type) {
        case SET_NEW_PLAYLIST_NAME:
            return Object.assign({}, state, {
                playlistName: action.playlsitName
            });
        case SET_FINAL_PLAYLIST_PUBLIC:
            return Object.assign({}, state, {
                isPublic: action.isPublic
            });
        default:
            return state;
    }
};
