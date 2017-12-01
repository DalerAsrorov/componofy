import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import MaterialDialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = theme => ({
    appBar: {
        position: 'relative'
    },

    flex: {
        flex: 1
    }
});

const Transition = props => <Slide direction="up" {...props} />;

class Dialog extends PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClickClose: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {
        const { title, isOpen, onClickClose, classes } = this.props;

        return (
            <MaterialDialog
                fullScreen
                open={isOpen}
                onRequestClose={onClickClose}
                transition={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="contrast"
                            onClick={onClickClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            type="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>container</div>
            </MaterialDialog>
        );
    }
}

export default withStyles(styles)(Dialog);
