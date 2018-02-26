import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { ExpandMore, ExpandLess } from 'material-ui-icons';
import classNames from 'classnames';
import '../common/common.css';

const styles = theme => ({
    button: {
        marginBottom: theme.spacing.unit
    },

    wrapper: {
        textAlign: 'center'
    }
});

const Expand = props => {
    return (
        <footer
            className={classNames(
                props.classes.wrapper,
                { 'sticky-bottom': props.isStickyBottom },
                { 'sticky-top': props.isStickyTop }
            )}
        >
            <Button
                fab
                color="accent"
                aria-label="expand"
                onClick={props.onClick}
                className={props.classes.button}
            >
                {props.showUpArrow ? <ExpandLess /> : <ExpandMore />}
            </Button>
        </footer>
    );
};

Expand.propTypes = {
    onClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    showUpArrow: PropTypes.bool,
    isStickyBottom: PropTypes.bool,
    isStickyTop: PropTypes.bool
};

export default withStyles(styles)(Expand);
