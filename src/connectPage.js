import { connect } from 'react-redux';
import { fetchMyPlaylists } from './actions';

const mapStateToProps = state => ({
    myPlaylists: state.myPlaylists
});

export const mapDispatchToProps = dispatch => ({
    fetchMyPlaylists() {
        dispatch(fetchMyPlaylists());
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
