import { ClickAwayListener, Grow, Paper } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Manager, Popper, Target } from 'react-popper';
import { DefaultWindow, MobileWindow } from '../common';

const styles = {
  customMenuPaper: {},

  fullWidthMenu: {
    width: '100%',
  },

  popperClose: {
    pointerEvents: 'none',
  },

  settingsButton: {},

  buttonTarget: {
    width: '100%',
    height: '100%',
  },
};

const PopperFactory = (props) => (
  <Popper
    eventsEnabled={props.isOpen}
    className={classNames({
      [props.classes.popperClose]: !props.isOpen,
      [props.classes.fullWidthMenu]: props.hasFullWidthMenu,
    })}
    placement="top-start"
  >
    <ClickAwayListener onClickAway={props.onSelectItem}>
      <Grow in={props.isOpen} style={{ transformOrigin: '0 0 0' }}>
        <Paper className={props.classes.customMenuPaper}>
          {props.menuItems}
        </Paper>
      </Grow>
    </ClickAwayListener>
  </Popper>
);

const CustomMenu = (props) => {
  const {
    iconComponent,
    customButton,
    wrapperStyle,
    menuButtonStyle,
    ...restProps
  } = props;

  let menuButton = customButton ? (
    customButton
  ) : (
    <Fab
      color="primary"
      variant="round"
      aria-haspopup="true"
      onClick={props.onClickOptions}
      style={menuButtonStyle}
      className={props.classes.settingsButton}
    >
      {iconComponent}
    </Fab>
  );

  return (
    <Manager style={wrapperStyle}>
      <Target className={props.classes.buttonTarget}>{menuButton}</Target>
      <MobileWindow>
        <PopperFactory {...restProps} hasFullWidthMenu={false} />
      </MobileWindow>
      <DefaultWindow>
        <PopperFactory
          {...restProps}
          hasFullWidthMenu={props.hasFullWidthMenu}
        />
      </DefaultWindow>
    </Manager>
  );
};

CustomMenu.propTypes = {
  onSelectItem: PropTypes.func.isRequired,
  menuItems: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClickOptions: PropTypes.func,
  iconComponent: PropTypes.object,
  customButton: PropTypes.object,
  wrapperStyle: PropTypes.object,
  menuButtonStyle: PropTypes.object,
  hasFullWidthMenu: PropTypes.bool,
  anchorEl: PropTypes.object,
};

export default withStyles(styles)(CustomMenu);
