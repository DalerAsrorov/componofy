import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 6,
        paddingBottom: 6
    }),

    link: {
        'text-decoration': 'none'
    }
});

const Info = props => {
    return (
        <div className={props.classes.root}>
            <Typography
                type="subheading"
                component="a"
                href={props.trackUrl}
                target="__blank"
                className={props.classes.link}
            >
                {props.trackName}
            </Typography>
            <Typography
                type="body1"
                component="a"
                href={props.artistUrl}
                target="__blank"
                className={props.classes.link}
            >
                {props.artistName}
            </Typography>
            <Typography
                type="caption"
                component="a"
                href={props.albumUrl}
                target="__blank"
                className={props.classes.link}
                noWrap
            >
                {props.albumName}
            </Typography>
        </div>
    );
};

export default withStyles(styles)(Info);
