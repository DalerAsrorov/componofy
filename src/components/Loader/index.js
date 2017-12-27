import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import './Loader.css';

const styles = theme => ({
    loaderSection: {
        marginTop: `${theme.spacing.unit * 2}px`
    },

    wrapper: {
        width: '100%'
    }
});

const Loader = props => {
    return (
        <div className={props.classes.wrapper}>
            <section> {props.text} </section>
            <section className={props.classes.loaderSection}>
                {props.icon}
            </section>
        </div>
    );
};

Loader.propTypes = {
    classes: PropTypes.object.isRequired,
    icon: PropTypes.any.isRequired,
    text: PropTypes.any.isRequired
};

export default withStyles(styles)(Loader);
