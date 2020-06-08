import Chip from '@material-ui/core/Chip';
import { purple, red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { TypographyLink } from '../common';

import './Track.css';
import { LIGHT_BLUE_COLOR } from '../../utils/constants';

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
    textDecoration: 'none',
    margin: `0 0 ${theme.spacing(0.7)}px 0`,

    '&:hover': {
      color: LIGHT_BLUE_COLOR,
    },
  },
});

export const Info = withStyles(styles)((props) => (
  <div className={props.classes.root}>
    <TypographyLink
      href={props.trackUrl}
      hasNoDecoration
      className={props.classes.infoLink}
      variant="h6"
    >
      {props.trackName}
    </TypographyLink>
    <TypographyLink
      href={props.artistUrl}
      hasNoDecoration
      variant="body1"
      className={props.classes.infoLink}
    >
      {props.artistName}
    </TypographyLink>
    <TypographyLink
      href={props.albumUrl}
      hasNoDecoration
      variant="subtitle2"
      className={props.classes.infoLink}
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
));

Info.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  artistUrl: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  albumUrl: PropTypes.string.isRequired,
  isPopular: PropTypes.bool.isRequired,
};
