import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    setOpenStatusMyPlaylists,
    addPlaylistTrackToFinal,
    checkIfAuthenticated,
    setMyPlaylistVisited,
    fetchPlaylistTracks,
    addPlaylistToFinal,
    fetchMyPlaylists,
    setPlaylistOpen
} from './actions';

const mapStateToProps = state => ({
    myPlaylists: state.myPlaylists,
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
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
