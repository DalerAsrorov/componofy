import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

const styles = theme => ({
    wrapper: {
        width: '100%'
    }
});

class AddExistingForm extends PureComponent {
    static propTypes = {
        onSetAddExistingOpenStatus: PropTypes.func.isRequired,
        onFetchPlaylistSelection: PropTypes.func.isRequired,
        playlistOptions: PropTypes.array.isRequired,
        error: PropTypes.bool.isRequired,
        classes: PropTypes.object.isRequired,
        wasAddExistingOpen: PropTypes.bool.isRequired,
        wasDialogOpen: PropTypes.bool
    };

    componentDidMount() {
        const {
            onFetchPlaylistSelection,
            onSetAddExistingOpenStatus,
            wasAddExistingOpen
        } = this.props;

        if (!wasAddExistingOpen) {
            onSetAddExistingOpenStatus(true);
            onFetchPlaylistSelection(10);
        }
    }

    render() {
        const {
            playlistOptions,
            error,
            classes,
            wasAddExistingOpen
        } = this.props;

        return (
            <FormControl id="addExistingForm" className={classes.wrapper}>
                <InputLabel htmlFor="playlist-choice">
                    Choose Playlist
                </InputLabel>
                <Select
                    value=""
                    onChange={() => {}}
                    inputProps={{
                        name: 'playlist',
                        id: 'playlist-choice'
                    }}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(AddExistingForm);
