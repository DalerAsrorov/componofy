import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import PlayPause from './PlayPause';
import { Media, Player } from 'react-media-player';

const styles = theme => ({
    mediaPlayer: {
        display: 'none'
    }
});

const Preview = props => (
    <Media className={props.classes.media}>
        <div className={props.classes.media}>
            <div className={props.classes.mediaPlayer}>
                <Player src={props.url} />
            </div>
            <PlayPause />
        </div>
    </Media>
);

export default withStyles(styles)(Preview);
