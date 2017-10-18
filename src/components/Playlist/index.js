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

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
});

class Playlist extends PureComponent {
    static propTypes = {
        playlist: PLAYLIST_PROPTYPE,
        classes: PropTypes.object
    };

    state = {
        isOpen: false
    };

    _handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { playlist, classes } = this.props;
        const { isOpen } = this.state;

        return (
            <div>
                <ListItem button divider onClick={this._handleClick}>
                    <ListItemIcon>
                        <PlaylistPlay />
                    </ListItemIcon>
                    <ListItemText inset primary={playlist.name} />
                </ListItem>
                <Collapse in={isOpen} transitionDuration="auto" unmountOnExit>
                    <ListItem className={classes.nested}>
                        <ListItemIcon>
                            <PlaylistPlay />
                        </ListItemIcon>
                        <ListItemText inset primary="Starred" />
                    </ListItem>
                </Collapse>
            </div>
        );
    }
}

export default withStyles(styles)(Playlist);
