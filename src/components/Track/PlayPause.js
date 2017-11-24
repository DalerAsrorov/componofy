import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconButton } from 'material-ui';
import { PlayArrow, Pause } from 'material-ui-icons';
import { withMediaProps } from 'react-media-player';

class PlayPause extends PureComponent {
    static propTypes = {
        media: PropTypes.object.isRequired,
        color: PropTypes.string
    };

    _handlePlayPause = () => {
        this.props.media.playPause();
    };

    render() {
        const { media, color } = this.props;
        let playPauseIcon;

        return (
            <IconButton color={color || ''} onClick={this._handlePlayPause}>
                {media.isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
        );
    }
}

export default withMediaProps(PlayPause);
