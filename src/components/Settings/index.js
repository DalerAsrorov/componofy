import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import CustomMenu from '../CustomMenu';
import { FlashOn } from 'material-ui-icons';

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
        anchorEl: PropTypes.object
    };

    render() {
        const {
            onClickOptions,
            onSelectItem,
            menuItems,
            anchorEl,
            isOpen
        } = this.props;

        return (
            <CustomMenu
                onClickOptions={onClickOptions}
                anchorEl={anchorEl}
                onSelectItem={onSelectItem}
                iconComponent={<FlashOn />}
                isOpen={isOpen}
                menuItems={menuItems}
            />
        );
    }
}

export default withStyles(styles)(Settings);
