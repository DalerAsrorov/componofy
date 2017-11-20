import { normalize } from 'normalizr';
import { mergeDeepLeft, clone } from 'ramda';
import { ADD_PLAYLIST_TO_FINAL, ADD_PLAYLIST_TRACK_TO_FINAL } from '../actions';
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
            let { playlists } = clone(state);

            let normalizedPlaylist = normalize(playlist, playlistSchema);
            playlists = mergeDeepLeft(normalizedPlaylist, playlists);

            return {
                lastUpdated: receivedAt,
                playlists
            };
        case ADD_PLAYLIST_TRACK_TO_FINAL:
            receivedAt = action.receivedAt;
            playlist = clone(action.playlist);
            let trackToAdd = action.track;
            let { tracks: { list: playlistTracks } } = playlist;

            if (state.playlists[playlist.id]) {
                let {
                    entities: { playlists: statePlaylists, tracks: stateTracks }
                } = state.playlists;
                statePlaylists[playlist.id].tracks.list.push(trackToAdd.id);
                stateTracks[trackToAdd.id] = trackToAdd;
            } else {
                playlist.tracks.list = playlistTracks.filter(
                    track => track.id === trackToAdd.id
                );
            }
            normalizedPlaylist = normalize(playlist, playlistSchema);
            debugger;
        // playlists = mergeDeepLeft(normalizedPlaylist, playlists);

        // return {
        //     lastUpdated: receivedAt,
        //     playlists
        // };
        default:
            return state;
    }
};
