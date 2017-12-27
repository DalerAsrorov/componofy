import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import { safeString } from '../../utils/helpers';

import './Search.css';

const styles = theme => ({
    formControl: {
        background: `${theme.palette.common.fullWhite}`
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
        value: PropTypes.string
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
                style={style}
                fullWidth
                className={classes.formControl}
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
