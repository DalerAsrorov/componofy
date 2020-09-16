import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import './Loader.css';

const styles = (theme) => ({
  loaderSection: {
    marginTop: `${theme.spacing(2)}px`,
  },

  noShadow: {
    boxShadow: 'none',
  },

  wrapper: {
    textAlign: 'center',
    padding: `${theme.spacing(2)}px`,
    height: '100%',
  },
});

const Loader = (props) => {
  const {
    wrapper,
    text,
    icon,
    classes,
    shouldShowShadows,
    ...restProps
  } = props;

  return (
    <Paper
      classes={{
        root: classNames(classes.wrapper, {
          [classes.noShadow]: !shouldShowShadows,
        }),
      }}
      {...restProps}
    >
      <section> {text} </section>
      <section className={classes.loaderSection}>{icon}</section>
    </Paper>
  );
};

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.any.isRequired,
  text: PropTypes.any.isRequired,
  shouldShowShadows: PropTypes.bool,
};

export default withStyles(styles)(Loader);
