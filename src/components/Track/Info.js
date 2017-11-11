import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import { purple, red } from 'material-ui/colors';

import './Track.css';

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 6,
        paddingBottom: 6
    }),

    popularity: {
        padding: `${theme.spacing.unit}px 0`
    },

    chip: {
        color: red[50],
        backgroundColor: purple['A200']
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
    let popularityChip;

    if (props.isPopular) {
        popularityChip = (
            <div className={props.classes.popularity}>
                <Chip label="Popular" className={props.classes.chip} />
            </div>
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
