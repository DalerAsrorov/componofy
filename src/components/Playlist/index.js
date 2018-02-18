import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { PlaylistAdd, PlaylistAddCheck, LibraryMusic } from 'material-ui-icons';
import Avatar from 'material-ui/Avatar';
import classNames from 'classnames';
import * as R from 'ramda';
import { PLAYLIST_PROPTYPE } from '../../utils/constants';
import TrackList from './TrackList';
import List from '../List';

import './Playlist.css';

const styles = theme => ({
    playlistAvatar: {},

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

        // If the track was not dragged to
        // the new desires order don't do anything
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
            showTracksOnly
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
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <DragDropContext onDragEnd={this._handleDragEnd}>
                        <Droppable droppableId={playlist.id}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}>
                                    <TrackList
                                        tracks={tracks}
                                        playlist={playlist}
                                    />
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
