import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import MaterialList, {
    ListItem,
    ListItemIcon,
    ListItemText
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { PlaylistAdd, PlaylistAddCheck } from 'material-ui-icons';
import { isEmpty } from 'ramda';
import { PLAYLIST_PROPTYPE, USER_PROPTYPE } from '../../utils/constants';
import { getPlaylistTracks } from '../../api';
import List from '../List';

import './Playlist.css';

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
});

class Playlist extends PureComponent {
    static propTypes = {
        containsThisPlaylist: PropTypes.bool.isRequired,
        playlist: PLAYLIST_PROPTYPE.isRequired,
        onClickIcon: PropTypes.func.isRequired,
        user: USER_PROPTYPE.isRequired,
        classes: PropTypes.object
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

        const { setPlaylistOpen, playlist: { id, isOpen } } = this.props;

        setPlaylistOpen(id, !isOpen);
    };

    _handleIconClick = event => {
        event.stopPropagation();

        const { playlist, onClickIcon, containsThisPlaylist } = this.props;

        if (onClickIcon) {
            onClickIcon(playlist, containsThisPlaylist);
        }
    };

    render() {
        const {
            playlist,
            classes,
            onClickIcon,
            containsThisPlaylist
        } = this.props;
        const { tracks: { list: tracks } } = playlist;
        let playlistIconComponent = containsThisPlaylist ? (
            <PlaylistAddCheck />
        ) : (
            <PlaylistAdd />
        );

        return (
            <div>
                <ListItem
                    onClick={this._handleClick}
                    disabled={isEmpty(tracks)}
                    button
                    divider
                >
                    <ListItemIcon
                        className="playlist-icon"
                        onClick={this._handleIconClick}
                    >
                        {playlistIconComponent}
                    </ListItemIcon>
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
