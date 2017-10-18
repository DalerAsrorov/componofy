import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MaterialList, { ListSubheader } from 'material-ui/List';
import { PLAYLIST_PROPTYPE } from '../../utils/constants';
import Playlist from '../Playlist';

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
        const ListOfItems = items.map(item => (
            <Playlist key={item.id} playlist={item} />
        ));

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
