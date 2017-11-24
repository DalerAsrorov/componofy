import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Media, Player, controls, withMediaProps } from 'react-media-player';

const { PlayPause: PlayPauseComponent } = controls;

const styles = theme => ({
    mediaPlayer: {
        display: 'none'
    }
});

const PlayPause = props => {
    return (
        <div>
            <Media>
                <div className="media">
                    <div className={props.classes.mediaPlayer}>
                        <Player src={props.url} />
                    </div>
                    <PlayPauseComponent />
                </div>
            </Media>
        </div>
    );
};

PlayPause.propTypes = {
    classes: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired
};

export default withMediaProps(withStyles(styles)(PlayPause));
