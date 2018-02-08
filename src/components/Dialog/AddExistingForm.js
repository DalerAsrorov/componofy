import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { head } from 'ramda';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Avatar from 'material-ui/Avatar';
import Select from 'material-ui/Select';
import { Divider } from 'material-ui';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { LIGHT_CYAN_COLOR } from '../../utils/constants';

const styles = theme => ({
    form: {
        width: '100%'
    },

    menuItem: {},

    playlistName: {
        width: '100%',
        paddingLeft: `${theme.spacing.unit}px`
    },

    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
        color: LIGHT_CYAN_COLOR
    },

    wrapper: {
        textAlign: 'center',
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
        isFetchingOptions: PropTypes.bool.isRequired,
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
            wasAddExistingOpen,
            isFetchingOptions
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
                            type="title"
                            color="secondary"
                            className={classes.playlistName}
                        >
                            {name}
                        </Typography>
                        <Divider />
                    </MenuItem>
                );
            }
        );

        let contentComponent = (
            <div className={classes.wrapper}>
                <CircularProgress className={classes.progress} thickness={7} />
                <Typography type="caption" color="secondary">
                    Loading your playlists...
                </Typography>
            </div>
        );

        if (!isFetchingOptions) {
            contentComponent = (
                <FormControl className={classes.form}>
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

        return (
            <div id="addExistingForm" className={classes.wrapper}>
                {contentComponent}
            </div>
        );
    }
}

export default withStyles(styles)(AddExistingForm);
