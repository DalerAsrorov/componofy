import { SET_FINAL_PLAYLIST_URL } from '../actions';

export const componoform = (state = { finalPlaylistUrl: '' }, action) => {
    switch (action.type) {
        case SET_FINAL_PLAYLIST_URL:
            return Object.assign({}, state, {
                finalPlaylistUrl: action.url
            });
        default:
            return state;
    }
};
