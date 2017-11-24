import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import CustomMenu from '../CustomMenu';
import { FlashOn } from 'material-ui-icons';

const rightSpace = '30px';
const styles = theme => ({
    root: {},

    menu: {}
});

let scroll = Scroll.animateScroll;

class Settings extends PureComponent {
    static propTypes = {
        onClickOptions: PropTypes.func.isRequired,
        onSelectItem: PropTypes.func.isRequired,
        menuItems: PropTypes.object.isRequired,
        isOpen: PropTypes.bool.isRequired,
        anchorEl: PropTypes.object,
        isOpen: PropTypes.bool
    };

    render() {
        const {
            onClickOptions,
            onSelectItem,
            menuItems,
            anchorEl,
            isOpen,
            classes
        } = this.props;

        return (
            <CustomMenu
                onClickOptions={onClickOptions}
                anchorEl={anchorEl}
                onSelectItem={onSelectItem}
                iconComponent={FlashOn}
                isOpen={isOpen}
                menuItems={menuItems}
            />
        );
    }
}

export default withStyles(styles)(Settings);
