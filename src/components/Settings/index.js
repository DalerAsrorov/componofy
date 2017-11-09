import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SettingsApplications from 'material-ui-icons/SettingsApplications';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({});

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
        const { onClickOptions, onSelectItem, anchorEl, isOpen } = this.props;

        return (
            <Paper>
                <IconButton
                    aria-label="Options"
                    aria-haspopup="true"
                    onClick={onClickOptions}
                >
                    <SettingsApplications />
                </IconButton>
                <Menu
                    onRequestClose={onSelectItem}
                    anchorEl={anchorEl}
                    open={isOpen}
                >
                    {options.map(option => (
                        <MenuItem
                            key={option}
                            selected={option === 'Pyxis'}
                            onClick={onSelectItem}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Paper>
        );
    }
}

export default withStyles(styles)(Settings);
