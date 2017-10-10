import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import PersonPin from 'material-ui-icons/PersonPin';
import Public from 'material-ui-icons/Public';
import FlashOn from 'material-ui-icons/FlashOn';

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
                        <Tab icon={<PersonPin />} />
                        <Tab icon={<Public />} />
                        <Tab icon={<FlashOn />} />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Nav);
