import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Settings as SettingsIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { LIGHT_BLUE_COLOR } from '../../utils/constants';
import '../common/common.css';
import CustomMenu from '../CustomMenu';
import Settings from '../Settings';

import './FooterPanel.css';

const styles = (theme) => ({
  root: {
    paddingTop: `${theme.spacing(1)}px`,
    paddingBottom: `${theme.spacing(1)}px`,
    display: 'flex',
    zIndex: theme.zIndex.drawer,
    background: LIGHT_BLUE_COLOR,
  },

  loadmore: {
    flex: '1 60px',
  },

  secondaryBtn: {
    flex: '1',
    textAlign: 'left',
  },

  settingsWrapper: {
    flex: '1',
    float: 'right',
  },

  settings: {},

  loaderSection: {
    flex: '1 100px',
    display: 'flex',
    flexDirection: 'row',
  },

  settingsSection: {
    flex: '1',
    textAlign: 'right',
  },
});

export const FooterPanel = (props) => {
  let circleTextIcon, leftSideComponent;

  if (props.shouldShowCircle) {
    circleTextIcon = (
      <IconButton
        color="primary"
        disabled
        aria-label="Playlists remaining"
        className={props.classes.secondaryBtn}
      >
        {props.circleText}
      </IconButton>
    );
  }

  if (!props.shouldHideShowButton) {
    leftSideComponent = (
      <Button
        onClick={props.onClick}
        disabled={!props.shouldShowCircle}
        color={props.mainButtonColor || 'secondary'}
        className={props.classes.loadmore}
        style={props.mainButtonStyle}
        variant="contained"
      >
        <Typography variant="button">{props.mainText}</Typography>
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

  return (
    <Toolbar
      style={props.style}
      classes={{
        root: classNames(props.classes.root, 'sticky-bottom'),
      }}
    >
      <section className={props.classes.loaderSection}>
        {leftSideComponent}
        {circleTextIcon}
      </section>
      <section className={props.classes.settingsSection}>
        <Settings
          onSelectItem={props.onSelectItem}
          onCloseSettings={props.onCloseSettings}
          onClickOptions={props.onClickOptions}
          menuItems={props.menuItems}
          anchorEl={props.anchorEl}
          isOpen={props.isOpen}
          className={props.classes.settings}
          icon={<SettingsIcon />}
        />
      </section>
    </Toolbar>
  );
};

FooterPanel.propTypes = {
  onClickOptions: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  menuItems: PropTypes.object.isRequired,
  mainText: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  customButtonMenu: PropTypes.object,
  mainButtonColor: PropTypes.string,
  anchorEl: PropTypes.object,
  circleText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  menuButtonStyle: PropTypes.object,
  customMenuAnchorEl: PropTypes.object,
  onClickCustomMenuOptions: PropTypes.func,
  onCloseSettings: PropTypes.func.isRequired,
  hasFullWidthButtonMenu: PropTypes.bool,
  shouldShowMainButton: PropTypes.bool,
  shouldShowCircle: PropTypes.bool,
  mainButtonStyle: PropTypes.object,
  buttonMenuStyle: PropTypes.object,
  style: PropTypes.object,
};

export default withStyles(styles)(FooterPanel);
