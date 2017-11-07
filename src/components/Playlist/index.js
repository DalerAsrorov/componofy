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
        isOpen: false,
        tracks: PropTypes.array
    };

    componentDidMount = () => {
        const {
            user: { id: userID },
            playlist: { id: playlistID }
        } = this.props;

        getPlaylistTracks(userID, playlistID)
            .then(payload => {
                const { data: { body: { items: playlistTracks } } } = payload;
                this.setState({ tracks: playlistTracks });
            })
            .catch(error => {
                console.error(error);
            });
    };

    _handleClick = event => {
        event.preventDefault();

        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { playlist, classes } = this.props;
        const { isOpen, tracks } = this.state;

        return (
            <div>
                <ListItem button divider onClick={this._handleClick}>
                    <ListItemIcon>
                        <PlaylistPlay />
                    </ListItemIcon>
                    <ListItemText inset primary={playlist.name} />
                </ListItem>
                <Collapse in={isOpen} transitionDuration="auto" unmountOnExit>
                    <List items={tracks} />
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(Playlist);
