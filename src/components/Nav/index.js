import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';
import HelpIcon from 'material-ui-icons/Help';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    }
});

class Nav extends PureComponent {
    static propTypes = {
        classes: PropTypes.object
    };

    _handleChange = (event, value) => {
        event.preventDefault();
        console.log(event, value);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        value={1}
                        onChange={this._handleChange}
                        scrollable
                        scrollButtons="off"
                    >
                        <Tab icon={<PhoneIcon />} />
                        <Tab icon={<FavoriteIcon />} />
                        <Tab icon={<PersonPinIcon />} />
                        <Tab icon={<HelpIcon />} />
                        <Tab icon={<ShoppingBasket />} />
                        <Tab icon={<ThumbDown />} />
                        <Tab icon={<ThumbUp />} />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Nav);
