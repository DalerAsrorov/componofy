import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
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

    maintext: {},

    loadmore: {
        width: '100%'
    }
});

export const FooterPanel = props => (
    <Button
        onClick={props.onClick}
        raised
        color="accent"
        className={props.classes.loadmore}
    >
        <Badge
            className={props.classes.badge + ' footer-panel-badge'}
            color="primary"
            badgeContent={props.circleText ? props.circleText : ''}
        >
            <Typography type="subheading" className={props.classes.root}>
                {props.mainText}
            </Typography>
        </Badge>
    </Button>
);

FooterPanel.propTypes = {
    mainText: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    circleText: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default withStyles(styles)(FooterPanel);
