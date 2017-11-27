import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as R from 'ramda';
import {
    removePlaylistTrackFromFinal,
    setOpenStatusMyPlaylists,
    addPlaylistTrackToFinal,
    removePlaylistFromFinal,
    checkIfAuthenticated,
    setMyPlaylistVisited,
    setFinalPlaylistOpen,
    fetchPlaylistTracks,
    setFinalSearchTerm,
    addPlaylistToFinal,
    fetchMyPlaylists,
    setPlaylistOpen,
    setMySearchTerm,
    setNavIndex
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

    return R.contains(propsTrackID, playlist.tracks.list);
};

const getPlaylistsData = (playlistsData, key) => {
    let data = {};

    if (playlistsData.entities) {
        data = playlistsData.entities[key];
    }

    return data;
};

const playlistIsIn = (data, ownProps, key) => {
    let hasPlaylist = false;

    if (isIn(data, ownProps, key)) {
        hasPlaylist = true;
    }

    if (hasPlaylist) {
        let playlist = data.entities.playlists[ownProps.playlist.id];
        hasPlaylist = !R.isEmpty(playlist.tracks.list);
    }

    return hasPlaylist;
};

const getNumberOfTracks = playlists => {
    const calculateTotalLength = (accum, track) => {
        return accum + track.list.length;
    };

    const result = R.pipe(
        R.values,
        R.map(R.prop('tracks')),
        R.reduce(calculateTotalLength, 0)
    )(playlists);

    return result;
};

const mapStateToProps = (state, ownProps) => ({
    finalPlaylists: state.finalPlaylists,
    myPlaylists: state.myPlaylists,
    navigation: state.navigation,
    numberOfFinalPlaylists: R.length(
        R.keys(getPlaylistsData(state.finalPlaylists.playlists, 'playlists'))
    ),
    numberOfTracksInFinalPlaylist: getNumberOfTracks(
        getPlaylistsData(state.finalPlaylists.playlists, 'playlists')
    ),
    containsThisPlaylist: playlistIsIn(
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

    setOpenStatusMyPlaylists(isOpen) {
        dispatch(setOpenStatusMyPlaylists(isOpen));
    },

    setPlaylistOpen(playlistID, isOpen) {
        dispatch(setPlaylistOpen(playlistID, isOpen));
    },

    setFinalPlaylistOpen(playlistID, isOpen) {
        dispatch(setFinalPlaylistOpen(playlistID, isOpen));
    },

    setFinalSearchTerm(searchTerm) {
        dispatch(setFinalSearchTerm(searchTerm));
    },

    setMyPlaylistVisited(isVisited) {
        dispatch(setMyPlaylistVisited(isVisited));
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
    },

    setNavIndex(index) {
        dispatch(setNavIndex(index));
    },

    setMySearchTerm(searchTerm) {
        dispatch(setMySearchTerm(searchTerm));
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
