import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import PersonPin from 'material-ui-icons/PersonPin';
import Public from 'material-ui-icons/Public';
import FlashOn from 'material-ui-icons/FlashOn';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },

    tabContainer: {}
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
            <Paper className={classes.root}>
                <Tabs
                    className={classes.tabContainer}
                    value={0}
                    fullWidth
                    centered
                    indicatorColor="accent"
                    onChange={this._handleChange}
                >
                    <Tab icon={<PersonPin />} label="My" />
                    <Tab icon={<Public />} label="Public" />
                    <Tab icon={<FlashOn />} label="Componofy" />
                </Tabs>
            </Paper>
        );
    }
}

export default withStyles(styles)(Nav);
