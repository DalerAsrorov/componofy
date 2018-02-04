import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { Manager, Target, Popper } from 'react-popper';
import classNames from 'classnames';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

const styles = {
    popperClose: {
        pointerEvents: 'none'
    },

    settingsButton: {},

    buttonTarget: {
        float: 'right'
    }
};

const DefaultButton = props => {
    const { innerContent, ...restProps } = props;

    return <Button {...restProps}>{innerContent}</Button>;
};

const CustomMenu = props => {
    const { iconComponent, customButton } = props;

    let menuButton = customButton ? (
        customButton
    ) : (
        <DefaultButton
            innerContent={iconComponent}
            aria-owns={props.isOpen ? 'menu-list' : null}
            color="primary"
            className={props.classes.settingsButton}
            aria-haspopup="true"
            onClick={props.onClickOptions}
            fab
        />
    );

    return (
        <Manager>
            <Target className={props.classes.buttonTarget}>{menuButton}</Target>
            <Popper
                eventsEnabled={props.isOpen}
                className={classNames({
                    [props.classes.popperClose]: !props.isOpen
                })}
                placement="top-start"
            >
                <ClickAwayListener onClickAway={props.onSelectItem}>
                    <Grow
                        in={props.isOpen}
                        id="menu-list"
                        style={{ transformOrigin: '0 0 0' }}
                    >
                        <Paper>{props.menuItems}</Paper>
                    </Grow>
                </ClickAwayListener>
            </Popper>
        </Manager>
    );
};

CustomMenu.propTypes = {
    iconComponent: PropTypes.object.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    menuItems: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClickOptions: PropTypes.func,
    customButton: PropTypes.object,
    anchorEl: PropTypes.object
};

export default withStyles(styles)(CustomMenu);
