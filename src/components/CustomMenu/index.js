import React from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { Manager, Target, Popper } from 'react-popper';
import classNames from 'classnames';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

const styles = {
    customMenuPaper: {},

    fullWidthMenu: {
        width: '100%'
    },

    popperClose: {
        pointerEvents: 'none'
    },

    settingsButton: {},

    buttonTarget: {
        width: '100%',
        height: '100%'
    }
};

const DefaultButton = props => {
    const { innerContent, ...restProps } = props;

    return <Button {...restProps}>{innerContent}</Button>;
};

const MobileWindow = props => <Responsive {...props} maxWidth={767} />;
const DefaultWindow = props => <Responsive {...props} minWidth={768} />;

const PopperFactory = props => (
    <Popper
        eventsEnabled={props.isOpen}
        className={classNames({
            [props.classes.popperClose]: !props.isOpen,
            [props.classes.fullWidthMenu]: props.hasFullWidthMenu
        })}
        placement="top-start"
    >
        <ClickAwayListener onClickAway={props.onSelectItem}>
            <Grow in={props.isOpen} style={{ transformOrigin: '0 0 0' }}>
                <Paper className={props.classes.customMenuPaper}>
                    {props.menuItems}
                </Paper>
            </Grow>
        </ClickAwayListener>
    </Popper>
);

const CustomMenu = props => {
    const {
        iconComponent,
        customButton,
        wrapperStyle,
        menuButtonStyle,
        ...restProps
    } = props;

    let menuButton = customButton ? (
        customButton
    ) : (
        <DefaultButton
            innerContent={iconComponent}
            color="primary"
            className={props.classes.settingsButton}
            aria-haspopup="true"
            onClick={props.onClickOptions}
            style={menuButtonStyle}
            fab
        />
    );

    return (
        <Manager style={wrapperStyle}>
            <Target className={props.classes.buttonTarget}>{menuButton}</Target>
            <MobileWindow>
                <PopperFactory {...restProps} hasFullWidthMenu={false} />
            </MobileWindow>
            <DefaultWindow>
                <PopperFactory
                    {...restProps}
                    hasFullWidthMenu={props.hasFullWidthMenu}
                />
            </DefaultWindow>
        </Manager>
    );
};

CustomMenu.propTypes = {
    onSelectItem: PropTypes.func.isRequired,
    menuItems: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClickOptions: PropTypes.func,
    iconComponent: PropTypes.object,
    customButton: PropTypes.object,
    wrapperStyle: PropTypes.object,
    menuButtonStyle: PropTypes.object,
    hasFullWidthMenu: PropTypes.bool,
    anchorEl: PropTypes.object
};

export default withStyles(styles)(CustomMenu);
