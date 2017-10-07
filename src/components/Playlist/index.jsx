import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Playlist extends PureComponent {
    render() {
        const { playlist } = this.props;
        console.log('playlist', playlist);

        return <div>Playlist</div>;
    }
}

Playlist.propTypes = {
    playlist: PropTypes.object
};
