import PropTypes from 'prop-types';

export const EXTERNAL_URLS_PROPTYPE = PropTypes.shape({
    spotify: PropTypes.string.isRequired
});

export const IMAGE_PROPTYPE = PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
});

export const ARTIST_PROPTYPE = PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    external_urls: EXTERNAL_URLS_PROPTYPE.isRequired
});

export const ALBUM_PROPTYPE = PropTypes.shape({
    artist: PropTypes.arrayOf(ARTIST_PROPTYPE).isRequired,
    name: PropTypes.string.isRequired,
    external_urls: EXTERNAL_URLS_PROPTYPE.isRequired,
    album_type: PropTypes.string,
    images: PropTypes.arrayOf(IMAGE_PROPTYPE)
});

export const TRACK_PROPTYPE = PropTypes.shape({
    artist: PropTypes.arrayOf(ARTIST_PROPTYPE).isRequired,
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

export const MY_PLAYLISTS_PROPTYPE = PropTypes.shape({
    playlists: PropTypes.arrayOf(PLAYLIST_PROPTYPE).isRequired,
    isFetching: PropTypes.bool.isRequired,
    numberOfTracks: PropTypes.number.isRequired,
    currentOffset: PropTypes.number.isRequired,
    playlistsRemaining: PropTypes.number.isRequired,
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
