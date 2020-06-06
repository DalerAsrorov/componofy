import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
});

class ErrorSnackBar extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    autoHideDuration: PropTypes.number.isRequired,
    errorId: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    isOpen: true,
  };

  _handleClose = () => {
    const { errorId, onClose } = this.props;

    this.setState({
      isOpen: false,
    });

    setTimeout(() => {
      onClose(errorId);
    }, 1000);
  };

  render() {
    const { classes, autoHideDuration, errorId, message } = this.props;
    const { isOpen } = this.state;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isOpen}
        autoHideDuration={autoHideDuration}
        onClose={this._handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id={`error-${errorId}`}>{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this._handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

export default withStyles(styles)(ErrorSnackBar);
