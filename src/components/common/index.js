import React from 'react';
import Responsive from 'react-responsive';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  checked: {
    color: theme.palette.grey[600]
  }
});

export const createTypographyLink = (content, variant, href, color) => (
  <Typography
    className="link-default"
    variant={variant}
    component="a"
    href={href}
    color={color}
    target="__blank"
  >
    {content}
  </Typography>
);

export const MobileWindow = props => <Responsive {...props} maxWidth={767} />;
export const DefaultWindow = props => <Responsive {...props} minWidth={768} />;
export const CheckBox = withStyles(styles)(props => (
  <Checkbox className={props.classes.cb} {...props} />
));

export default {
  CheckBox,
  DefaultWindow,
  MobileWindow,
  createTypographyLink
};
