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

    state = {
        tracks: PropTypes.array
    };

    componentDidMount = () => {
        const {
            user: { id: userID },
            playlist: { id: playlistID }
        } = this.props;

        console.log('Did mounted');

        getPlaylistTracks(userID, playlistID)
            .then(payload => {
                if (payload.data.body) {
                    const {
                        data: { body: { items: playlistTracks } }
                    } = payload;
                    this.setState({ tracks: playlistTracks });
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    _handleClick = event => {
        event.preventDefault();

        const { setPlaylistOpen, playlist: { id, isOpen } } = this.props;

        setPlaylistOpen(id, !isOpen);
    };

    render() {
        const { playlist, classes } = this.props;
        const { tracks } = this.state;

        return (
            <div>
                <ListItem button divider onClick={this._handleClick}>
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
                    <List items={tracks} />
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(Playlist);
