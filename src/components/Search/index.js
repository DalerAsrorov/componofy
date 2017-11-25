import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import './Search.css';

const styles = theme => ({
    formControl: {}
});

class Search extends PureComponent {
    static propTypes = {
        inputLabel: PropTypes.string.isRequired,
        inputId: PropTypes.string.isRequired,
        classes: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
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

        return (
            <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor={inputId}>{inputLabel}</InputLabel>
                <Input
                    id={inputId}
                    value={value}
                    onChange={onChange}
                    startAdornment={adortmentComponent}
                    {...rest}
                />
            </FormControl>
        );
    }
}

export default withStyles(styles)(Search);
