import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import MaterialDialog from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { FormControlLabel } from 'material-ui/Form';
import { AddAPhoto } from 'material-ui-icons';
import Dropzone from 'react-dropzone';
import * as R from 'ramda';
import { withStyles } from 'material-ui/styles';
import { LIGHT_BLUE_COLOR, MOST_LIGHT_BLUE_COLOR } from '../../utils/constants';

const styles = theme => ({
    appBar: {
        position: 'relative'
    },

    descField: {
        marginBottom: `${theme.spacing.unit}px`
    },

    dropImageZone: {
        width: '60%',
        color: LIGHT_BLUE_COLOR,
        height: `${theme.spacing.unit * 18}px`,
        textAlign: 'center',
        border: `${theme.spacing.unit / 2}px dotted ${theme.palette.common
            .lightBlack}`,
        margin: '0 auto',
        cursor: 'pointer'
    },

    flex: {
        color: MOST_LIGHT_BLUE_COLOR
    },

    formContainer: {
        margin: '0',
        padding: `${theme.spacing.unit}px`
    },

    inputSection: {
        display: 'flex'
    },

    photoUploadIcon: {
        height: '100%',
        width: '100%'
    },

    publicSwitch: {
        color: 'green'
    },

    switchControl: {
        flex: '0 100px'
    },

    textField: {
        flex: '1',
        width: '100%'
    },

    toolbar: {
        background: LIGHT_BLUE_COLOR
    }
});

const Transition = props => <Slide direction="up" {...props} />;

class Dialog extends PureComponent {
    static propTypes = {
        setFinalPlaylistPublic: PropTypes.func.isRequired,
        setFinalPlaylistImageURI: PropTypes.func.isRequired,
        setNewPlaylistName: PropTypes.func.isRequired,
        finalPlaylists: PropTypes.object.isRequired,
        componoform: PropTypes.object.isRequired,
        switchLabel: PropTypes.string.isRequired,
        onClickClose: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired
    };

    _handlePlaylistNameChange = event => {
        this.props.setNewPlaylistName(event.target.value);
    };

    _handlePlaylistDescChange = event => {
        this.props.setNewPlaylistDesc(event.target.value);
    };

    _handlePublicSwitch = event => {
        event.preventDefault();

        const {
            setFinalPlaylistPublic,
            componoform: { isPublic }
        } = this.props;
        setFinalPlaylistPublic(!isPublic);
    };

    _handleImageUpload = (acceptedFiles, rejectedFiles) => {
        const { setFinalPlaylistImageURI } = this.props;

        if (!R.isEmpty(acceptedFiles)) {
            const file = R.head(acceptedFiles);
            const reader = new FileReader();

            reader.onload = () => {
                const { result: base64URI } = reader;

                setFinalPlaylistImageURI(base64URI);
            };

            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.readAsDataURL(file);
        }
    };

    render() {
        const {
            componoform: { isPublic, playlistName, playlistDesc },
            finalPlaylists,
            switchLabel,
            children,
            classes,
            isOpen,
            title,
            onClickClose
        } = this.props;
        let tracks;

        return (
            <MaterialDialog
                fullScreen
                open={isOpen}
                onRequestClose={onClickClose}
                transition={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            color="contrast"
                            onClick={onClickClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography type="title" className={classes.flex}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>
                    <form
                        className={classes.formContainer}
                        noValidate={false}
                        autoComplete="off"
                    >
                        <section>
                            <Dropzone
                                accept="image/jpeg"
                                onDrop={this._handleImageUpload}
                                className={classes.dropImageZone}
                            >
                                <AddAPhoto
                                    className={classes.photoUploadIcon}
                                />
                            </Dropzone>
                        </section>
                        <section className={classes.inputSection}>
                            <TextField
                                id="playlistName"
                                onChange={this._handlePlaylistNameChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={playlistName}
                                label="Playlist Name"
                                className={classes.textField}
                                required
                            />
                            <FormControlLabel
                                className={classes.switchControl}
                                control={
                                    <Switch
                                        checked={isPublic}
                                        onClick={this._handlePublicSwitch}
                                        aria-label="publicPlaylist"
                                    />
                                }
                                label={switchLabel}
                            />
                        </section>
                        <section className={classes.descField}>
                            <TextField
                                id="playlistDesc"
                                onChange={this._handlePlaylistDescChange}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                value={playlistDesc}
                                label="Playlist Description"
                                className={classes.textField}
                            />
                        </section>
                        <section>{children}</section>
                    </form>
                </div>
            </MaterialDialog>
        );
    }
}

export default withStyles(styles)(Dialog);
