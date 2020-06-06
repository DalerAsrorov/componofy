import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPin from '@material-ui/icons/PersonPin';
import Public from '@material-ui/icons/Public';
import FlashOn from '@material-ui/icons/FlashOn';

import './Nav.css';

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: `${theme.spacing(1)}px`,
  },

  tabContainer: {},
});

class Nav extends PureComponent {
  static propTypes = {
    numberOfFinalPlaylists: PropTypes.number.isRequired,
    navigation: PropTypes.object.isRequired,
    setNavIndex: PropTypes.func.isRequired,
    navigateTo: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {
      setNavIndex,
      location: { pathname },
      navigation,
    } = this.props;

    setNavIndex(navigation.routeToIndexMap[pathname]);
  }

  _handleChange = (event, value) => {
    event.preventDefault();
    const { setNavIndex, navigateTo, navigation } = this.props;

    navigateTo(navigation.indexToRouteMap[value]);
    setNavIndex(value);
  };

  render() {
    const {
      classes,
      numberOfFinalPlaylists,
      navigation: { index: currentTabIndex },
    } = this.props;
    const userAddedPlaylist = numberOfFinalPlaylists !== 0;

    let componofyIcon = <FlashOn />;

    if (userAddedPlaylist) {
      componofyIcon = (
        <Badge
          className="number-badge"
          badgeContent={numberOfFinalPlaylists}
          color="secondary"
        >
          <FlashOn />
        </Badge>
      );
    }

    return (
      <Paper className={classes.root}>
        <Tabs
          className={classes.tabContainer}
          onChange={this._handleChange}
          indicatorColor="secondary"
          value={currentTabIndex}
          variant="fullWidth"
          centered
        >
          <Tab icon={<PersonPin />} label="My" />
          <Tab icon={<Public />} label="Public" />
          <Tab
            disabled={!userAddedPlaylist}
            icon={componofyIcon}
            label="Componofy"
          />
        </Tabs>
      </Paper>
    );
  }
}

export default withStyles(styles)(Nav);
