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
import { withStyles } from 'material-ui/styles';
import { LIGHT_BLUE_COLOR, MOST_LIGHT_BLUE_COLOR } from '../../utils/constants';

const styles = theme => ({
    appBar: {
        position: 'relative'
    },

    flex: {
        color: MOST_LIGHT_BLUE_COLOR
    },

    formContainer: {
        margin: '0',
        padding: `${theme.spacing.unit}px`,
        display: 'flex'
    },

    publicSwitch: {
        color: 'green'
    },

    switchControl: {
        flex: '0 100px'
    },

    textField: {
        flex: '1'
    },

    toolbar: {
        background: LIGHT_BLUE_COLOR
    }
});

const Transition = props => <Slide direction="up" {...props} />;

class Dialog extends PureComponent {
    static propTypes = {
        setFinalPlaylistPublic: PropTypes.func.isRequired,
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

    _handlePublicSwitch = event => {
        event.preventDefault();

        const {
            setFinalPlaylistPublic,
            componoform: { isPublic }
        } = this.props;
        setFinalPlaylistPublic(!isPublic);
    };

    render() {
        const {
            componoform: { isPublic, playlistName },
            switchLabel,
            classes,
            isOpen,
            title,
            onClickClose
        } = this.props;

        console.log(this.props);

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
                    </form>
                </div>
            </MaterialDialog>
        );
    }
}

export default withStyles(styles)(Dialog);
