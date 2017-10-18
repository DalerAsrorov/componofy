import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MaterialList, {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from 'material-ui/List';
import { PlaylistPlay } from 'material-ui-icons';
import { PLAYLIST_PROPTYPE } from '../../utils/constants';

const styles = theme => ({
    root: {
        width: '100%',
        padding: '0',
        background: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
});

class List extends PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PLAYLIST_PROPTYPE).isRequired,
        subheader: PropTypes.string,
        classes: PropTypes.object
    };

    render() {
        const { items, subheader, classes } = this.props;

        const ListOfItems = items.map(item => {
            return (
                <ListItem button divider key={item.id}>
                    <ListItemIcon>
                        <PlaylistPlay />
                    </ListItemIcon>
                    <ListItemText inset primary={item.name} />
                </ListItem>
            );
        });

        return (
            <MaterialList
                className={classes.root}
                subheader={<ListSubheader>{subheader}</ListSubheader>}
            >
                {ListOfItems}
            </MaterialList>
        );
    }
}

export default withStyles(styles)(List);
