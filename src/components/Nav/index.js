import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import PersonPin from 'material-ui-icons/PersonPin';
import Public from 'material-ui-icons/Public';
import FlashOn from 'material-ui-icons/FlashOn';

const ROUTE_INDEX_MAP = {
    0: '/app',
    1: '/app/public'
};

const ROUTE_INDEX_REVERSE_MAP = {
    '/app': 0,
    '/app/public': 1
};

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper
    },

    tabContainer: {}
});

class Nav extends PureComponent {
    static propTypes = {
        navigateTo: PropTypes.func.isRequired,
        classes: PropTypes.object
    };

    state = {
        currentTabIndex: 0
    };

    componentDidMount() {
        const { location: { pathname } } = this.props;

        this.setState({
            currentTabIndex: ROUTE_INDEX_REVERSE_MAP[pathname]
        });
    }

    _handleChange = (event, value) => {
        event.preventDefault();

        this.props.navigateTo(ROUTE_INDEX_MAP[value]);
        this.setState({ currentTabIndex: value });
    };

    render() {
        const { classes } = this.props;
        const { currentTabIndex } = this.state;

        return (
            <Paper className={classes.root}>
                <Tabs
                    className={classes.tabContainer}
                    onChange={this._handleChange}
                    indicatorColor="accent"
                    value={currentTabIndex}
                    fullWidth
                    centered
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
