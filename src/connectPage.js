import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as R from 'ramda';
import {
    setComponoformAddExistingStatus,
    removePlaylistTrackFromFinal,
    setOpenStatusPublicPlaylists,
    fetchMyPlaylistsForSelection,
    setOpenStatusFinalPlaylists,
    setOpenStatusMyPlaylists,
    setFinalPlaylistImageURI,
    setPublicPlaylistsVisited,
    setComponoformOpenStatus,
    addPlaylistTrackToFinal,
    removePlaylistFromFinal,
    setSearchResultsMessage,
    setFinalPlaylistPublic,
    searchPublicPlaylists,
    setPublicPlaylistOpen,
    checkIfAuthenticated,
    setMyPlaylistVisited,
    setFinalPlaylistOpen,
    launchPlaylistMerger,
    setFinalPlaylistUrl,
    setSelectedPlaylist,
    fetchPlaylistTracks,
    setPublicSearchTerm,
    setNewPlaylistDesc,
    removeErrorFromApp,
    setFinalSearchTerm,
    addPlaylistToFinal,
    setComponofyMode,
    fetchMyPlaylists,
    setPlaylistOpen,
    setMySearchTerm,
    clearFinalData,
    addErrorToApp,
    setNavIndex,
    logOutUser
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
    publicPlaylistsHasOpenPlaylist: hasOpenPlaylist(state.publicPlaylists),
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
    user: state.user,
    errors: state.errors
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

    launchPlaylistMerger(playlistName) {
        dispatch(launchPlaylistMerger(playlistName));
    },

    clearFinalData() {
        dispatch(clearFinalData());
    },

    setPublicSearchTerm(searchTerm) {
        dispatch(setPublicSearchTerm(searchTerm));
    },

    setPublicPlaylistsVisited(isVisited) {
        dispatch(setPublicPlaylistsVisited(isVisited));
    },

    searchPublicPlaylists(shouldLoadMore) {
        dispatch(searchPublicPlaylists(shouldLoadMore));
    },

    setPublicPlaylistOpen(playlistId, isOpen) {
        dispatch(setPublicPlaylistOpen(playlistId, isOpen));
    },

    setSearchResultsMessage(message) {
        dispatch(setSearchResultsMessage(message));
    },

    setOpenStatusPublicPlaylists(hasOpenPlaylist) {
        dispatch(setOpenStatusPublicPlaylists(hasOpenPlaylist));
    },

    logOutUser() {
        dispatch(logOutUser());
    },

    addErrorToApp(error, errorId) {
        dispatch(addErrorToApp(error, errorId));
    },

    removeErrorFromApp(errorId) {
        dispatch(removeErrorFromApp(errorId));
    },

    setComponofyMode(hasChosenNewCreate) {
        dispatch(setComponofyMode(hasChosenNewCreate));
    },

    fetchMyPlaylistsForSelection(offset) {
        dispatch(fetchMyPlaylistsForSelection(offset));
    },

    setComponoformOpenStatus(wasOpen) {
        dispatch(setComponoformOpenStatus(wasOpen));
    },

    setComponoformAddExistingStatus(wasOpen) {
        dispatch(setComponoformAddExistingStatus(wasOpen));
    },

    setSelectedPlaylist(playlistId) {
        dispatch(setSelectedPlaylist(playlistId));
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
