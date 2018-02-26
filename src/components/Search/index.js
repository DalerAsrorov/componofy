import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import classNames from 'classnames';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import { safeString } from '../../utils/helpers';

import './Search.css';
import '../common/common.css';

const styles = theme => ({
    formControl: {
        background: `${theme.palette.common.fullWhite}`,
        zIndex: theme.zIndex.navDrawer,
        display: 'flex'
    },

    searchInput: {
        padding: `${theme.spacing.unit}px`
    }
});

class Search extends PureComponent {
    static propTypes = {
        inputId: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        inputLabel: PropTypes.string,
        value: PropTypes.string,
        style: PropTypes.object
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
                    root: classNames(classes.formControl, 'sticky-top')
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
