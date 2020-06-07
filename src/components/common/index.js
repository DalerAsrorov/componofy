import React from 'react';
import Responsive from 'react-responsive';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

import './common.scss';

export const TypographyLink = (props) => (
  <Typography
    className="typography-link"
    component="a"
    target="__blank"
    {...props}
  >
    {props.children}
  </Typography>
);

export const MobileWindow = (props) => <Responsive {...props} maxWidth={767} />;
export const DefaultWindow = (props) => (
  <Responsive {...props} minWidth={768} />
);

const styles = (theme) => ({
  checked: {
    color: theme.palette.grey[600],
  },
});
export const CheckBox = withStyles(styles)((props) => (
  <Checkbox className={props.classes.cb} {...props} />
));

export default {
  CheckBox,
  DefaultWindow,
  MobileWindow,
  TypographyLink,
};
