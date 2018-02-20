import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { PlaylistAdd, PlaylistAddCheck, LibraryMusic } from 'material-ui-icons';
import { CircularProgress } from 'material-ui/Progress';
import classNames from 'classnames';
import * as R from 'ramda';
import { PLAYLIST_PROPTYPE, LIGHT_CYAN_COLOR } from '../../utils/constants';
import TrackList from './TrackList';
import Loader from '../Loader';
import List from '../List';

import './Playlist.css';

const styles = theme => ({
    collapse: {
        maxHeight: '420px',
        overflowY: 'auto'
    },

    playlistAvatar: {},

    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
        color: LIGHT_CYAN_COLOR
    },

    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
});

class Playlist extends PureComponent {
    static propTypes = {
        containsThisPlaylist: PropTypes.bool.isRequired,
        onClickPlaylist: PropTypes.func.isRequired,
        playlist: PLAYLIST_PROPTYPE.isRequired,
        onClickIcon: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        collapseHasFixedHeight: PropTypes.bool,
        onDragAndDrop: PropTypes.func,
        showPlaylist: PropTypes.bool
    };

    componentDidMount = () => {
        const {
            playlist: { id: playlistID, owner: { id: userId } },
            fetchPlaylistTracks
        } = this.props;

        fetchPlaylistTracks(userId, playlistID);
    };

    _handleClick = event => {
        event.preventDefault();
        const { onClickPlaylist, playlist: { id, isOpen } } = this.props;

        onClickPlaylist(id, isOpen);
    };

    _handleIconClick = event => {
        event.stopPropagation();

        const { playlist, onClickIcon, containsThisPlaylist } = this.props;

        if (onClickIcon) {
            onClickIcon(playlist, containsThisPlaylist);
        }
    };

    _handleDragEnd = result => {
        const { onDragAndDrop } = this.props;

        // don't do anything if position is the same
        if (!result.destination) {
            return;
        }

        const {
            droppableId: trackId,
            source: { droppableId: playlistId, index: startPos } = {},
            destination: { index: endPos } = {}
        } = result;

        onDragAndDrop(playlistId, trackId, startPos, endPos);
    };

    render() {
        const {
            playlist,
            containsThisPlaylist,
            classes,
            showTracksOnly,
            collapseHasFixedHeight
        } = this.props;
        const {
            tracks: { list: tracks },
            images: playlistImages,
            isOpen: playlistIsOpen
        } = playlist;
        let playlistClassName = classNames({ 'no-display': showTracksOnly });
        let isOpen = showTracksOnly ? true : playlistIsOpen;
        let playlistIconComponent = containsThisPlaylist ? (
            <PlaylistAddCheck />
        ) : (
            <PlaylistAdd />
        );
        let tracklist = tracks ? (
            <TrackList tracks={tracks} playlist={playlist} />
        ) : (
            <Loader
                text={
                    <Typography type="subheading" color="secondary">
                        Loading tracks...
                    </Typography>
                }
                icon={
                    <CircularProgress
                        thickness={7}
                        className={classes.progress}
                    />
                }
            />
        );

        let playlistImage = (
            <Avatar
                alt={`${playlist.name} playlist cover`}
                className={classes.playlistAvatar}
            >
                <LibraryMusic />
            </Avatar>
        );

        if (!R.isEmpty(playlistImages)) {
            const avatar = R.head(playlistImages);
            playlistImage = (
                <Avatar
                    src={avatar.url}
                    alt={`${playlist.name} playlist cover`}
                    className={classes.playlistAvatar}
                />
            );
        }

        return (
            <div>
                <ListItem
                    onClick={this._handleClick}
                    disabled={R.isEmpty(tracks)}
                    className={playlistClassName}
                    button
                    divider
                >
                    <ListItemIcon
                        className="playlist-icon"
                        onClick={this._handleIconClick}
                    >
                        {playlistIconComponent}
                    </ListItemIcon>
                    {playlistImage}
                    <ListItemText inset primary={playlist.name} />
                </ListItem>
                <Collapse
                    in={isOpen}
                    className={classNames({
                        [classes.collapse]: collapseHasFixedHeight
                    })}
                    timeout="auto"
                    unmountOnExit
                >
                    <DragDropContext onDragEnd={this._handleDragEnd}>
                        <Droppable droppableId={playlist.id}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}>
                                    {tracklist}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(Playlist);
