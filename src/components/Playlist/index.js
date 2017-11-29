import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { PlaylistAdd, PlaylistAddCheck, LibraryMusic } from 'material-ui-icons';
import Avatar from 'material-ui/Avatar';
import * as R from 'ramda';
import { PLAYLIST_PROPTYPE, USER_PROPTYPE } from '../../utils/constants';
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
        user: USER_PROPTYPE.isRequired
    };

    componentDidMount = () => {
        const {
            user: { id: userID },
            playlist: { id: playlistID },
            fetchPlaylistTracks
        } = this.props;

        fetchPlaylistTracks(userID, playlistID);
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

    render() {
        const { playlist, containsThisPlaylist, classes } = this.props;
        const { tracks: { list: tracks }, images: playlistImages } = playlist;

        // R.ifElse(
        //     R.isEmpty,
        //     () => <LibraryMusic />,
        //     R.lensProp('url', R.head)
        // )(playlistImages);

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
            debugger;
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
                    in={playlist.isOpen}
                    transitionDuration="auto"
                    unmountOnExit
                >
                    <List keyItem={playlist} items={tracks} />
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(Playlist);
