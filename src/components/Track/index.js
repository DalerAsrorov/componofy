import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { DragSource, DropTarget } from 'react-dnd';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { head } from 'ramda';
import { TRACK_PROPTYPE, PLAYLIST_PROPTYPE } from '../../utils/constants';
import Info from './Info';
import Preview from './Preview';

const collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};

const trackItemTarget = {
    hover(props, monitor, component) {
        props.onMoveTrack(monitor.getItem().index, props.index);
        // console.log('\nDROP', props, monitor, component);
    }
};

const trackItemSource = {
    beginDrag(props) {
        return {
            text: props.track
        };
    }
};

const styles = theme => ({
    checkmark: {
        color: theme.palette.grey[600]
    },

    trackInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    trackInfo: {
        flex: '1'
    },

    preview: {
        flex: '1'
    },

    mediaPlayer: {
        display: 'none'
    }
});

class Track extends PureComponent {
    static propTypes = {
        removePlaylistTrackFromFinal: PropTypes.func.isRequired,
        playlistContainsThisTrack: PropTypes.bool.isRequired,
        addPlaylistTrackToFinal: PropTypes.func.isRequired,
        track: TRACK_PROPTYPE.isRequired,
        // Injected by React DnD:
        isDragging: PropTypes.bool.isRequired,
        connectDragSource: PropTypes.func.isRequired,
        onMoveTrack: PropTypes.func,
        playlist: PLAYLIST_PROPTYPE
    };

    _handleChecked = event => {
        const {
            track,
            playlist,
            addPlaylistTrackToFinal,
            removePlaylistTrackFromFinal,
            playlistContainsThisTrack
        } = this.props;

        if (playlist) {
            if (playlistContainsThisTrack) {
                removePlaylistTrackFromFinal(track, playlist);
            } else {
                addPlaylistTrackToFinal(track, playlist);
            }
        }
    };

    render() {
        const {
            track,
            classes,
            playlistContainsThisTrack,
            connectDragSource,
            connectDropTarget
        } = this.props;
        const {
            artists,
            name: trackName,
            album: { name: albumName, external_urls: { spotify: albumUrl } },
            external_urls: { spotify: trackUrl },
            preview_url,
            popularity
        } = track;
        const {
            name: artistName,
            external_urls: { spotify: artistUrl }
        } = head(artists);
        let previewComponent;

        const isPopular = popularity >= 70;

        if (preview_url) {
            previewComponent = (
                <div className={classes.preview}>
                    <Preview url={preview_url} />
                </div>
            );
        }

        return connectDragSource(
            connectDropTarget(
                <div>
                    <ListItem divider>
                        <ListItemIcon>
                            <Checkbox
                                className={classes.checkmark}
                                onClick={this._handleChecked}
                                checked={playlistContainsThisTrack}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <div className={classes.trackInfoContainer}>
                                    <div className={classes.trackInfo}>
                                        <Info
                                            trackName={trackName}
                                            trackUrl={trackUrl}
                                            artistName={artistName}
                                            artistUrl={artistUrl}
                                            albumName={albumName}
                                            albumUrl={albumUrl}
                                            isPopular={isPopular}
                                        />
                                    </div>
                                    {previewComponent}
                                </div>
                            }
                        />
                    </ListItem>
                </div>
            )
        );
    }
}

export default DropTarget('trackItem', trackItemTarget, collectDrop)(
    DragSource('trackItem', trackItemSource, collectDrag)(
        withStyles(styles)(Track)
    )
);
