import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import CustomMenu from '../CustomMenu';

export const LeftSideControls = (props) => {
  let leftSideComponent = null;

  if (!props.shouldHideShowButton) {
    leftSideComponent = (
      <Button
        onClick={props.onClickMainLeftSideButton}
        disabled={!props.shouldShowCircle}
        color={props.mainButtonColor || 'secondary'}
        className={props.classes.loadmore}
        style={props.mainButtonStyle}
        variant="contained"
      >
        <Typography variant="button">{props.leftSideButtonText}</Typography>
      </Button>
    );

    if (props.customButtonMenu) {
      leftSideComponent = (
        <CustomMenu
          anchorEl={props.customMenuAnchorEl}
          onSelectItem={props.onSelectCustomMenuItem}
          customButton={leftSideComponent}
          isOpen={props.isCustomMenuOpen}
          menuItems={props.customButtonMenu}
          wrapperStyle={props.buttonMenuStyle}
          hasFullWidthMenu={props.hasFullWidthButtonMenu}
        />
      );
    }
  }

  return leftSideComponent;
};

LeftSideControls.propTypes = {
  onClickMainLeftSideButton: PropTypes.func.isRequired,
  leftSideButtonText: PropTypes.string.isRequired,
  onSelectCustomMenuItem: PropTypes.func,
  customMenuAnchorEl: PropTypes.any,
  customButtonMenu: PropTypes.any,
  isCustomMenuOpen: PropTypes.bool,
  shouldHideShowButton: PropTypes.bool,
  shouldShowCircle: PropTypes.bool,
  hasFullWidthButtonMenu: PropTypes.bool,
  mainButtonColor: PropTypes.string,
  buttonMenuStyle: PropTypes.any,
  classes: PropTypes.any,
  mainButtonStyle: PropTypes.any,
};
