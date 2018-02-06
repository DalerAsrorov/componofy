import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { head } from 'ramda';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

const styles = theme => ({
    menuItem: {},

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

        const playlistMenuSelects = playlistOptions.map(
            ({ id, name, images = [] }) => {
                return (
                    <MenuItem key={id} value={10} className={classes.menuItem}>
                        <Avatar
                            src={head(images).url}
                            alt={`${name} cover image`}
                        />
                        <Typography
                            align="center"
                            type="title"
                            color="secondary"
                        >
                            {name}
                        </Typography>
                    </MenuItem>
                );
            }
        );

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
                    {playlistMenuSelects}
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(AddExistingForm);
