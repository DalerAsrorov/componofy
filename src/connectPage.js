import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    fetchMyPlaylists,
    checkIfAuthenticated,
    setPlaylistOpen,
    setMyPlaylistVisited
} from './actions';

const mapStateToProps = state => ({
    myPlaylists: state.myPlaylists,
    user: state.user
});

export const mapDispatchToProps = dispatch => ({
    fetchMyPlaylists(offset) {
        dispatch(fetchMyPlaylists(offset));
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
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
