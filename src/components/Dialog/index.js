import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import MaterialDialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import Slide from 'material-ui/transitions/Slide';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
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
import Loader from '../Loader';
import CreateForm from './CreateForm';
import AddExistingForm from './AddExistingForm';

import './Dialog.css';

const styles = theme => ({
    appBar: {
        position: 'relative'
    },

    descField: {
        marginBottom: `${theme.spacing.unit}px`
    },

    dialogContainer: {
        width: 'inherit'
    },

    dropImageZone: {
        color: LIGHT_BLUE_COLOR,
        height: `${theme.spacing.unit * 18}px`,
        border: `${theme.spacing.unit / 2}px dotted ${theme.palette.grey[400]}`,
        cursor: 'pointer',
        marginBottom: `${theme.spacing.unit}px`
    },

    dropImageZoneImg: {
        height: '100%',
        width: 'auto'
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
        marginTop: '200px'
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

    submitButton: {},

    successCheck: {
        width: '4.5em',
        height: '4.5em',
        color: SUCCESS_COLOR
    },

    succesButtons: {
        margin: theme.spacing.unit
    },

    submitText: {},

    topSpace: {
        marginTop: `${theme.spacing.unit * 4}px`
    },

    toolbar: {
        background: LIGHT_BLUE_COLOR
    }
});

const Transition = props => <Slide direction="up" {...props} />;

class Dialog extends PureComponent {
    state = {
        error: false,
        hasAddExistingError: false
    };

    static propTypes = {
        setComponoformAddExistingStatus: PropTypes.func.isRequired,
        fetchMyPlaylistsForSelection: PropTypes.func.isRequired,
        setFinalPlaylistImageURI: PropTypes.func.isRequired,
        setFinalPlaylistPublic: PropTypes.func.isRequired,
        launchPlaylistMerger: PropTypes.func.isRequired,
        clearComponoformData: PropTypes.func.isRequired,
        setSelectedPlaylist: PropTypes.func.isRequired,
        finalPlaylists: PropTypes.object.isRequired,
        onReturnToMain: PropTypes.func.isRequired,
        componoform: PropTypes.object.isRequired,
        switchLabel: PropTypes.string.isRequired,
        onClickClose: PropTypes.func.isRequired,
        addErrorToApp: PropTypes.func.isRequired,
        isCreateMode: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        wasOpen: PropTypes.bool
    };

    _handlePlaylistSelect = selectedPlaylistId => {
        const { setSelectedPlaylist } = this.props;

        if (!R.isEmpty(setSelectedPlaylist)) {
            this.setState({
                hasAddExistingError: false
            });
        }

        setSelectedPlaylist(selectedPlaylistId);
    };

    _handlePlaylistNameChange = event => {
        if (!R.isEmpty(this.playlistNameRef.value)) {
            this.setState({ error: false });
        }
    };

    _handlePlaylistDescChange = event => {
        this.props.setNewPlaylistDesc(event.target.value);
    };

    _handlePublicSwitch = event => {
        event.preventDefault();

        const {
            setFinalPlaylistPublic,
            finalPlaylists: { isPublic }
        } = this.props;
        setFinalPlaylistPublic(!isPublic);
    };

    _handleImageUpload = (acceptedFiles, rejectedFiles) => {
        const { setFinalPlaylistImageURI, addErrorToApp } = this.props;

        if (!R.isEmpty(rejectedFiles)) {
            const { name: fileName } = R.head(rejectedFiles);

            addErrorToApp(
                `${fileName} is too large. Image shouldn't be more than ${MAX_IMAGE_SIZE_LIMIT /
                    1000}KB.`
            );
        } else if (!R.isEmpty(acceptedFiles)) {
            const file = R.head(acceptedFiles);
            const reader = new FileReader();

            reader.onload = () => {
                const { result: base64URI } = reader;

                setFinalPlaylistImageURI(base64URI);
            };

            reader.onabort = () => console.warn('file reading was aborted');
            reader.onerror = () => console.error('file reading has failed');

            reader.readAsDataURL(file);
        }
    };

    _handleClickSubmit = event => {
        event.preventDefault();
        const {
            launchPlaylistMerger,
            isCreateMode,
            addErrorToApp,
            componoform: { selectedPlaylistId }
        } = this.props;

        if (isCreateMode) {
            const { value: playlistName } = this.playlistNameRef;

            if (!R.isEmpty(playlistName)) {
                launchPlaylistMerger(playlistName);
                return;
            }

            this.setState({ error: true });
        } else {
            if (!R.isEmpty(selectedPlaylistId)) {
                launchPlaylistMerger();
                return;
            }

            this.setState({ hasAddExistingError: true });
        }

        addErrorToApp('Fix errors before submitting again.');
    };

    _handleClickBack = event => {
        event.preventDefault();

        const {
            onReturnToMain,
            setFinalPlaylistUrl,
            clearComponoformData
        } = this.props;

        clearComponoformData();
        onReturnToMain();
    };

    _handleFetchPlaylistSelection = (offset, limit) => {
        this.props.fetchMyPlaylistsForSelection(offset, limit);
    };

    render() {
        const { error, hasAddExistingError } = this.state;
        const {
            setComponoformAddExistingStatus,
            setCurrentSelectionOffset,
            setSelectedPlaylist,
            componoform: {
                finalPlaylistUrl,
                wasAddExistingOpen,
                listOfMyPlaylists,
                isFetchingOptions,
                selectedPlaylistId,
                totalNumberOfPlaylists,
                currentOffset
            },
            finalPlaylists: {
                statusText: loaderText,
                status: shouldShowLoader,
                isPublic,
                imageUri
            },
            isCreateMode,
            switchLabel,
            children,
            classes,
            isOpen,
            title,
            onClickClose,
            wasOpen
        } = this.props;
        let modeForm = (
            <CreateForm
                error={error}
                onNameChange={this._handlePlaylistNameChange}
                onPublicSwitchClick={this._handlePublicSwitch}
                isPublic={isPublic}
                switchLabel={switchLabel}
                inputRef={input => {
                    this.playlistNameRef = input;
                }}
            />
        );

        if (!isCreateMode) {
            modeForm = (
                <AddExistingForm
                    onSetAddExistingOpenStatus={setComponoformAddExistingStatus}
                    onFetchPlaylistSelection={
                        this._handleFetchPlaylistSelection
                    }
                    error={hasAddExistingError}
                    playlistOptions={listOfMyPlaylists}
                    wasAddExistingOpen={wasAddExistingOpen}
                    isFetchingOptions={isFetchingOptions}
                    onSelectPlaylist={this._handlePlaylistSelect}
                    selectedPlaylist={selectedPlaylistId}
                    onSetCurrentOffset={setCurrentSelectionOffset}
                    currentOffset={currentOffset}
                    totalNumberOfPlaylists={totalNumberOfPlaylists}
                />
            );
        }

        const LoaderWrapper = props => (
            <div className={classes.loaderWrapper}>{props.children}</div>
        );

        let playlistImage = imageUri ? (
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
                <section id="dropImageZone">
                    <Dropzone
                        accept="image/jpeg"
                        onDrop={this._handleImageUpload}
                        className={classes.dropImageZone}
                        maxSize={MAX_IMAGE_SIZE_LIMIT}
                    >
                        {playlistImage}
                    </Dropzone>
                    <Typography
                        align="center"
                        color="textSecondary"
                        variant="caption"
                    >
                        Add playlist cover image (optional)
                    </Typography>
                </section>
                <section
                    className={classes.inputSection}
                    data-subform="componofy-inputs"
                >
                    {modeForm}
                </section>
                <section>{children}</section>
                <section className={classes.topSpace}>
                    <Button
                        onClick={this._handleClickSubmit}
                        type="submit"
                        className={classes.photoUploadIcon}
                        variant="raised"
                        color="secondary"
                    >
                        <Typography
                            variant="headline"
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
                        icon={<LinearProgress color="secondary" />}
                        text={
                            <Typography variant="title" color="textSecondary">
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
                                    variant="raised"
                                    component="a"
                                    color="secondary"
                                    className={classes.succesButtons}
                                    href={finalPlaylistUrl}
                                    target="__blank"
                                >
                                    <Typography
                                        variant="headline"
                                        color="inherit"
                                    >
                                        See your playlist
                                    </Typography>
                                </Button>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    className={classes.succesButtons}
                                    onClick={this._handleClickBack}
                                >
                                    <Typography
                                        variant="headline"
                                        color="inherit"
                                    >
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
                onClose={onClickClose}
                transition={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            onClick={onClickClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="title" className={classes.flex}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid
                    className={classes.dialogContainer}
                    container
                    justify="center"
                    spacing={8}
                >
                    <Grid item lg={8} xs={12}>
                        {modalContent}
                    </Grid>
                </Grid>
            </MaterialDialog>
        );
    }
}

export default withStyles(styles)(Dialog);
