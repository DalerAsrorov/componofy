import { normalize } from 'normalizr';
import { mergeDeepLeft } from 'ramda';
import { ADD_PLAYLIST_TO_FINAL } from '../actions';
import { playlist as playlistSchema } from '../utils/schemas';

export const finalPlaylists = (
    state = {
        isFetching: false,
        playlists: {},
        lastUpdated: 0,
        isVisited: false
    },
    action
) => {
    switch (action.type) {
        case ADD_PLAYLIST_TO_FINAL:
            let { playlist, receivedAt } = action;
            let { playlists } = state;

            let normalizedPlaylist = normalize(playlist, playlistSchema);
            playlists = mergeDeepLeft(normalizedPlaylist, playlists);

            return {
                lastUpdated: receivedAt,
                playlists
            };
        default:
            return state;
    }
};
