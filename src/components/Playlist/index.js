import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import { withStyles } from 'material-ui/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Link, Element } from 'react-scroll';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction
} from 'material-ui/List';
import {
    PlaylistAdd,
    PlaylistAddCheck,
    LibraryMusic,
    AccessTime
} from 'material-ui-icons';
import { CircularProgress } from 'material-ui/Progress';
import classNames from 'classnames';
import * as R from 'ramda';
import {
    PLAYLIST_PROPTYPE,
    LIGHT_CYAN_COLOR,
    SUCCESS_COLOR
} from '../../utils/constants';
import Expand from './Expand';
import TrackList from './TrackList';
import Loader from '../Loader';
import List from '../List';

import './Playlist.css';

const styles = theme => ({
    badgeSet: {},

    collapse: {
        maxHeight: '420px',
        overflowY: 'auto'
    },

    trackBadge: {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.secondary[500],
        padding: theme.spacing.unit / 4
    },

    includedTracksBadge: {
        color: SUCCESS_COLOR,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit / 4,
        border: `1px solid ${SUCCESS_COLOR}`
    },

    margin: {
        margin: theme.spacing.unit * 2
    },

    nested: {
        paddingLeft: theme.spacing.unit * 4
    },

    playlistAvatar: {},

    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
        color: LIGHT_CYAN_COLOR
    }
});

class Playlist extends PureComponent {
    static propTypes = {
        containsThisPlaylist: PropTypes.bool.isRequired,
        onClickPlaylist: PropTypes.func.isRequired,
        playlist: PLAYLIST_PROPTYPE.isRequired,
        onClickIcon: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired,
        numberOfAddedTracksFromThisPlaylist: PropTypes.number,
        shouldShowTracksIncludedValue: PropTypes.bool,
        collapseHasFixedHeight: PropTypes.bool,
        onDragAndDrop: PropTypes.func,
        showPlaylist: PropTypes.bool
    };

    state = {
        isExpanded: false
    };

    componentDidMount = () => {
        const {
            playlist: { id: playlistID, owner: { id: userId } },
            fetchPlaylistTracks
        } = this.props;

        fetchPlaylistTracks(userId, playlistID);
    };

    _handleExpandMore = event => {
        const { isExpanded } = this.state;

        this.setState({
            isExpanded: !isExpanded
        });
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
        const { isExpanded } = this.state;
        const {
            playlist,
            containsThisPlaylist,
            classes,
            showTracksOnly,
            collapseHasFixedHeight,
            numberOfAddedTracksFromThisPlaylist,
            shouldShowTracksIncludedValue
        } = this.props;
        const {
            tracks: { list: tracks },
            images: playlistImages,
            isOpen: playlistIsOpen
        } = playlist;
        const nTracks = tracks ? tracks.length : <AccessTime />;
        let playlistClassName = classNames({ 'no-display': showTracksOnly });
        let isOpen = showTracksOnly ? true : playlistIsOpen;
        let playlistIconComponent = containsThisPlaylist ? (
            <PlaylistAddCheck />
        ) : (
            <PlaylistAdd />
        );
        let badgeForAddedTracks, expandButton;

        if (!tracks) {
            playlistIconComponent = <AccessTime />;
        }

        if (collapseHasFixedHeight && tracks && tracks.length > 4) {
            expandButton = (
                <Expand
                    isStickyBottom={true}
                    showUpArrow={isExpanded}
                    onClick={this._handleExpandMore}
                    color="accent"
                    raised
                />
            );

            if (isExpanded) {
                expandButton = (
                    <Link to={isExpanded ? playlist.id : null} spy={true}>
                        {expandButton}
                    </Link>
                );
            }
        }

        if (
            numberOfAddedTracksFromThisPlaylist &&
            shouldShowTracksIncludedValue
        ) {
            badgeForAddedTracks = (
                <Badge
                    badgeContent={numberOfAddedTracksFromThisPlaylist}
                    className={classes.margin}
                    classes={{
                        badge: classes.includedTracksBadge
                    }}
                >
                    <span />
                </Badge>
            );
        }

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
                        <Element
                            id={`element-playlist-${playlist.id}`}
                            name={playlist.id}
                        >
                            {playlistIconComponent}
                        </Element>
                    </ListItemIcon>
                    {playlistImage}
                    <ListItemText inset primary={playlist.name} />
                    <div className={classes.badgeSet}>
                        {badgeForAddedTracks}
                        <Badge
                            badgeContent={nTracks}
                            className={classes.margin}
                            classes={{
                                badge: classes.trackBadge
                            }}
                        >
                            <span />
                        </Badge>
                    </div>
                </ListItem>
                <Collapse
                    in={isOpen}
                    className={classNames({
                        [classes.collapse]:
                            collapseHasFixedHeight && !isExpanded
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
                    {expandButton}
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(Playlist);
