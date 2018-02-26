import PropTypes from 'prop-types';
import { lightBlue, cyan, green } from 'material-ui/colors';

export const EXTERNAL_URLS_PROPTYPE = PropTypes.shape({
    spotify: PropTypes.string.isRequired
});

export const IMAGE_PROPTYPE = PropTypes.shape({
    url: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number
});

export const ARTIST_PROPTYPE = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    external_urls: EXTERNAL_URLS_PROPTYPE.isRequired
});

export const ALBUM_PROPTYPE = PropTypes.shape({
    artists: PropTypes.arrayOf(ARTIST_PROPTYPE).isRequired,
    name: PropTypes.string.isRequired,
    external_urls: EXTERNAL_URLS_PROPTYPE.isRequired,
    album_type: PropTypes.string,
    images: PropTypes.arrayOf(IMAGE_PROPTYPE)
});

export const TRACK_PROPTYPE = PropTypes.shape({
    artists: PropTypes.arrayOf(ARTIST_PROPTYPE).isRequired,
    external_urls: EXTERNAL_URLS_PROPTYPE.isRequired,
    track_number: PropTypes.number.isRequired,
    duration_ms: PropTypes.number.isRequired,
    popularity: PropTypes.number.isRequired,
    album: ALBUM_PROPTYPE.isRequired,
    id: PropTypes.string.isRequired,
    preview_url: PropTypes.string
});

export const PLAYLIST_PROPTYPE = PropTypes.shape({
    external_urls: EXTERNAL_URLS_PROPTYPE.isRequired,
    id: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(IMAGE_PROPTYPE),
    name: PropTypes.string.isRequired,
    tracks: PropTypes.shape({ list: PropTypes.array }).isRequired,
    owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    type: PropTypes.string,
    public: PropTypes.bool,
    // If true, shows playlist tracks
    // Default: false
    isOpen: PropTypes.bool
});

export const USER_PROPTYPE = PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    refreshToken: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    sessionID: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
});

export const PLAYLISTS_PROPTYPE = PropTypes.shape({
    playlists: PropTypes.arrayOf(PLAYLIST_PROPTYPE).isRequired,
    isFetching: PropTypes.bool.isRequired,
    numberOfTracks: PropTypes.number.isRequired,
    currentOffset: PropTypes.number.isRequired,
    playlistsRemaining: PropTypes.number.isRequired,
    areAllOpen: PropTypes.bool.isRequired,
    canLoadMore: PropTypes.bool.isRequired,
    isVisited: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number
});

export const ROUTER_PROPTYPE = PropTypes.shape({
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string,
        hash: PropTypes.string
    })
});

export const searchKeyMap = {
    focusSearch: 'ctrl+f'
};

export const MOST_LIGHT_BLUE_COLOR = lightBlue[50];
export const LIGHT_BLUE_COLOR = lightBlue[600];
export const LIGHT_CYAN_COLOR = cyan[500];
export const SUCCESS_COLOR = green[600];

export const menuButtonStyle = {};

export const SCROLL_DURATION = 500;
export const OFFSET_LIMIT = 10;
export const PLAYLIST_OFFSET_LIMIT = 20;

// Max image size is 256KB
// https://developer.spotify.com/web-api/upload-a-custom-playlist-cover-image/
export const MAX_IMAGE_SIZE_LIMIT = 256000;

export const LOAD_MORE_STATUS = {
    // There is no tracks to load
    0: 'All playlists loaded',
    // There is more tracks to load
    1: 'Load more',
    // Is true during data request
    2: 'Loading...'
};
