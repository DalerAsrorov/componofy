import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MaterialList, {
    ListItem,
    ListItemIcon,
    ListItemText
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

class Track extends PureComponent {
    static propType = {
        track: PropTypes.object
    };

    render() {
        const { track } = this.props;
        const { artists, album, name: trackName } = track;

        const { name: artistName, href: artistUrl } = artists[0];

        console.log('track', track);

        return (
            <ListItem>
                <ListItemIcon>
                    <span>{trackName}</span>
                </ListItemIcon>
                <ListItemText inset primary={artistName} />
            </ListItem>
        );
    }
}

export default Track;
