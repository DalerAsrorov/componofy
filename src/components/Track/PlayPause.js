import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withMediaProps } from 'react-media-player';

class PlayPause extends PureComponent {
    static propTypes = {
        media: PropTypes.object.isRequired
    };

    _handlePlayPause = () => {
        this.props.media.playPause();
    };

    render() {
        const { media } = this.props;

        return (
            <button type="button" onClick={this._handlePlayPause}>
                {media.isPlaying ? 'Pause' : 'Play'}
            </button>
        );
    }
}

export default withMediaProps(PlayPause);
