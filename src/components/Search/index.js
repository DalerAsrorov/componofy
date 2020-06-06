import { FormControl, Input, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
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
    padding: `${theme.spacing(1)}px`,
  },

  searchInputIcon: {
    padding: `${theme.spacing(1)}px`,
  },
});

class Search extends PureComponent {
  static propTypes = {
    inputId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSearchIconClick: PropTypes.func.isRequired,
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
      onSearchIconClick,
      adortment,
      style,
      ...rest
    } = this.props;

    return (
      <FormControl
        fullWidth
        classes={{
          root: classNames(classes.formControl, 'sticky-top'),
        }}
      >
        {inputLabel && <InputLabel htmlFor={inputId}>{inputLabel}</InputLabel>}
        <Input
          id={inputId}
          value={safeString(value)}
          onChange={onChange}
          className={classes.searchInput}
          startAdornment={
            <SearchIcon
              color="action"
              onClick={onSearchIconClick}
              className={classes.searchInputIcon}
            />
          }
          {...rest}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(Search);
