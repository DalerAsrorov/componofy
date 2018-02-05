import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    textField: {
        flex: '1',
        width: '100%'
    },
    switchControl: {
        flex: '0 100px'
    }
});

const CreateForm = props => {
    const {
        error,
        switchLabel,
        onNameChange,
        classes,
        isPublic,
        onPublicSwitchClick,
        wrapperStyle,
        ...restProps
    } = props;

    return (
        <div id="createFormInput" style={wrapperStyle}>
            <TextField
                id="newPlaylistName"
                error={error}
                onChange={onNameChange}
                margin="normal"
                defaultValue=""
                label="Playlist Name"
                className={classes.textField}
                {...restProps}
            />
            <FormControlLabel
                className={classes.switchControl}
                control={
                    <Switch
                        checked={isPublic}
                        onClick={onPublicSwitchClick}
                        aria-label="isNewPlaylistPublic"
                    />
                }
                label={switchLabel}
            />
        </div>
    );
};

CreateForm.propTypes = {
    onPublicSwitchClick: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    switchLabel: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    isPublic: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    wrapperStyle: PropTypes.object
};

export default withStyles(styles)(CreateForm);
