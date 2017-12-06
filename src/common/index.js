import React from 'react';
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

export default {
    createTypographyLink
};
