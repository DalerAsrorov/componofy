import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { purple, red } from '@material-ui/core/colors';

import './Track.css';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 6,
    paddingBottom: 6,
  }),

  popularity: {
    // padding: `${theme.spacing.unit}px 0`
    padding: '0',
  },

  chip: {
    color: red[50],
    backgroundColor: purple['A200'],
    height: '20px',
    padding: '2px',
    marginTop: '5px',
  },
});

const createTypographyLink = (content, variant, href) => (
  <Typography
    className="link-default"
    variant={variant}
    component="a"
    href={href}
    target="__blank"
  >
    {content}
  </Typography>
);

const Info = (props) => {
  let popularityChip;

  if (props.isPopular) {
    const labelComponent = (
      <Typography variant="caption" color="textPrimary">
        Popular
      </Typography>
    );
    popularityChip = (
      <div className={props.classes.popularity}>
        <Chip label={labelComponent} className={props.classes.chip} />
      </div>
    );
  }

  return (
    <div className={props.classes.root}>
      {createTypographyLink(props.trackName, 'subtitle1', props.trackUrl)}
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
  isPopular: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Info);
