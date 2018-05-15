import React from 'react';
import PropTypes from 'prop-types';
import CustomMenu from '../CustomMenu';

const Settings = props => (
    <CustomMenu
        onClickOptions={props.onClickOptions}
        anchorEl={props.anchorEl}
        onSelectItem={props.onSelectItem}
        iconComponent={props.icon}
        isOpen={props.isOpen}
        menuItems={props.menuItems}
        menuButtonStyle={props.menuButtonStyle}
        wrapperStyle={props.settingsWrapperStyle}
    />
)

Settings.propTypes = {
    onClickOptions: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    menuItems: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    anchorEl: PropTypes.object
}

export default Settings;
