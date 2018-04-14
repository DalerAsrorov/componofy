import {
  SET_FINAL_PLAYLIST_URL,
  RECEIVE_MY_PLAYLISTS_FOR_SELECTION,
  REQUEST_MY_PLAYLISTS_FOR_SELECTION,
  SET_COMPONOFORM_OPEN_STATUS,
  SET_COMPONOFORM_ADD_EXISTING_STATUS,
  SET_SELECTED_PLAYLIST,
  CLEAR_COMPONOFORM_DATA,
  SET_CURRENT_SELECTION_OFFSET
} from '../actions';

const DEFAULT_STATE = {
  isFetchingOptions: false,
  wasOpen: false,
  wasAddExistingOpen: false,
  listOfMyPlaylists: [],
  finalPlaylistUrl: '',
  selectedPlaylistId: '',
  totalNumberOfPlaylists: 0,
  currentOffset: 0
};

export const componoform = (state = DEFAULT_STATE, action) => {
  let listOfMyPlaylists;

  switch (action.type) {
    case SET_FINAL_PLAYLIST_URL:
      return Object.assign({}, state, {
        finalPlaylistUrl: action.url
      });
    case REQUEST_MY_PLAYLISTS_FOR_SELECTION:
      return Object.assign({}, state, { isFetchingOptions: true });
    case RECEIVE_MY_PLAYLISTS_FOR_SELECTION:
      listOfMyPlaylists = [...state.listOfMyPlaylists, ...action.playlists];

      return Object.assign({}, state, {
        listOfMyPlaylists,
        isFetchingOptions: false,
        totalNumberOfPlaylists: action.totalNumberOfPlaylists
      });
    case SET_COMPONOFORM_OPEN_STATUS:
      return Object.assign({}, state, { wasOpen: action.wasOpen });
    case SET_COMPONOFORM_ADD_EXISTING_STATUS:
      return Object.assign({}, state, {
        wasAddExistingOpen: action.wasAddExistingOpen
      });
    case SET_SELECTED_PLAYLIST:
      return Object.assign({}, state, {
        selectedPlaylistId: action.playlistId
      });
    case CLEAR_COMPONOFORM_DATA:
      return Object.assign({}, state, DEFAULT_STATE);
    case SET_CURRENT_SELECTION_OFFSET:
      return Object.assign({}, state, { currentOffset: action.offset });
    default:
      return state;
  }
};
