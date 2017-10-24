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
import { PLAYLIST_PROPTYPE } from '../../utils/constants';
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
        // TODO: Create a custom prop object for each state
        user: PropTypes.object.isRequired,
        classes: PropTypes.object
    };

    state = {
        isOpen: false
    };

    componentDidMount = () => {
        const {
            user: { id: userID },
            playlist: { id: playlistID }
        } = this.props;

        getPlaylistTracks(userID, playlistID)
            .then(payload => {
                const { data: { body: { items: playlistTracks } } } = payload;
                console.log(`${playlistID}'s tracks:`, playlistTracks);
            })
            .catch(error => {
                console.error(error);
            });

        console.log(userID, playlistID);
    };

    _handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { playlist, classes } = this.props;
        const { isOpen } = this.state;

        const tempItems = [
            {
                id: 1,
                name: 'daler'
            },
            {
                id: 2,
                name: 'asrorov'
            }
        ];

        return (
            <div>
                <ListItem button divider onClick={this._handleClick}>
                    <ListItemIcon>
                        <PlaylistPlay />
                    </ListItemIcon>
                    <ListItemText inset primary={playlist.name} />
                </ListItem>
                <Collapse in={isOpen} transitionDuration="auto" unmountOnExit>
                    <List items={tempItems} />
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(Playlist);
