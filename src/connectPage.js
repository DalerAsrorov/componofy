import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as R from 'ramda';
import {
    removePlaylistTrackFromFinal,
    setOpenStatusFinalPlaylists,
    setOpenStatusMyPlaylists,
    setFinalPlaylistImageURI,
    addPlaylistTrackToFinal,
    removePlaylistFromFinal,
    setFinalPlaylistPublic,
    checkIfAuthenticated,
    setMyPlaylistVisited,
    setFinalPlaylistOpen,
    launchPlaylistMerger,
    setFinalPlaylistUrl,
    fetchPlaylistTracks,
    setPublicSearchTerm,
    setNewPlaylistName,
    setNewPlaylistDesc,
    setFinalSearchTerm,
    addPlaylistToFinal,
    fetchMyPlaylists,
    setPlaylistOpen,
    setMySearchTerm,
    clearFinalData,
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

const hasOpenPlaylist = playlistState => {
    if (R.isEmpty(playlistState.playlists)) {
        return false;
    }

    let { playlists } = playlistState;
    const isOpen = playlist => playlist.isOpen;

    if (R.is(Array, playlists)) {
        return playlists.some(playlist => isOpen(playlist));
    }

    return R.pipe(R.path(['entities', 'playlists']), R.values, R.any(isOpen))(
        playlists
    );
};

const mapStateToProps = (state, ownProps) => ({
    finalPlaylists: state.finalPlaylists,
    myPlaylists: state.myPlaylists,
    publicPlaylists: state.publicPlaylists,
    myPlaylistsHasOpenPlaylist: hasOpenPlaylist(state.myPlaylists),
    finalPlaylistsHasOpenPlaylist: hasOpenPlaylist(state.finalPlaylists),
    navigation: state.navigation,
    numberOfFinalPlaylists: R.length(
        R.keys(getPlaylistsData(state.finalPlaylists.playlists, 'playlists'))
    ),
    numberOfTracksInFinalPlaylist: getNumberOfTracks(
        getPlaylistsData(state.finalPlaylists.playlists, 'playlists')
    ),
    componoform: state.componoform,
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

    setOpenStatusFinalPlaylists(isOpen) {
        dispatch(setOpenStatusFinalPlaylists(isOpen));
    },

    setNavIndex(index) {
        dispatch(setNavIndex(index));
    },

    setMySearchTerm(searchTerm) {
        dispatch(setMySearchTerm(searchTerm));
    },

    setNewPlaylistName(name) {
        dispatch(setNewPlaylistName(name));
    },

    setNewPlaylistDesc(desc) {
        dispatch(setNewPlaylistDesc(desc));
    },

    setFinalPlaylistPublic(isPublic) {
        dispatch(setFinalPlaylistPublic(isPublic));
    },

    setFinalPlaylistImageURI(imageUri) {
        dispatch(setFinalPlaylistImageURI(imageUri));
    },

    setFinalPlaylistUrl(url) {
        dispatch(setFinalPlaylistUrl(url));
    },

    launchPlaylistMerger() {
        dispatch(launchPlaylistMerger());
    },

    clearFinalData() {
        dispatch(clearFinalData());
    },

    setPublicSearchTerm(searchTerm) {
        dispatch(setPublicSearchTerm(searchTerm));
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
