import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import { head } from 'ramda';
import { withStyles } from 'material-ui/styles';
import { Divider } from 'material-ui';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { LIGHT_CYAN_COLOR, PLAYLIST_OFFSET_LIMIT } from '../../utils/constants';

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

class AddExistingForm extends PureComponent {
    static propTypes = {
        onSetAddExistingOpenStatus: PropTypes.func.isRequired,
        onFetchPlaylistSelection: PropTypes.func.isRequired,
        totalNumberOfPlaylists: PropTypes.number.isRequired,
        selectedPlaylist: PropTypes.string.isRequired,
        wasAddExistingOpen: PropTypes.bool.isRequired,
        onSetCurrentOffset: PropTypes.func.isRequired,
        isFetchingOptions: PropTypes.bool.isRequired,
        onSelectPlaylist: PropTypes.func.isRequired,
        playlistOptions: PropTypes.array.isRequired,
        currentOffset: PropTypes.number.isRequired,
        classes: PropTypes.object.isRequired,
        error: PropTypes.bool.isRequired,
        wasDialogOpen: PropTypes.bool
    };

    _handleSelectionFetch = () => {
        const {
            onSetCurrentOffset,
            onFetchPlaylistSelection,
            totalNumberOfPlaylists,
            currentOffset
        } = this.props;

        if (currentOffset < totalNumberOfPlaylists) {
            onFetchPlaylistSelection(currentOffset, PLAYLIST_OFFSET_LIMIT);
            onSetCurrentOffset(currentOffset + PLAYLIST_OFFSET_LIMIT);
        }
    };

    componentDidMount() {
        const {
            onFetchPlaylistSelection,
            onSetAddExistingOpenStatus,
            onSetCurrentOffset,
            wasAddExistingOpen,
            currentOffset
        } = this.props;

        if (!wasAddExistingOpen) {
            onSetAddExistingOpenStatus(true);
            onFetchPlaylistSelection(currentOffset, PLAYLIST_OFFSET_LIMIT);
            onSetCurrentOffset(PLAYLIST_OFFSET_LIMIT);
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
            selectedPlaylist,
            currentOffset
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

        if (!isFetchingOptions || currentOffset >= 20) {
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
                        <Waypoint
                            onEnter={() => {
                                this._handleSelectionFetch();
                            }}
                        />
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
