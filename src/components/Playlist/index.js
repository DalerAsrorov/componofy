import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import MaterialList, {
    ListItem,
    ListItemIcon,
    ListItemText
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { PlaylistPlay } from 'material-ui-icons';
import { isEmpty } from 'ramda';
import { PLAYLIST_PROPTYPE, USER_PROPTYPE } from '../../utils/constants';
import { getPlaylistTracks } from '../../api';
import List from '../List';

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
});

class Playlist extends PureComponent {
    static propTypes = {
        playlist: PLAYLIST_PROPTYPE.isRequired,
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

    render() {
        const { playlist, classes } = this.props;
        const { tracks: { list: tracks } } = playlist;

        return (
            <div>
                <ListItem
                    disabled={isEmpty(tracks)}
                    button
                    divider
                    onClick={this._handleClick}
                >
                    <ListItemIcon>
                        <PlaylistPlay />
                    </ListItemIcon>
                    <ListItemText inset primary={playlist.name} />
                </ListItem>
                <Collapse
                    in={playlist.isOpen}
                    transitionDuration="auto"
                    unmountOnExit
                >
                    <List items={playlist.tracks.list} />
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(Playlist);
