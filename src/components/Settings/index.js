import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import SettingsIcon from 'material-ui-icons/Settings';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const rightSpace = '30px';
const styles = theme => ({
    root: {},

    menu: {}
});

const SCROLL_DURATION = 500;
const SCROLL_TIMEOUT_DELAY = 1000;

let scroll = Scroll.animateScroll;

class Settings extends PureComponent {
    static propTypes = {
        setOpenStatusMyPlaylists: PropTypes.func.isRequired,
        onClickOptions: PropTypes.func.isRequired,
        onSelectItem: PropTypes.func.isRequired,
        canScrollUp: PropTypes.bool.isRequired,
        anchorEl: PropTypes.object,
        isOpen: PropTypes.bool
    };

    _handleClickUp = () => {
        this.props.onSelectItem();

        // When scrollToTop action is
        // triggered instantly, the transition
        // non-scrollable item and scrollable
        // becomes aparent, hence, some delay
        // in scrolling was needed
        setTimeout(() => {
            scroll.scrollToTop({
                duration: SCROLL_DURATION
            });
        }, SCROLL_TIMEOUT_DELAY);
    };

    _handleClickPlaylistCollapse = () => {
        this.props.setOpenStatusMyPlaylists();
        this.props.onSelectItem();
    };

    render() {
        const {
            onClickOptions,
            onSelectItem,
            canScrollUp,
            anchorEl,
            isOpen,
            classes
        } = this.props;

        return (
            <div>
                <Button
                    aria-owns={isOpen ? 'settingsMenu' : null}
                    aria-haspopup="true"
                    onClick={onClickOptions}
                >
                    Open Menu
                </Button>
                <Menu
                    id="settingsMenu"
                    open={isOpen}
                    onRequestClose={onSelectItem}
                    anchorEl={anchorEl}
                >
                    <MenuItem
                        disabled={!canScrollUp}
                        onClick={this._handleClickUp}
                    >
                        Up
                    </MenuItem>
                    <MenuItem onClick={this._handleClickPlaylistCollapse}>
                        Collapse
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);
