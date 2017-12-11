import {
    SET_PUBLIC_SEARCH_TERM,
    SET_PUBLIC_PLAYLISTS_VISITED
} from '../actions';

console.log('here');

const DEFAULT_STATE = {
    isFetching: false,
    searchTerm: '',
    playlists: [],
    numberOfTracks: 0,
    lastUpdated: 0,
    currentOffset: 0,
    playlistsRemaining: 0,
    canLoadMore: true,
    isVisited: false
};

export const publicPlaylists = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SET_PUBLIC_SEARCH_TERM:
            return Object.assign({}, state, { searchTerm: action.searchTerm });
        case SET_PUBLIC_PLAYLISTS_VISITED:
            return Object.assign({}, state, { isVisited: action.isVisited });

        default:
            return state;
    }
};
