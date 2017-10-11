import PropTypes from 'prop-types';

export const PLAYLIST_PROPTYPE = PropTypes.shape({
    id: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    tracks: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    external_urls: PropTypes.shape({
        spotify: PropTypes.string
    }).isRequired,
    public: PropTypes.bool
});
