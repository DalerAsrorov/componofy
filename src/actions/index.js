import { push } from 'react-router-redux';
import {
  getMyPlaylists,
  getMyStatus,
  getPlaylistTracks,
  createPlaylist,
  addTracksToPlaylist,
  uploadPlaylistCoverImage,
  reorderTracksInPlaylist,
  searchPlaylists,
  getLogOutUser,
  requestRefreshToken,
  getMyTopTracks,
} from '../api';
import { isEmpty, find, propEq } from 'ramda';
import { formatTracks, getAllPlaylistsTrackIds } from '../utils/helpers';
import { PLAYLIST_OFFSET_LIMIT } from '../utils/constants';

export const ADD_ERROR_TO_APP = 'ADD_ERROR_TO_APP';
export const addErrorToApp = (
  message = '',
  timeout = 10000,
  errorId = Date.now()
) => ({
  type: ADD_ERROR_TO_APP,
  errorId,
  timeout,
  message,
});

export const REQUEST_PLAYLISTS = 'REQUEST_PLAYLISTS';
const requestPlaylists = () => ({
  type: REQUEST_PLAYLISTS,
});

export const RECEIVE_PLAYLISTS = 'RECEIVE_PLAYLISTS';
const receivePlaylists = (json) => ({
  type: RECEIVE_PLAYLISTS,
  playlists: json.data.body ? json.data.body.items : [],
  numberOfTracks: json.data.body ? json.data.body.total : 0,
  receivedAt: Date.now(),
});

export const fetchMyPlaylists = (offset) => (dispatch, getState) => {
  dispatch(requestPlaylists());

  return getMyPlaylists(offset).then((json) =>
    dispatch(receivePlaylists(json))
  );
};

export const RECEIVED_AUTH_STATE = 'RECEIVED_AUTH_STATE';
const receivedAuthState = (userInfo) => ({
  type: RECEIVED_AUTH_STATE,
  userInfo,
});

export const checkIfAuthenticated = () => (dispatch) => {
  return getMyStatus().then(
    (userInfo) => {
      const { isAuthenticated } = userInfo;
      dispatch(receivedAuthState(userInfo));

      if (!isAuthenticated) {
        dispatch(push('/'));
      }
    },
    (error) => addErrorToApp(`Failed to get the user's authentication status.`)
  );
};

export const SET_PLAYLIST_OPEN = 'SET_PLAYLIST_OPEN';
export const setPlaylistOpen = (playlistID, isOpen) => ({
  type: SET_PLAYLIST_OPEN,
  playlistID,
  isOpen,
});

export const SET_MY_PLAYLIST_VISITED = 'SET_MY_PLAYLIST_VISITED';
export const setMyPlaylistVisited = (isVisited) => ({
  type: SET_MY_PLAYLIST_VISITED,
  isVisited,
});

export const REQUEST_PLAYLIST_TRACKS = 'REQUEST_PLAYLIST_TRACKS';
export const requestPlaylistTracks = () => ({
  type: REQUEST_PLAYLIST_TRACKS,
});

export const RECEIVED_PLAYLIST_TRACKS = 'RECEIVED_PLAYLIST_TRACKS';
export const receivedPlaylistTracks = (playlistID, tracks) => ({
  type: RECEIVED_PLAYLIST_TRACKS,
  receivedTracksAt: Date.now(),
  tracks: formatTracks(tracks),
  playlistID,
});

export const RECEIVED_PUBLIC_PLAYLIST_TRACKS =
  'RECEIVED_PUBLIC_PLAYLIST_TRACKS';
export const receivedPublicPlaylistTracks = (playlistId, tracks) => ({
  type: RECEIVED_PUBLIC_PLAYLIST_TRACKS,
  receivedTracksAt: Date.now(),
  tracks: formatTracks(tracks),
  playlistId,
});

export const fetchPlaylistTracks = (userId, playlistId) => (
  dispatch,
  getState
) => {
  const {
    router: {
      location: { pathname },
    },
    navigation: { indexToRouteMap },
  } = getState();

  return getPlaylistTracks(userId, playlistId).then((response) => {
    const {
      data: { body: payload },
    } = response;
    let tracks = [];

    if (payload) {
      tracks = payload.items;
    }

    switch (pathname) {
      case indexToRouteMap[0]:
        dispatch(receivedPlaylistTracks(playlistId, tracks));
        break;
      case indexToRouteMap[1]:
        dispatch(receivedPublicPlaylistTracks(playlistId, tracks));
        break;
      default:
        break;
    }
  });
};

export const SET_MERGER_STATUS = 'SET_MERGER_STATUS';
export const setMergerStatus = (status, statusText) => ({
  type: SET_MERGER_STATUS,
  statusText,
  status,
});

export const SET_FINAL_PLAYLIST_URL = 'SET_FINAL_PLAYLIST_URL';
export const setFinalPlaylistUrl = (url) => ({
  type: SET_FINAL_PLAYLIST_URL,
  url,
});

export const CLEAR_FINAL_DATA = 'CLEAR_FINAL_DATA';
export const clearFinalData = () => ({
  type: CLEAR_FINAL_DATA,
});

export const CLEAR_MY_DATA = 'CLEAR_MY_DATA';
export const clearMyData = () => ({
  type: CLEAR_MY_DATA,
});

export const CLEAR_PUBLIC_DATA = 'CLEAR_PUBLIC_DATA';
export const clearPublicData = () => ({
  type: CLEAR_PUBLIC_DATA,
});

export const SET_OPEN_STATUS_MY_PLAYLISTS = 'SET_OPEN_STATUS_MY_PLAYLISTS';
export const setOpenStatusMyPlaylists = (isOpen) => ({
  type: SET_OPEN_STATUS_MY_PLAYLISTS,
  isOpen,
});

/**
 * May use this method in the future to control the
 * routing of navigation to share statsuses between
 * different playlist pages.
 * @param {*} isOpen
 */
export const setOpenStatusForAllPlaylists = (isOpen) => (
  dispatch,
  getState
) => {
  const {
    router: {
      location: { pathname },
    },
    navigation: { indexToRouteMap },
  } = getState();

  switch (pathname) {
    case indexToRouteMap[0]:
      dispatch(setOpenStatusMyPlaylists(isOpen));
      break;
    case indexToRouteMap[1]:
      dispatch(setOpenStatusPublicPlaylists(isOpen));
      break;
    case indexToRouteMap[2]:
      dispatch(setOpenStatusFinalPlaylists(isOpen));
      break;
    default:
      break;
  }
};

export const ADD_PLAYLIST_TO_FINAL = 'ADD_PLAYLIST_TO_FINAL';
export const addPlaylistToFinal = (playlist) => ({
  type: ADD_PLAYLIST_TO_FINAL,
  receivedAt: Date.now(),
  playlist,
});

export const REMOVE_PLAYLIST_FROM_FINAL = 'REMOVE_PLAYLIST_FROM_FINAL';
export const removePlaylistFromFinal = (playlist) => ({
  type: REMOVE_PLAYLIST_FROM_FINAL,
  receivedAt: Date.now(),
  playlist,
});

export const ADD_PLAYLIST_TRACK_TO_FINAL = 'ADD_PLAYLIST_TRACK_TO_FINAL';
export const addPlaylistTrackToFinal = (track, playlist) => ({
  type: ADD_PLAYLIST_TRACK_TO_FINAL,
  receivedAt: Date.now(),
  playlist,
  track,
});

export const REMOVE_PLAYLIST_TRACK_FROM_FINAL =
  'REMOVE_PLAYLIST_TRACK_FROM_FINAL';
export const removePlaylistTrackFromFinal = (track, playlist) => ({
  type: REMOVE_PLAYLIST_TRACK_FROM_FINAL,
  receivedAt: Date.now(),
  playlist,
  track,
});

// Nav actions
export const SET_NAV_INDEX = 'SET_NAV_INDEX';
export const setNavIndex = (index = 0) => ({
  type: SET_NAV_INDEX,
  index,
});

// My playlists search term
export const SET_MY_SEARCH_TERM = 'SET_MY_SEARCH_TERM';
export const setMySearchTerm = (searchTerm = '') => ({
  type: SET_MY_SEARCH_TERM,
  searchTerm,
});

// final playlist actions
export const SET_FINAL_PLAYLIST_OPEN = 'SET_FINAL_PLAYLIST_OPEN';
export const setFinalPlaylistOpen = (playlistID, isOpen) => ({
  type: SET_FINAL_PLAYLIST_OPEN,
  playlistID,
  isOpen,
});

export const SET_FINAL_SEARCH_TERM = 'SET_FINAL_SEARCH_TERM';
export const setFinalSearchTerm = (searchTerm = '') => ({
  type: SET_FINAL_SEARCH_TERM,
  searchTerm,
});

export const SET_OPEN_STATUS_FINAL_PLAYLISTS =
  'SET_OPEN_STATUS_FINAL_PLAYLISTS';
export const setOpenStatusFinalPlaylists = (isOpen = false) => ({
  type: SET_OPEN_STATUS_FINAL_PLAYLISTS,
  isOpen,
});

export const SET_NEW_PLAYLIST_DESC = 'SET_NEW_PLAYLIST_DESC';
export const setNewPlaylistDesc = (playlistDesc) => ({
  type: SET_NEW_PLAYLIST_DESC,
  playlistDesc,
});

export const SET_FINAL_PLAYLIST_PUBLIC = 'SET_FINAL_PLAYLIST_PUBLIC';
export const setFinalPlaylistPublic = (isPublic) => ({
  type: SET_FINAL_PLAYLIST_PUBLIC,
  isPublic,
});

export const SET_FINAL_PLAYLIST_IMAGE_URI = 'SET_FINAL_PLAYLIST_IMAGE_URI';
export const setFinalPlaylistImageURI = (imageUri) => ({
  type: SET_FINAL_PLAYLIST_IMAGE_URI,
  imageUri,
});

export const REMOVE_ERROR_FROM_APP = 'REMOVE_ERROR_FROM_APP';
export const removeErrorFromApp = (errorId) => ({
  type: REMOVE_ERROR_FROM_APP,
  errorId,
});

export const finalizeProcessing = (finalPlaylistUrl) => (dispatch) => {
  dispatch(setMergerStatus(true, 'Finished!'));
  dispatch(setMergerStatus(false));
  dispatch(setFinalPlaylistUrl(finalPlaylistUrl));
  dispatch(clearFinalData());
  dispatch(clearPublicData());
  dispatch(clearMyData());
};

export const launchPlaylistMerger = (playlistName) => (dispatch, getState) => {
  const {
    componoform: { selectedPlaylistId, listOfMyPlaylists },
    finalPlaylists: {
      imageUri,
      isPublic,
      hasChosenNewCreate,
      playlists: {
        entities: { playlists: playlistsMap },
      },
    },
  } = getState();
  const trackIds = getAllPlaylistsTrackIds(playlistsMap);

  if (hasChosenNewCreate) {
    dispatch(setMergerStatus(true, 'Creating playlist...'));
    createPlaylist(playlistName, { public: isPublic }).then((response) => {
      dispatch(setMergerStatus(true, 'Adding tracks...'));
      const {
        data: {
          body: {
            id: playlistId,
            external_urls: { spotify: finalPlaylistUrl },
          },
        },
      } = response;

      addTracksToPlaylist(playlistId, trackIds).then((response) => {
        if (!isEmpty(imageUri)) {
          dispatch(setMergerStatus(true, 'Adding cover image...'));

          uploadPlaylistCoverImage(playlistId, imageUri).then((response) =>
            dispatch(finalizeProcessing(finalPlaylistUrl))
          );
        } else {
          dispatch(finalizeProcessing(finalPlaylistUrl));
        }
      });
    });
  } else {
    const {
      external_urls: { spotify: finalPlaylistUrl },
    } = find(propEq('id', selectedPlaylistId))(listOfMyPlaylists);

    dispatch(setMergerStatus(true, 'Adding tracks...'));
    addTracksToPlaylist(selectedPlaylistId, trackIds).then((response) => {
      if (!isEmpty(imageUri)) {
        dispatch(setMergerStatus(true, 'Adding new cover image...'));

        uploadPlaylistCoverImage(selectedPlaylistId, imageUri).then(
          (response) => {
            dispatch(finalizeProcessing(finalPlaylistUrl));
          }
        );
      } else {
        dispatch(finalizeProcessing(finalPlaylistUrl));
      }
    });
  }
};

// PUBLIC PLAYLISTS ACTIONS
export const SET_PUBLIC_SEARCH_TERM = 'SET_PUBLIC_SEARCH_TERM';
export const setPublicSearchTerm = (searchTerm = '') => ({
  type: SET_PUBLIC_SEARCH_TERM,
  searchTerm,
});

export const SET_PUBLIC_PLAYLISTS_VISITED = 'SET_PUBLIC_PLAYLISTS_VISITED';
export const setPublicPlaylistsVisited = (isVisited = true) => ({
  type: SET_PUBLIC_PLAYLISTS_VISITED,
  isVisited,
});

export const REQUEST_SEARCHED_PLAYLISTS = 'REQUEST_SEARCHED_PLAYLISTS';
export const requestSearchedPlaylists = () => ({
  type: REQUEST_SEARCHED_PLAYLISTS,
});

export const RECEIVED_SEARCHED_PLAYLISTS = 'RECEIVED_SEARCHED_PLAYLISTS';
export const receivedSearchedPlaylists = (json) => ({
  type: RECEIVED_SEARCHED_PLAYLISTS,
  playlists: json.data.body ? json.data.body.playlists.items : {},
  numberOfTracks: json.data.body ? json.data.body.playlists.total : 0,
  receivedAt: Date.now(),
});

export const SET_SEARCH_RESULTS_MESSAGE = 'SET_SEARCH_RESULTS_MESSAGE';
export const setSearchResultsMessage = (message = '') => ({
  type: SET_SEARCH_RESULTS_MESSAGE,
  message,
});

export const CLEAN_PUBLIC_SEARCH_RESULTS = 'CLEAN_PUBLIC_SEARCH_RESULTS';
export const cleanPublicSearchResults = () => ({
  type: CLEAN_PUBLIC_SEARCH_RESULTS,
});

export const searchPublicPlaylists = (shouldLoadMore = false) => (
  dispatch,
  getState
) => {
  const {
    publicPlaylists: { searchTerm, currentOffset },
  } = getState();

  dispatch(requestSearchedPlaylists());

  if (shouldLoadMore) {
    return searchPlaylists(searchTerm, currentOffset).then((json) => {
      dispatch(receivedSearchedPlaylists(json));
    });
  }

  dispatch(cleanPublicSearchResults());
  // start from 0 offset if the search request is different
  return searchPlaylists(searchTerm, 0).then((json) => {
    dispatch(receivedSearchedPlaylists(json));
    dispatch(setSearchResultsMessage(`Results for "${searchTerm}"`));
  });
};

export const SET_PUBLIC_PLAYLIST_OPEN = 'SET_PUBLIC_PLAYLIST_OPEN';
export const setPublicPlaylistOpen = (playlistId, isOpen) => ({
  type: SET_PUBLIC_PLAYLIST_OPEN,
  playlistId,
  isOpen,
});

export const SET_OPEN_STATUS_PUBLIC_PLAYLISTS =
  'SET_OPEN_STATUS_PUBLIC_PLAYLISTS';
export const setOpenStatusPublicPlaylists = (isOpen) => ({
  type: SET_OPEN_STATUS_PUBLIC_PLAYLISTS,
  isOpen,
});

export const logOutUser = () => (dispatch) => {
  return getLogOutUser().then(({ isAuthenticated }) => {
    if (!isAuthenticated) {
      dispatch(push('/'));
    }
  });
};

export const SET_COMPONOFY_MODE = 'SET_COMPONOFY_MODE';
export const setComponofyMode = (hasChosenNewCreate) => ({
  type: SET_COMPONOFY_MODE,
  hasChosenNewCreate,
});

export const REQUEST_MY_PLAYLISTS_FOR_SELECTION =
  'REQUEST_MY_PLAYLISTS_FOR_SELECTION';
export const requestMyPlaylistsForSelection = () => ({
  type: REQUEST_MY_PLAYLISTS_FOR_SELECTION,
});

export const RECEIVE_MY_PLAYLISTS_FOR_SELECTION =
  'RECEIVE_MY_PLAYLISTS_FOR_SELECTION';
const receiveMyPlaylistsForSelection = (json) => ({
  type: RECEIVE_MY_PLAYLISTS_FOR_SELECTION,
  playlists: json.data.body ? json.data.body.items : [],
  totalNumberOfPlaylists: json.data.body ? json.data.body.total : 0,
  receivedAt: Date.now(),
});

export const fetchMyPlaylistsForSelection = (offset, limit) => (dispatch) => {
  dispatch(requestMyPlaylistsForSelection());
  return getMyPlaylists(offset, limit).then((json) =>
    dispatch(receiveMyPlaylistsForSelection(json))
  );
};

export const SET_COMPONOFORM_OPEN_STATUS = 'SET_COMPONOFORM_OPEN_STATUS';
export const setComponoformOpenStatus = (wasOpen) => ({
  type: SET_COMPONOFORM_OPEN_STATUS,
  wasOpen,
});

export const SET_COMPONOFORM_ADD_EXISTING_STATUS =
  'SET_COMPONOFORM_ADD_EXISTING_STATUS';
export const setComponoformAddExistingStatus = (wasAddExistingOpen) => ({
  type: SET_COMPONOFORM_ADD_EXISTING_STATUS,
  wasAddExistingOpen,
});

export const SET_SELECTED_PLAYLIST = 'SET_SELECTED_PLAYLIST';
export const setSelectedPlaylist = (playlistId) => ({
  type: SET_SELECTED_PLAYLIST,
  playlistId,
});

export const CLEAR_COMPONOFORM_DATA = 'CLEAR_COMPONOFORM_DATA';
export const clearComponoformData = () => ({
  type: CLEAR_COMPONOFORM_DATA,
});

export const SET_FINAL_TRACKS_SHOW_STATUS = 'SET_FINAL_TRACKS_SHOW_STATUS';
export const setFinalTracksShowStatus = (shouldShowOnlyTracks = false) => ({
  type: SET_FINAL_TRACKS_SHOW_STATUS,
  shouldShowOnlyTracks,
});

export const SET_CURRENT_SELECTION_OFFSET = 'SET_CURRENT_SELECTION_OFFSET';
export const setCurrentSelectionOffset = (offset = PLAYLIST_OFFSET_LIMIT) => ({
  type: SET_CURRENT_SELECTION_OFFSET,
  offset,
});

export const REORDER_PLAYLIST_TRACKS = 'REORDER_PLAYLIST_TRACKS';
export const reorderPlaylistTracks = (
  playlistId,
  trackId,
  startPosition,
  endPosition
) => ({
  type: REORDER_PLAYLIST_TRACKS,
  playlistId,
  trackId,
  startPosition,
  endPosition,
});

export const SET_PLAYLIST_DRAG_STATUS = 'SET_PLAYLIST_DRAG_STATUS';
export const setPlaylistDragStatus = (
  playlistId,
  hasReorderRequest = false
) => ({
  type: SET_PLAYLIST_DRAG_STATUS,
  playlistId,
  hasReorderRequest,
});

export const startPlaylistTracksReorderProcess = (
  playlistId,
  trackId,
  startPosition,
  endPosition
) => (dispatch) => {
  dispatch(setPlaylistDragStatus(playlistId, true));
  dispatch(
    reorderPlaylistTracks(playlistId, trackId, startPosition, endPosition)
  );

  // The API request accepts the index after which
  // the targeted track should be placed while the UI
  // places it right before the track with end position
  if (endPosition > startPosition) {
    endPosition += 1;
  }

  reorderTracksInPlaylist(playlistId, startPosition, endPosition).then(
    (response) => dispatch(setPlaylistDragStatus(playlistId, false)),
    (error) =>
      dispatch(
        addErrorToApp('Failed request of changing order of tracks in playlist')
      )
  );
};

export const RECEIVE_NEW_API_ACCESS_TOKEN = 'RECEIVE_NEW_API_ACCESS_TOKEN';
export const receiveNewApiAccessToken = (accessToken) => ({
  type: RECEIVE_NEW_API_ACCESS_TOKEN,
  tokenLastRefreshTime: Date.now(),
  accessToken,
});

export const generateRefreshToken = () => (dispatch) => {
  requestRefreshToken().then(
    ({ data: { accessToken } = {} }) => {
      if (!accessToken) {
        dispatch(addErrorToApp('Could not get the new token from data.'));
        return;
      }

      dispatch(receiveNewApiAccessToken(accessToken));
    },
    (error) => dispatch(addErrorToApp('Failed to request the new token.'))
  );
};

export const REQUEST_MY_TOP_TRACKS = 'REQUEST_MY_TOP_TRACKS';
export const requestMyTopTracks = () => ({
  type: REQUEST_MY_TOP_TRACKS,
});

export const RECEIVED_MY_TOP_TRACKS = 'RECEIVED_MY_TOP_TRACKS';
export const receivedMyTopTracks = (tracks) => ({
  type: RECEIVED_MY_TOP_TRACKS,
  tracks,
});

export const generateSuggestedPlaylists = (numberOfTracks) => (dispatch) => {
  dispatch(requestMyTopTracks());

  getMyTopTracks(numberOfTracks).then(
    ({ data: tracks }) => dispatch(receivedMyTopTracks(tracks)),
    (error) =>
      dispatch(addErrorToApp('Failed request of fetching your top tracks'))
  );
};
