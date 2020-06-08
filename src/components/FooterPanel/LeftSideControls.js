import React from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, Typography } from '@material-ui/core';

const CustomMenu = (props) => (
  <React.Fragment>
    {props.button}
    <Menu
      id="leftSideMenuControls"
      anchorEl={props.anchorEl}
      onClose={props.onCloseMenu}
      open={props.isOpen}
      keepMounted
    >
      {props.menuItems}
    </Menu>
  </React.Fragment>
);

export const LeftSideControls = (props) => {
  let leftSideComponent = null;

  if (!props.shouldHideShowButton) {
    leftSideComponent = (
      <Button
        variant="contained"
        onClick={props.onClickMainLeftSideButton}
        disabled={!props.shouldShowCircle}
        color={props.mainButtonColor || 'secondary'}
        className={props.classes.loadmore}
        style={props.mainButtonStyle}
      >
        <Typography variant="button">{props.leftSideButtonText}</Typography>
      </Button>
    );
    if (props.customMenuItems) {
      leftSideComponent = (
        <CustomMenu
          button={leftSideComponent}
          anchorEl={props.customMenuAnchorEl}
          onCloseMenu={props.onCloseCustomMenu}
          isOpen={props.isCustomMenuOpen}
          menuItems={props.customMenuItems}
        />
      );
    }
  }

  return leftSideComponent;
};

LeftSideControls.propTypes = {
  onClickMainLeftSideButton: PropTypes.func.isRequired,
  leftSideButtonText: PropTypes.string.isRequired,
  onCloseCustomMenu: PropTypes.func,
  customMenuAnchorEl: PropTypes.any,
  customMenuItems: PropTypes.any,
  isCustomMenuOpen: PropTypes.bool,
  shouldHideShowButton: PropTypes.bool,
  shouldShowCircle: PropTypes.bool,
  hasFullWidthButtonMenu: PropTypes.bool,
  mainButtonColor: PropTypes.string,
  buttonMenuStyle: PropTypes.any,
  classes: PropTypes.any,
  mainButtonStyle: PropTypes.any,
};
