import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaterialList, {
    ListItem,
    ListItemIcon,
    ListItemText
} from 'material-ui/List';
import { PlaylistPlay } from 'material-ui-icons';
import { PLAYLIST_PROPTYPE } from '../../utils/constants';

export default class Playlist extends PureComponent {
    state = {
        isOpen: true
    };

    _handleToggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { playlist } = this.props;

        return (
            <ListItem button divider>
                <ListItemIcon>
                    <PlaylistPlay />
                </ListItemIcon>
                <ListItemText inset primary={playlist.name} />
            </ListItem>
        );
    }
}

Playlist.propTypes = {
    playlist: PLAYLIST_PROPTYPE
};
