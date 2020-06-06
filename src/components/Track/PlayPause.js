import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { PlayArrow, Pause } from '@material-ui/icons';
import { withMediaProps } from 'react-media-player';

class PlayPause extends PureComponent {
  static propTypes = {
    media: PropTypes.object.isRequired,
    color: PropTypes.string,
  };

  _handlePlayPause = () => {
    this.props.media.playPause();
  };

  render() {
    const { media, color } = this.props;
    let playPauseIcon = <Pause />;

    if (!media.isPlaying) {
      playPauseIcon = <PlayArrow />;
    }

    return (
      <IconButton color={color} onClick={this._handlePlayPause}>
        {playPauseIcon}
      </IconButton>
    );
  }
}

export default withMediaProps(PlayPause);
