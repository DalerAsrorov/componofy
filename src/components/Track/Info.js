import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';

import './Track.css';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 6,
        paddingBottom: 6
    }),

    link: {
        'text-decoration': 'none'
    },

    popolarity: {}
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
    let popularityChip;

    if (props.isPopular) {
        popularityChip = (
            <Chip label="Popular" className={props.classes.popularity} />
        );
    }

    return (
        <div className={props.classes.root}>
            {createTypographyLink(
                props.trackName,
                'subheading',
                props.trackUrl
            )}
            {createTypographyLink(props.artistName, 'body1', props.artistUrl)}
            {createTypographyLink(props.albumName, 'caption', props.albumUrl)}
            {popularityChip}
        </div>
    );
};

Info.propTypes = {
    trackName: PropTypes.string.isRequired,
    trackUrl: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    artistUrl: PropTypes.string.isRequired,
    albumName: PropTypes.string.isRequired,
    albumUrl: PropTypes.string.isRequired,
    isPopular: PropTypes.bool.isRequired
};

export default withStyles(styles)(Info);
