import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Settings from '../../containers/Settings';
import { Settings as SettingsIcon } from 'material-ui-icons';
import CustomMenu from '../CustomMenu';

import './FooterPanel.css';

const styles = theme => ({
    root: {
        paddingTop: `${theme.spacing.unit}px`,
        paddingBottom: `${theme.spacing.unit}px`,
        display: 'flex',
        zIndex: theme.zIndex.navDrawer
    },

    maintext: {},

    loadmore: {
        flex: '1 60px'
    },

    secondaryBtn: {
        flex: '1',
        textAlign: 'left'
    },

    settingsWrapper: {
        flex: '1',
        float: 'right'
    },

    settings: {},

    loaderSection: {
        flex: '1 100px',
        display: 'flex',
        flexDirection: 'row'
    },

    settingsSection: {
        flex: '1'
    }
});

export const FooterPanel = props => {
    let circleTextIcon;

    if (props.shouldShowCircle) {
        circleTextIcon = (
            <IconButton
                color="primary"
                disabled
                aria-label="Playlists remaining"
                className={props.classes.secondaryBtn}
            >
                {props.circleText}
            </IconButton>
        );
    }

    let leftSideComponent = (
        <Button
            onClick={props.onClick}
            disabled={!props.shouldShowCircle}
            raised
            color={props.mainButtonColor}
            className={props.classes.loadmore}
            style={props.mainButtonStyle}
        >
            <Typography type="subheading">{props.mainText}</Typography>
        </Button>
    );

    if (props.customButtonMenu) {
        leftSideComponent = (
            <CustomMenu
                anchorEl={props.customMenuAnchorEl}
                onSelectItem={props.onSelectCustomMenuItem}
                customButton={leftSideComponent}
                isOpen={props.isCustomMenuOpen}
                menuItems={props.customButtonMenu}
                wrapperStyle={props.buttonMenuStyle}
                hasFullWidthMenu={props.hasFullWidthButtonMenu}
            />
        );
    }

    return (
        <Toolbar style={props.style} className={props.classes.root}>
            <section className={props.classes.loaderSection}>
                {leftSideComponent}
                {circleTextIcon}
            </section>
            <section className={props.classes.settingsSection}>
                <Settings
                    onSelectItem={props.onSelectItem}
                    onClickOptions={props.onClickOptions}
                    menuItems={props.menuItems}
                    anchorEl={props.anchorEl}
                    isOpen={props.isOpen}
                    className={props.classes.settings}
                    icon={<SettingsIcon />}
                    settingsWrapperStyle={{ float: 'right' }}
                />
            </section>
        </Toolbar>
    );
};

FooterPanel.propTypes = {
    mainButtonColor: PropTypes.string.isRequired,
    onClickOptions: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    menuItems: PropTypes.object.isRequired,
    mainText: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired,
    classes: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    customButtonMenu: PropTypes.object,
    anchorEl: PropTypes.object,
    circleText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
    ]),
    menuButtonStyle: PropTypes.object,
    customMenuAnchorEl: PropTypes.object,
    onClickCustomMenuOptions: PropTypes.func,
    hasFullWidthButtonMenu: PropTypes.bool,
    shouldShowCircle: PropTypes.bool,
    mainButtonStyle: PropTypes.object,
    buttonMenuStyle: PropTypes.object,
    style: PropTypes.object
};

export default withStyles(styles)(FooterPanel);
