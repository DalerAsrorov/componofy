import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    fetchMyPlaylists,
    fetchPlaylistTracks,
    checkIfAuthenticated,
    setPlaylistOpen,
    setMyPlaylistVisited,
    setOpenStatusMyPlaylists
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
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
