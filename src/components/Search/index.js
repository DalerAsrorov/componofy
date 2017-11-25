import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import './Search.css';

const styles = theme => ({
    formControl: {
        background: `${theme.palette.common.fullWhite}`
    },

    searchInput: {
        margin: `${theme.spacing.unit}px 0`,
        padding: `${theme.spacing.unit + 4}px`
    }
});

class Search extends PureComponent {
    static propTypes = {
        inputId: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        inputLabel: PropTypes.string,
        adortment: PropTypes.any
    };

    render() {
        const {
            classes,
            inputLabel,
            inputId,
            value,
            onChange,
            adortment,
            ...rest
        } = this.props;

        let adortmentComponent = adortment ? (
            <InputAdornment position="start">{adortment}</InputAdornment>
        ) : null;
        let inputLabelComponent = inputLabel ? (
            <InputLabel htmlFor={inputId}>{inputLabel}</InputLabel>
        ) : null;

        return (
            <FormControl fullWidth className={classes.formControl}>
                {inputLabelComponent}
                <Input
                    id={inputId}
                    value={value}
                    onChange={onChange}
                    startAdornment={adortmentComponent}
                    className={classes.searchInput}
                    {...rest}
                />
            </FormControl>
        );
    }
}

export default withStyles(styles)(Search);
