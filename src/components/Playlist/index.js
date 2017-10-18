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
        isOpen: false
    };

    _handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { playlist } = this.props;
        const { isOpen } = this.state;

        return (
            <ListItem button divider onClick={this._handleClick}>
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
