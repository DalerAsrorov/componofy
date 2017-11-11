import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    fetchMyPlaylists,
    checkIfAuthenticated,
    loadMoreMyPlaylists
} from './actions';

const mapStateToProps = state => ({
    myPlaylists: state.myPlaylists,
    user: state.user
});

export const mapDispatchToProps = dispatch => ({
    fetchMyPlaylists(offset) {
        dispatch(fetchMyPlaylists(offset));
    },

    loadMoreMyPlaylists(offset) {
        dispatch(loadMoreMyPlaylists(offset));
    },

    navigateTo(path) {
        dispatch(push(path));
    },

    checkIfAuthenticated() {
        dispatch(checkIfAuthenticated());
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
