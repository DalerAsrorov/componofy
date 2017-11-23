import { normalize } from 'normalizr';
import { mergeDeepLeft, clone, isEmpty, reject, equals } from 'ramda';
import {
    ADD_PLAYLIST_TO_FINAL,
    ADD_PLAYLIST_TRACK_TO_FINAL,
    REMOVE_PLAYLIST_FROM_FINAL,
    REMOVE_PLAYLIST_TRACK_FROM_FINAL
} from '../actions';
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
            playlists = clone(state.playlists);
            let trackToAdd = clone(action.track);
            let playlistsCopy = clone(state.playlists);
            let { tracks: { list: playlistTracks } } = playlist;
            let newPlaylists;

            if (
                playlists.entities &&
                playlists.entities.playlists[playlist.id]
            ) {
                playlist = playlists.entities.playlists[playlist.id];
                playlist.tracks.list.push(trackToAdd.id);
                playlists.entities.tracks[trackToAdd.id] = trackToAdd;
            } else {
                playlist.tracks.list = playlist.tracks.list.filter(
                    track => track.id === trackToAdd.id
                );
                normalizedPlaylist = normalize(playlist, playlistSchema);
                playlists = mergeDeepLeft(state.playlists, normalizedPlaylist);
            }

            return {
                lastUpdated: receivedAt,
                playlists
            };
        case REMOVE_PLAYLIST_FROM_FINAL:
            receivedAt = action.receivedAt;
            let statePlaylists = clone(state.playlists);
            playlists = statePlaylists.entities.playlists;

            delete playlists[action.playlist.id];

            return {
                playlists: statePlaylists,
                lastUpdated: receivedAt
            };
        case REMOVE_PLAYLIST_TRACK_FROM_FINAL:
            receivedAt = action.receivedAt;
            statePlaylists = clone(state.playlists);
            playlists = statePlaylists.entities.playlists;
            let playlistTracklist = playlists[action.playlist.id].tracks.list;

            playlistTracklist = reject(
                equals(action.track.id),
                playlistTracklist
            );

            playlists[action.playlist.id].tracks.list = playlistTracklist;

            return {
                lastUpdated: receivedAt,
                playlists: statePlaylists
            };

        default:
            return state;
    }
};
