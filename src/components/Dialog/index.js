import {
  AppBar,
  Avatar,
  Button,
  Dialog as MaterialDialog,
  Grid,
  IconButton,
  LinearProgress,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AddAPhoto, CheckCircle } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import FaRocket from 'react-icons/lib/fa/rocket';
import {
  LIGHT_BLUE_COLOR,
  MAX_IMAGE_SIZE_LIMIT,
  SUCCESS_COLOR,
} from '../../utils/constants';
import Loader from '../Loader';
import AddExistingForm from './AddExistingForm';
import CreateForm from './CreateForm';
import './Dialog.css';

const styles = (theme) => ({
  appBar: {
    position: 'relative',
  },

  descField: {
    marginBottom: `${theme.spacing(1)}px`,
  },

  dialogContainer: {
    width: 'inherit',
  },

  dropImageZone: {
    color: LIGHT_BLUE_COLOR,
    height: `${theme.spacing(18)}px`,
    border: `${theme.spacing(0.5)}px dotted ${theme.palette.grey[400]}`,
    cursor: 'pointer',
    marginBottom: `${theme.spacing(1)}px`,
  },

  dropImageZoneImg: {
    height: '100%',
    width: 'auto',
  },

  formContainer: {
    margin: '0',
    padding: `${theme.spacing(1)}px`,
  },

  inputSection: {
    display: 'flex',
  },

  loaderWrapper: {
    width: '80%',
    margin: '0 auto',
    marginTop: '200px',
  },

  newPlaylistImage: {
    height: '100%',
    width: '50%',
    margin: '0 auto',
    borderRadius: '0',
  },

  photoUploadIcon: {
    height: '100%',
    width: '100%',
  },

  publicSwitch: {
    color: 'green',
  },

  rightIcon: {
    marginLeft: theme.spacing(1),
    fontSize: `${theme.spacing(3)}px`,
  },

  submitButton: {},

  successCheck: {
    width: '4.5em',
    height: '4.5em',
    color: SUCCESS_COLOR,
  },

  succesButtons: {
    margin: theme.spacing(1),
  },

  submitText: {},

  topSpace: {
    marginTop: `${theme.spacing(4)}px`,
  },

  toolbar: {
    background: LIGHT_BLUE_COLOR,
  },
});

const LoaderWrapper = (props) => (
  <div className={props.classes.loaderWrapper}>{props.children}</div>
);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Dialog extends PureComponent {
  state = {
    error: false,
    hasAddExistingError: false,
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
    wasOpen: PropTypes.bool,
  };

  _handlePlaylistSelect = (selectedPlaylistId) => {
    const {
      componoform: { listOfMyPlaylists },
      setSelectedPlaylist,
      setFinalPlaylistImageURI,
    } = this.props;

    // If one of my playlists was selelcted, set the original
    // image url for the dropzone component image placeholder
    if (!R.isEmpty(selectedPlaylistId)) {
      listOfMyPlaylists.forEach(({ id, images }) => {
        if (id === selectedPlaylistId && !R.isEmpty(images)) {
          setFinalPlaylistImageURI(R.head(images).url);
        }
      });
    }

    // set the value of the selected playlist for options component
    setSelectedPlaylist(selectedPlaylistId);
  };

  _handlePlaylistNameChange = (event) => {
    if (!R.isEmpty(this.playlistNameRef.value)) {
      this.setState({ error: false });
    }
  };

  _handlePlaylistDescChange = (event) => {
    this.props.setNewPlaylistDesc(event.target.value);
  };

  _handlePublicSwitch = (event) => {
    event.preventDefault();

    const {
      setFinalPlaylistPublic,
      finalPlaylists: { isPublic },
    } = this.props;
    setFinalPlaylistPublic(!isPublic);
  };

  _handleImageUpload = (acceptedFiles, rejectedFiles) => {
    const { setFinalPlaylistImageURI, addErrorToApp } = this.props;

    if (!R.isEmpty(rejectedFiles)) {
      const { name: fileName } = R.head(rejectedFiles);

      addErrorToApp(
        `${fileName} is too large. Image shouldn't be more than ${
          MAX_IMAGE_SIZE_LIMIT / 1000
        }KB.`
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

  _handleClickSubmit = (event) => {
    event.preventDefault();
    const {
      launchPlaylistMerger,
      isCreateMode,
      addErrorToApp,
      componoform: { selectedPlaylistId },
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

  _handleClickBack = (event) => {
    event.preventDefault();

    const { onReturnToMain, clearComponoformData } = this.props;

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
      componoform: {
        finalPlaylistUrl,
        wasAddExistingOpen,
        listOfMyPlaylists,
        isFetchingOptions,
        selectedPlaylistId,
        totalNumberOfPlaylists,
        currentOffset,
      },
      finalPlaylists: {
        statusText: loaderText,
        status: shouldShowLoader,
        isPublic,
        imageUri,
      },
      isCreateMode,
      switchLabel,
      children,
      classes,
      isOpen,
      title,
      onClickClose,
    } = this.props;
    let modeForm = (
      <CreateForm
        error={error}
        onNameChange={this._handlePlaylistNameChange}
        onPublicSwitchClick={this._handlePublicSwitch}
        isPublic={isPublic}
        switchLabel={switchLabel}
        inputRef={(input) => {
          this.playlistNameRef = input;
        }}
      />
    );

    if (!isCreateMode) {
      modeForm = (
        <AddExistingForm
          onSetAddExistingOpenStatus={setComponoformAddExistingStatus}
          onFetchPlaylistSelection={this._handleFetchPlaylistSelection}
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

    const playlistImage = imageUri ? (
      <Avatar
        alt="New playlist image cover"
        src={imageUri}
        classes={{
          root: classes.newPlaylistImage,
          img: classes.dropImageZoneImg,
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
          <Typography align="center" color="textSecondary" variant="caption">
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
            variant="outlined"
            color="secondary"
          >
            <Typography
              variant="h4"
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
        <LoaderWrapper classes={classes}>
          <Loader
            icon={<LinearProgress color="secondary" />}
            text={
              <Typography variant="h3" color="textSecondary">
                {loaderText}
              </Typography>
            }
          />
        </LoaderWrapper>
      );
    } else if (!R.isEmpty(finalPlaylistUrl)) {
      modalContent = (
        <LoaderWrapper classes={classes}>
          <Loader
            icon={<CheckCircle className={classes.successCheck} />}
            text={
              <div>
                <Button
                  variant="outlined"
                  component="a"
                  color="secondary"
                  className={classes.succesButtons}
                  href={finalPlaylistUrl}
                  target="__blank"
                >
                  <Typography variant="h4" color="inherit">
                    See your playlist
                  </Typography>
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.succesButtons}
                  onClick={this._handleClickBack}
                >
                  <Typography variant="h4" color="inherit">
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
        TransitionComponent={Transition}
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
            <Typography variant="h5">{title}</Typography>
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
