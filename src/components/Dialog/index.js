import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';

const styles = {
    appBar: {
        position: 'relative'
    },

    flex: {
        flex: 1
    }
};

const Transition = props => <Slide direction={props.direction} {...props} />;

class Dialog extends PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired
    };

    render() {
        return (
            <Dialog
                {...this.props}
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
                transition={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="contrast"
                            onClick={this.handleRequestClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            type="title"
                            color="inherit"
                            className={classes.flex}
                        >
                            Sound
                        </Typography>
                        <Button
                            color="contrast"
                            onClick={this.handleRequestClose}
                        >
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText
                            primary="Phone ringtone"
                            secondary="Titania"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItem>
                </List>
            </Dialog>
        );
    }
}
