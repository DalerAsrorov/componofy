import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import MaterialDialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import Slide from 'material-ui/transitions/Slide';
import Switch from 'material-ui/Switch';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { FormControlLabel } from 'material-ui/Form';
import { LinearProgress } from 'material-ui/Progress';
import { AddAPhoto, CheckCircle } from 'material-ui-icons';
import FaRocket from 'react-icons/lib/fa/rocket';
import Dropzone from 'react-dropzone';
import * as R from 'ramda';
import { withStyles } from 'material-ui/styles';
import {
    LIGHT_BLUE_COLOR,
    MOST_LIGHT_BLUE_COLOR,
    SUCCESS_COLOR,
    MAX_IMAGE_SIZE_LIMIT
} from '../../utils/constants';
import { createTypographyLink } from '../../common';
import Loader from '../Loader';

const styles = theme => ({
    appBar: {
        position: 'relative'
    },

    descField: {
        marginBottom: `${theme.spacing.unit}px`
    },

    dropImageZone: {
        color: LIGHT_BLUE_COLOR,
        height: `${theme.spacing.unit * 18}px`,
        border: `${theme.spacing.unit / 2}px dotted ${theme.palette.common
            .lightBlack}`,
        cursor: 'pointer'
    },

    dropImageZoneImg: {
        height: '100%'
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

    loaderWrapper: {
        width: '80%',
        margin: '0 auto',
        marginTop: '200px',
        textAlign: 'center'
    },

    newPlaylistImage: {
        height: '100%',
        width: '50%',
        margin: '0 auto',
        borderRadius: '0'
    },

    photoUploadIcon: {
        height: '100%',
        width: '100%'
    },

    publicSwitch: {
        color: 'green'
    },

    rightIcon: {
        marginLeft: theme.spacing.unit,
        fontSize: `${theme.spacing.unit * 3}px`
    },

    switchControl: {
        flex: '0 100px'
    },

    submitButton: {},

    successCheck: {
        width: '4.5em',
        height: '4.5em',
        color: SUCCESS_COLOR
    },

    succesButtons: {
        color: MOST_LIGHT_BLUE_COLOR,
        margin: theme.spacing.unit
    },

    submitText: {},

    topSpace: {
        marginTop: `${theme.spacing.unit * 2}px`
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
        launchPlaylistMerger: PropTypes.func.isRequired,
        setNewPlaylistName: PropTypes.func.isRequired,
        finalPlaylists: PropTypes.object.isRequired,
        onReturnToMain: PropTypes.func.isRequired,
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

    _handleClickSubmit = event => {
        event.preventDefault();

        const { launchPlaylistMerger } = this.props;

        // ToDo: error handling

        // if no errors, submit
        launchPlaylistMerger();
    };

    _handleClickBack = event => {
        event.preventDefault();

        const { onReturnToMain } = this.props;

        onReturnToMain();
    };

    render() {
        const {
            componoform: { isPublic, playlistName, playlistDesc, imageUri },
            finalPlaylists: {
                statusText: loaderText,
                status: shouldShowLoader,
                finalPlaylistUrl
            },
            switchLabel,
            children,
            classes,
            isOpen,
            title,
            onClickClose
        } = this.props;
        const LoaderWrapper = props => (
            <div className={classes.loaderWrapper}>{props.children}</div>
        );

        let tracks,
            playlistImage = imageUri ? (
                <Avatar
                    alt="New playlist image cover"
                    src={imageUri}
                    classes={{
                        root: classes.newPlaylistImage,
                        img: classes.dropImageZoneImg
                    }}
                />
            ) : (
                <AddAPhoto className={classes.photoUploadIcon} />
            );
        let modalContent = (
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
                        maxSize={MAX_IMAGE_SIZE_LIMIT}
                    >
                        {playlistImage}
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
                <section>{children}</section>
                <section className={classes.topSpace}>
                    <Button
                        onClick={this._handleClickSubmit}
                        type="submit"
                        className={classes.photoUploadIcon}
                        raised
                        color="accent"
                    >
                        <Typography
                            type="headline"
                            className={classes.submitText}
                            color="inherit"
                        >
                            Start
                        </Typography>
                        <FaRocket className={classes.rightIcon} />
                    </Button>
                </section>
            </form>
        );

        if (shouldShowLoader) {
            modalContent = (
                <LoaderWrapper>
                    <Loader
                        icon={<LinearProgress color="accent" />}
                        text={
                            <Typography type="title" color="secondary">
                                {loaderText}
                            </Typography>
                        }
                    />
                </LoaderWrapper>
            );
        } else if (!R.isEmpty(finalPlaylistUrl)) {
            modalContent = (
                <LoaderWrapper>
                    <Loader
                        icon={<CheckCircle className={classes.successCheck} />}
                        text={
                            <div>
                                <Button
                                    raised
                                    color="accent"
                                    className={classes.succesButtons}
                                >
                                    {createTypographyLink(
                                        'See your playlist',
                                        'headline',
                                        finalPlaylistUrl,
                                        'inherit'
                                    )}
                                </Button>
                                <Button
                                    raised
                                    color="primary"
                                    className={classes.succesButtons}
                                    onClick={this._handleClickBack}
                                >
                                    <Typography type="headline" color="inherit">
                                        Back to app
                                    </Typography>
                                </Button>
                            </div>
                        }
                    />
                </LoaderWrapper>
            );
        }

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
                <div>{modalContent}</div>
            </MaterialDialog>
        );
    }
}

export default withStyles(styles)(Dialog);
