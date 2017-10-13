import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchMyPlaylists } from './actions';

const mapStateToProps = state => ({
    myPlaylists: state.myPlaylists
});

export const mapDispatchToProps = dispatch => ({
    fetchMyPlaylists() {
        dispatch(fetchMyPlaylists());
    },

    navigateTo(path) {
        dispatch(push(path));
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
