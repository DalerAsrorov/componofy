import Typography from '@material-ui/core/Typography';
import React from 'react';
import Responsive from 'react-responsive';

import './common.scss';

export const TypographyLink = ({
  children,
  hasNoDecoration,
  ...typographyProps
}) => (
  <Typography
    className="typography-link"
    component="a"
    target="__blank"
    style={{
      textDecoration: hasNoDecoration ? 'none' : 'underline',
    }}
    {...typographyProps}
  >
    {children}
  </Typography>
);

export const MobileWindow = (props) => <Responsive {...props} maxWidth={767} />;
export const DefaultWindow = (props) => (
  <Responsive {...props} minWidth={768} />
);

export default {
  DefaultWindow,
  MobileWindow,
  TypographyLink,
};
