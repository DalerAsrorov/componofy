import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Playlist extends PureComponent {
    render() {
        const { playlist } = this.props;
        const {
            name,
            images,
            external_urls: { spotify: playlistURL }
        } = playlist;

        return (
            <div>
                <a target="__blank" href={playlistURL}>
                    {name}
                </a>
            </div>
        );
    }
}

Playlist.propTypes = {
    playlist: PropTypes.object
};
