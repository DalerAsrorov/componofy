import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SettingsIcon from 'material-ui-icons/Settings';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const rightSpace = '30px';

const styles = theme => ({
    root: {},

    menu: {}
});

class Settings extends PureComponent {
    static propTypes = {
        setOpenStatusMyPlaylists: PropTypes.func.isRequired,
        onClickOptions: PropTypes.func.isRequired,
        onSelectItem: PropTypes.func.isRequired,
        anchorEl: PropTypes.object,
        isOpen: PropTypes.bool
    };

    _handlePlaylistCollapse = () => {
        this.props.setOpenStatusMyPlaylists();
        this.props.onSelectItem();
    };

    render() {
        const {
            onClickOptions,
            onSelectItem,
            anchorEl,
            isOpen,
            classes
        } = this.props;

        return (
            <div>
                <Button
                    aria-owns={isOpen ? 'settingsMenu' : null}
                    aria-haspopup="true"
                    onClick={onClickOptions}
                >
                    Open Menu
                </Button>
                <Menu
                    id="settingsMenu"
                    open={isOpen}
                    onRequestClose={onSelectItem}
                    anchorEl={anchorEl}
                >
                    <MenuItem onClick={onSelectItem}>Profile</MenuItem>
                    <MenuItem onClick={this._handlePlaylistCollapse}>
                        Collapse
                    </MenuItem>
                    <MenuItem onClick={onSelectItem}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);
