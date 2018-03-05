import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import './Loader.css';

const styles = theme => ({
    loaderSection: {
        marginTop: `${theme.spacing.unit * 2}px`
    },

    wrapper: {
        width: '100%',
        textAlign: 'center',
        height: '100%'
    }
});

const Loader = props => {
    const { wrapper, text, icon, classes, ...restProps } = props;
    return (
        <Paper classes={{ root: classes.wrapper }} {...restProps}>
            <section> {text} </section>
            <section className={classes.loaderSection}>{icon}</section>
        </Paper>
    );
};

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
    icon: PropTypes.any.isRequired,
    text: PropTypes.any.isRequired
};

export default withStyles(styles)(Loader);
