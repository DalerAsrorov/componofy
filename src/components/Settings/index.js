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

// text-align: right; */
// /* background: transparent; */
// width: 50px;
// margin: 0;
// position: fixed;
// /* left: 10px; */
// z-index: 100;
// right: 10px;
// bottom: 150px;

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel'
];

class Settings extends PureComponent {
    static propTypes = {
        onClickOptions: PropTypes.func.isRequired,
        onSelectItem: PropTypes.func.isRequired,
        anchorEl: PropTypes.object,
        isOpen: PropTypes.bool
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
                    aria-owns={isOpen ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={onClickOptions}
                >
                    Open Menu
                </Button>
                <Menu
                    open={isOpen}
                    onRequestClose={onSelectItem}
                    anchorEl={anchorEl}
                >
                    <MenuItem onClick={onSelectItem}>Profile</MenuItem>
                    <MenuItem onClick={onSelectItem}>My account</MenuItem>
                    <MenuItem onClick={onSelectItem}>Logout</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);
