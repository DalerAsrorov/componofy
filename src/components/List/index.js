import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'material-ui/transitions/Collapse';
import { withStyles } from 'material-ui/styles';
import MaterialList, {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from 'material-ui/List';
import {
    ExpandLess,
    ExpandMore,
    StarBorder,
    PlaylistPlay
} from 'material-ui-icons';

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 500,
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
    items: PropTypes.array.isRequired,
    subheader: PropTypes.string.isRequired,
    classes: PropTypes.object
};

export default withStyles(styles)(List);
