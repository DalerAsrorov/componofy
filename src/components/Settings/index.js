import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CustomMenu from '../CustomMenu';

const styles = theme => ({
    root: {},

    menu: {}
});

class Settings extends PureComponent {
    static propTypes = {
        onClickOptions: PropTypes.func.isRequired,
        onSelectItem: PropTypes.func.isRequired,
        menuItems: PropTypes.object.isRequired,
        isOpen: PropTypes.bool.isRequired,
        icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        anchorEl: PropTypes.object
    };

    render() {
        const {
            onClickOptions,
            onSelectItem,
            menuItems,
            anchorEl,
            isOpen,
            icon
        } = this.props;

        return (
            <CustomMenu
                onClickOptions={onClickOptions}
                anchorEl={anchorEl}
                onSelectItem={onSelectItem}
                iconComponent={icon}
                isOpen={isOpen}
                menuItems={menuItems}
            />
        );
    }
}

export default withStyles(styles)(Settings);
