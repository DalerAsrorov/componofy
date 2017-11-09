import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
import Typography from 'material-ui/Typography';
import ArrowDropDownCircle from 'material-ui-icons/ArrowDropDownCircle';
import Badge from 'material-ui/Badge';

import './FooterPanel.css';

const styles = theme => ({
    badge: {
        margin: `0 ${theme.spacing.unit * 2}px`
    },

    root: {
        background: lightBlue[600]
    },

    maintext: {},

    loadmore: {}
});

export const FooterPanel = props => {
    let footerContent = (
        <Typography type="subheading" className={props.classes.root}>
            {props.mainText}
        </Typography>
    );

    // if (props.shouldShowCircle) {
    //     footerContent = (
    //         {/* <Badge
    //             className={props.classes.badge + ' footer-panel-badge'}
    //             color="primary"
    //             badgeContent={props.circleText ? props.circleText : ''}
    //         > */}
    //             <Typography type="subheading">{props.mainText}</Typography>
    //         // </Badge>
    //     );
    // }

    return (
        <Toolbar className={props.classes.root}>
            <Button
                onClick={props.onClick}
                disabled={!props.shouldShowCircle}
                raised
                color="accent"
                className={props.classes.loadmore}
            >
                <Typography type="subheading">{props.mainText}</Typography>
            </Button>
            <IconButton
                color="primary"
                disabled
                aria-label="Playlists remaining"
            >
                {props.circleText}
            </IconButton>
        </Toolbar>
    );
};

FooterPanel.propTypes = {
    mainText: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    circleText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shouldShowCircle: PropTypes.bool
};

export default withStyles(styles)(FooterPanel);
