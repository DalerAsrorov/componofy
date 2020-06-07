import Chip from '@material-ui/core/Chip';
import { purple, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { TypographyLink } from '../common';

import './Track.css';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 6,
    paddingBottom: 6,
  }),

  chip: {
    color: red[50],
    backgroundColor: purple['A200'],
    height: '20px',
    padding: '2px',
    marginTop: '5px',
  },

  popularity: {
    padding: '0',
  },

  infoLink: {
    display: 'block',
    margin: `${theme.spacing(0.5)}px 0`,
  },
});

const Info = (props) => (
  <div className={props.classes.root}>
    <TypographyLink
      className={props.classes.infoLink}
      variant="h6"
      href={props.trackUrl}
    >
      {props.trackName}
    </TypographyLink>
    <TypographyLink
      className={props.classes.infoLink}
      variant="body1"
      href={props.artistUrl}
    >
      {props.artistName}
    </TypographyLink>
    <TypographyLink
      className={props.classes.infoLink}
      variant="subtitle2"
      href={props.albumUrl}
    >
      {props.albumName}
    </TypographyLink>
    {props.isPopular && (
      <Chip
        label={
          <Typography variant="caption" color="textPrimary">
            Popular
          </Typography>
        }
        className={props.classes.chip}
      />
    )}
  </div>
);

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
