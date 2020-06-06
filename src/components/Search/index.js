import { FormControl, Input, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { safeString } from '../../utils/helpers';
import '../common/common.css';
import './Search.css';

const styles = (theme) => ({
  formControl: {
    background: `${theme.palette.common.white}`,
    zIndex: theme.zIndex.drawer,
    display: 'flex',
  },

  searchInput: {
    padding: `${theme.spacing.unit}px`,
  },
});

class Search extends PureComponent {
  static propTypes = {
    inputId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    inputLabel: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    const {
      classes,
      inputLabel,
      inputId,
      value,
      onChange,
      adortment,
      style,
      ...rest
    } = this.props;

    let inputLabelComponent = inputLabel ? (
      <InputLabel htmlFor={inputId}>{inputLabel}</InputLabel>
    ) : null;

    return (
      <FormControl
        fullWidth
        classes={{
          root: classNames(classes.formControl, 'sticky-top'),
        }}
      >
        {inputLabelComponent}
        <Input
          id={inputId}
          value={safeString(value)}
          onChange={onChange}
          className={classes.searchInput}
          {...rest}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(Search);
