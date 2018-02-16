import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { head } from 'ramda';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Select from 'material-ui/Select';
import { Divider } from 'material-ui';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { LIGHT_CYAN_COLOR } from '../../utils/constants';

const styles = theme => ({
    formControl: {
        width: '100%'
    },

    loaderWrapper: {
        textAlign: 'center',
        width: '100%'
    },

    playlistName: {
        width: '100%',
        paddingLeft: `${theme.spacing.unit}px`
    },

    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
        color: LIGHT_CYAN_COLOR
    },

    select: {
        display: 'flex',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 1.5}px`
    },

    wrapper: {
        width: '100%'
    }
});

const MAX_PLAYLISTS_OFFSET_LIMIT = 50;

class AddExistingForm extends PureComponent {
    static propTypes = {
        onSetAddExistingOpenStatus: PropTypes.func.isRequired,
        onFetchPlaylistSelection: PropTypes.func.isRequired,
        selectedPlaylist: PropTypes.string.isRequired,
        wasAddExistingOpen: PropTypes.bool.isRequired,
        isFetchingOptions: PropTypes.bool.isRequired,
        onSelectPlaylist: PropTypes.func.isRequired,
        playlistOptions: PropTypes.array.isRequired,
        error: PropTypes.bool.isRequired,
        classes: PropTypes.object.isRequired,
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
            onFetchPlaylistSelection(0, MAX_PLAYLISTS_OFFSET_LIMIT);
        }
    }

    _handlePlaylistSelect = event => {
        const { onSelectPlaylist } = this.props;

        onSelectPlaylist(event.target.value);
    };

    render() {
        const {
            playlistOptions,
            error,
            classes,
            wasAddExistingOpen,
            isFetchingOptions,
            selectedPlaylist
        } = this.props;
        const playlistMenuSelects = playlistOptions.map(
            ({ id, name, images = [] }) => {
                return (
                    <MenuItem key={id} value={id}>
                        <ListItemIcon className={classes.icon}>
                            <Avatar
                                src={head(images).url}
                                alt={`${name} cover image`}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography
                                    type="title"
                                    color="secondary"
                                    component="p"
                                    className={classes.playlistName}
                                >
                                    {name}
                                </Typography>
                            }
                        />
                    </MenuItem>
                );
            }
        );

        let contentComponent = (
            <div className={classes.loaderWrapper}>
                <CircularProgress className={classes.progress} thickness={7} />
                <Typography type="caption" color="secondary">
                    Loading your playlists...
                </Typography>
            </div>
        );

        if (!isFetchingOptions) {
            contentComponent = (
                <FormControl className={classes.formControl} error={error}>
                    <InputLabel htmlFor="playlist-choice">
                        Choose Playlist
                    </InputLabel>
                    <Select
                        value={selectedPlaylist}
                        onChange={this._handlePlaylistSelect}
                        name="playlist"
                        classes={{
                            select: classes.select
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 420
                                }
                            }
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
