import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import './FooterPanel.css';

const styles = theme => ({
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
        {/* To do: Replace span with Material UI component */}
        {props.mainText}
        <span>{props.circleText}</span>
    </Button>
);

FooterPanel.propTypes = {
    mainText: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    circleText: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default withStyles(styles)(FooterPanel);
