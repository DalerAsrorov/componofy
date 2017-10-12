import React from 'react';
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
        background: theme.palette.background.paper
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4
    }
});

const List = props => {
    const { items } = props;

    const ListOfItems = items.map(item => {
        return (
            <ListItem button key={item.id}>
                <ListItemIcon>
                    <PlaylistPlay />
                </ListItemIcon>
                <ListItemText inset primary={item.name} />
            </ListItem>
        );
    });

    return (
        <MaterialList
            className={props.classes.root}
            subheader={<ListSubheader>{props.subheader}</ListSubheader>}
        >
            {ListOfItems}
        </MaterialList>
    );
};

List.propTypes = {
    items: PropTypes.arrayOf(PLAYLIST_PROPTYPE).isRequired,
    subheader: PropTypes.string,
    classes: PropTypes.object
};

export default withStyles(styles)(List);