import React from 'react';
import Responsive from 'react-responsive';
import Typography from 'material-ui/Typography';

export const createTypographyLink = (content, type, href, color) => (
    <Typography
        className="link-default"
        type={type}
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

export default {
    createTypographyLink,
    DefaultWindow,
    MobileWindow
};
