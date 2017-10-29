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
        const { track: { album, artists } } = this.props;
        console.log('track', album, artists);

        return (
            <ListItem>
                <ListItemIcon>
                    <span>Some</span>
                </ListItemIcon>
                <ListItemText inset primary={'name'} />
            </ListItem>
        );
    }
}

export default Track;
