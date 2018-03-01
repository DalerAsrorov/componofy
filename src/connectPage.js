import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as R from 'ramda';
import * as actions from './actions';

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

const getNumberOfAddedTracksFromPlaylist = (finalPlaylists, ownProps) => {
    if (!ownProps.playlist || R.isEmpty(finalPlaylists)) {
        return;
    }

    const { playlist: { id: playlistId } } = ownProps;
    const { entities: { playlists } = {} } = finalPlaylists;
    let numberOfAddedTracks = 0;

    if (!R.isEmpty(playlists) && playlists[playlistId]) {
        let { tracks: { list: tracklist } } = playlists[playlistId];
        numberOfAddedTracks = tracklist.length;
    }

    return numberOfAddedTracks;
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
    numberOfAddedTracksFromThisPlaylist: getNumberOfAddedTracksFromPlaylist(
        state.finalPlaylists.playlists,
        ownProps
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
        dispatch(actions.fetchMyPlaylists(offset));
    },

    fetchPlaylistTracks(playlistID, tracks) {
        dispatch(actions.fetchPlaylistTracks(playlistID, tracks));
    },

    navigateTo(path) {
        dispatch(push(path));
    },

    checkIfAuthenticated() {
        dispatch(actions.checkIfAuthenticated());
    },

    setOpenStatusMyPlaylists(isOpen) {
        dispatch(actions.setOpenStatusMyPlaylists(isOpen));
    },

    setPlaylistOpen(playlistID, isOpen) {
        dispatch(actions.setPlaylistOpen(playlistID, isOpen));
    },

    setFinalPlaylistOpen(playlistID, isOpen) {
        dispatch(actions.setFinalPlaylistOpen(playlistID, isOpen));
    },

    setFinalSearchTerm(searchTerm) {
        dispatch(actions.setFinalSearchTerm(searchTerm));
    },

    setMyPlaylistVisited(isVisited) {
        dispatch(actions.setMyPlaylistVisited(isVisited));
    },

    addPlaylistToFinal(playlist = {}) {
        dispatch(actions.addPlaylistToFinal(playlist));
    },

    addPlaylistTrackToFinal(track, playlist) {
        dispatch(actions.addPlaylistTrackToFinal(track, playlist));
    },

    removePlaylistFromFinal(playlist) {
        dispatch(actions.removePlaylistFromFinal(playlist));
    },

    removePlaylistTrackFromFinal(track, playlist) {
        dispatch(actions.removePlaylistTrackFromFinal(track, playlist));
    },

    setOpenStatusFinalPlaylists(isOpen) {
        dispatch(actions.setOpenStatusFinalPlaylists(isOpen));
    },

    setNavIndex(index) {
        dispatch(actions.setNavIndex(index));
    },

    setMySearchTerm(searchTerm) {
        dispatch(actions.setMySearchTerm(searchTerm));
    },

    setNewPlaylistDesc(desc) {
        dispatch(actions.setNewPlaylistDesc(desc));
    },

    setFinalPlaylistPublic(isPublic) {
        dispatch(actions.setFinalPlaylistPublic(isPublic));
    },

    setFinalPlaylistImageURI(imageUri) {
        dispatch(actions.setFinalPlaylistImageURI(imageUri));
    },

    setFinalPlaylistUrl(url) {
        dispatch(actions.setFinalPlaylistUrl(url));
    },

    launchPlaylistMerger(playlistName) {
        dispatch(actions.launchPlaylistMerger(playlistName));
    },

    clearFinalData() {
        dispatch(actions.clearFinalData());
    },

    setPublicSearchTerm(searchTerm) {
        dispatch(actions.setPublicSearchTerm(searchTerm));
    },

    setPublicPlaylistsVisited(isVisited) {
        dispatch(actions.setPublicPlaylistsVisited(isVisited));
    },

    searchPublicPlaylists(shouldLoadMore) {
        dispatch(actions.searchPublicPlaylists(shouldLoadMore));
    },

    setPublicPlaylistOpen(playlistId, isOpen) {
        dispatch(actions.setPublicPlaylistOpen(playlistId, isOpen));
    },

    setSearchResultsMessage(message) {
        dispatch(actions.setSearchResultsMessage(message));
    },

    setOpenStatusPublicPlaylists(hasOpenPlaylist) {
        dispatch(actions.setOpenStatusPublicPlaylists(hasOpenPlaylist));
    },

    logOutUser() {
        dispatch(actions.logOutUser());
    },

    addErrorToApp(error, errorId) {
        dispatch(actions.addErrorToApp(error, errorId));
    },

    removeErrorFromApp(errorId) {
        dispatch(actions.removeErrorFromApp(errorId));
    },

    setComponofyMode(hasChosenNewCreate) {
        dispatch(actions.setComponofyMode(hasChosenNewCreate));
    },

    fetchMyPlaylistsForSelection(offset, limit) {
        dispatch(actions.fetchMyPlaylistsForSelection(offset, limit));
    },

    setComponoformOpenStatus(wasOpen) {
        dispatch(actions.setComponoformOpenStatus(wasOpen));
    },

    setComponoformAddExistingStatus(wasOpen) {
        dispatch(actions.setComponoformAddExistingStatus(wasOpen));
    },

    setSelectedPlaylist(playlistId) {
        dispatch(actions.setSelectedPlaylist(playlistId));
    },

    clearComponoformData() {
        dispatch(actions.clearComponoformData());
    },

    setFinalTracksShowStatus(shouldShowOnlyTracks) {
        dispatch(actions.setFinalTracksShowStatus(shouldShowOnlyTracks));
    },

    setCurrentSelectionOffset(offset) {
        dispatch(actions.setCurrentSelectionOffset(offset));
    },

    reorderPlaylistTracks(playlistId, trackId, startPos, endPos) {
        dispatch(
            actions.reorderPlaylistTracks(playlistId, trackId, startPos, endPos)
        );
    },

    setPlaylistDragStatus(playlistId, hasReorderRequest) {
        dispatch(actions.setPlaylistDragStatus(playlistId, hasReorderRequest));
    },

    setOpenStatusForAllPlaylists(isOpen) {
        dispatch(actions.setOpenStatusForAllPlaylists(isOpen));
    },

    startPlaylistTracksReorderProcess(playlistId, trackId, startPos, endPos) {
        dispatch(
            actions.startPlaylistTracksReorderProcess(
                playlistId,
                trackId,
                startPos,
                endPos
            )
        );
    },

    generateRefreshToken() {
        dispatch(actions.generateRefreshToken());
    }
});

export const connectStream = ComponentClass =>
    connect(mapStateToProps, mapDispatchToProps)(ComponentClass);
