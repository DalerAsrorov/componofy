import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import './Track.css';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 6,
        paddingBottom: 6
    }),

    link: {
        'text-decoration': 'none'
    }
});

const createTypographyLink = (content, type, href) => (
    <Typography
        className="link-default"
        type={type}
        component="a"
        href={href}
        target="__blank"
    >
        {content}
    </Typography>
);

const Info = props => {
    return (
        <div className={props.classes.root}>
            {createTypographyLink(
                props.trackName,
                'subheading',
                props.trackUrl
            )}
            {createTypographyLink(props.artistName, 'body1', props.artistUrl)}
            {createTypographyLink(props.albumName, 'caption', props.albumUrl)}
        </div>
    );
};

export default withStyles(styles)(Info);
