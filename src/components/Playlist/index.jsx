import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Playlist extends PureComponent {
    render() {
        const {
            name,
            images,
            external_urls: { spotify: playlistURL }
        } = this.props.playlist;

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
