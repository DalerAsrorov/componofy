import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Settings as SettingsIcon } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { LIGHT_BLUE_COLOR } from '../../utils/constants';
import Settings from '../Settings';
import { LeftSideControls } from './LeftSideControls';

import '../common/common.css';
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
    flex: `1 ${theme.spacing(8)}px`,
  },

  secondaryBtn: {
    flex: '1',
    textAlign: 'left',
  },

  settingsWrapper: {
    flex: '1',
    float: 'right',
  },

  loaderSection: {
    flex: `1 ${theme.spacing(13)}px`,
    display: 'flex',
    flexDirection: 'row',
  },

  settingsSection: {
    flex: '1',
    textAlign: 'right',
  },
});

export const FooterPanel = (props) => (
  <Toolbar
    style={props.style}
    classes={{
      root: classNames(props.classes.root, 'sticky-bottom'),
    }}
  >
    <section className={props.classes.loaderSection}>
      <LeftSideControls {...props} />
      {props.shouldShowCircle && (
        <IconButton
          color="primary"
          disabled
          aria-label="Playlists remaining"
          className={props.classes.secondaryBtn}
        >
          {props.circleText}
        </IconButton>
      )}
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

FooterPanel.propTypes = {
  onClickOptions: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func.isRequired,
  menuItems: PropTypes.object.isRequired,
  leftSideButtonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClickMainLeftSideButton: PropTypes.func.isRequired,
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
  onSelectCustomMenuItem: PropTypes.func,
  isCustomMenuOpen: PropTypes.bool,
  hasFullWidthButtonMenu: PropTypes.bool,
  shouldShowMainButton: PropTypes.bool,
  shouldHideShowButton: PropTypes.bool,
  shouldShowCircle: PropTypes.bool,
  mainButtonStyle: PropTypes.object,
  buttonMenuStyle: PropTypes.object,
  style: PropTypes.object,
};

export default withStyles(styles)(FooterPanel);
