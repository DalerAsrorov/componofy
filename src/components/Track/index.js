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

        return (
            <ListItem>
                <ListItemIcon>
                    <span>Some</span>
                </ListItemIcon>
                <ListItemText inset primary={track.name} />
            </ListItem>
        );
    }
}

export default Track;
