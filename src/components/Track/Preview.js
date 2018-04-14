import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import PlayPause from './PlayPause';
import { Media, Player } from 'react-media-player';

const styles = theme => ({
    mediaPlayer: {
        display: 'none'
    },

    media: {
        textAlign: 'center'
    }
});

const Preview = props => (
    <Media>
        <div className={props.classes.media}>
            <div className={props.classes.mediaPlayer}>
                <Player src={props.url} vendor="audio" />
            </div>
            <PlayPause color="secondary" />
        </div>
    </Media>
);

Preview.propTypes = {
    classes: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    playButtonColor: PropTypes.string
};

export default withStyles(styles)(Preview);
