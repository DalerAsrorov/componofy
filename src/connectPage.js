import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { contains } from 'ramda';
import {
    removePlaylistTrackFromFinal,
    setOpenStatusMyPlaylists,
    addPlaylistTrackToFinal,
    removePlaylistFromFinal,
    checkIfAuthenticated,
    setMyPlaylistVisited,
    fetchPlaylistTracks,
    addPlaylistToFinal,
    fetchMyPlaylists,
    setPlaylistOpen
} from './actions';

const isIn = (data, ownProps, key) => {
    let containsData = false;
    const { entities } = data;

    if (entities && ownProps[key]) {
        const value = ownProps[key];
        containsData = !!entities[`${key}s`][value.id];
    }

    return containsData;
};

const trackIsIn = (data, ownProps, key) => {
    if (!isIn(data, ownProps, 'playlist') || !isIn(data, ownProps, key)) {
        return false;
    }

    const { entities } = data;
    const [propsPlaylistID, propsTrackID] = [
        ownProps.playlist.id,
        ownProps.track.id
    ];
    let playlist = entities.playlists[propsPlaylistID];

    return contains(propsTrackID, playlist.tracks.list);
};

const mapStateToProps = (state, ownProps) => ({
    myPlaylists: state.myPlaylists,
    containsThisPlaylist: isIn(
        state.finalPlaylists.playlists,
        ownProps,
        'playlist'
    ),
    playlistContainsThisTrack: trackIsIn(
        state.finalPlaylists.playlists,
        ownProps,
        'track'
    ),
    user: state.user
});

export const mapDispatchToProps = dispatch => ({
    fetchMyPlaylists(offset) {
        dispatch(fetchMyPlaylists(offset));
    },

    fetchPlaylistTracks(playlistID, tracks) {
        dispatch(fetchPlaylistTracks(playlistID, tracks));
    },

    navigateTo(path) {
        dispatch(push(path));
    },

    checkIfAuthenticated() {
        dispatch(checkIfAuthenticated());
    },

    setPlaylistOpen(playlistID, isOpen) {
        dispatch(setPlaylistOpen(playlistID, isOpen));
    },

    setMyPlaylistVisited(isVisited) {
        dispatch(setMyPlaylistVisited(isVisited));
    },

    setOpenStatusMyPlaylists(isOpen = false) {
        dispatch(setOpenStatusMyPlaylists(isOpen));
    },

    addPlaylistToFinal(playlist = {}) {
        dispatch(addPlaylistToFinal(playlist));
    },

    addPlaylistTrackToFinal(track, playlist) {
        dispatch(addPlaylistTrackToFinal(track, playlist));
    },

    removePlaylistFromFinal(playlist) {
        dispatch(removePlaylistFromFinal(playlist));
    },

    removePlaylistTrackFromFinal(track, playlist) {
        dispatch(removePlaylistTrackFromFinal(track, playlist));
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
