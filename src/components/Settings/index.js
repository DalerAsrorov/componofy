import { Button, Menu } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Settings = (props) => (
  <React.Fragment>
    <Button
      onClick={props.onClickOptions}
      variant="contained"
      color="default"
      aria-controls="settings-menu"
      aria-haspopup="true"
    >
      {props.icon}
    </Button>
    <Menu
      id="settingsMenu"
      anchorEl={props.anchorEl}
      onClose={props.onCloseSettings}
      open={props.isOpen}
      keepMounted
    >
      {props.menuItems}
    </Menu>
  </React.Fragment>
);

Settings.propTypes = {
  onClickOptions: PropTypes.func.isRequired,
  onCloseSettings: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  menuItems: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  anchorEl: PropTypes.object,
  settingsWrapperStyle: PropTypes.object,
};

export default Settings;
