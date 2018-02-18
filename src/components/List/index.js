import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MaterialList, { ListSubheader } from 'material-ui/List';
import { is } from 'ramda';
import { PLAYLIST_PROPTYPE } from '../../utils/constants';
import Playlist from '../../containers/Playlist';
import Track from '../../containers/Track';

const styles = theme => ({
    root: {
        width: '100%',
        padding: '0',
        background: theme.palette.background.paper
    },

    listSubheader: {
        background: '#ffffff'
    }
});

class List extends PureComponent {
    static propTypes = {
        items: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.arrayOf(PLAYLIST_PROPTYPE),
            PropTypes.arrayOf(
                // TODO: https://github.com/DalerAsrorov/componofy/issues/18
                PropTypes.object
            )
        ]).isRequired,
        onDragAndDrop: PropTypes.func,
        onClickItem: PropTypes.func,
        onCheckboxActive: PropTypes.func,
        onClickMain: PropTypes.func,
        subheader: PropTypes.string,
        classes: PropTypes.object,
        keyItem: PropTypes.object,
        showSubItemsOnly: PropTypes.bool
    };

    render() {
        const {
            items,
            keyItem,
            classes,
            subheader,
            showSubItemsOnly,
            isPlaylist,
            onClickMain,
            onClickItem,
            onDragAndDrop,
            ...restProps
        } = this.props;
        let listOfItems, listSub;

        listSub = subheader ? (
            <ListSubheader className={classes.listSubheader}>
                {subheader}
            </ListSubheader>
        ) : null;

        listOfItems = is(Array, items)
            ? items.map(playlist => (
                  <Playlist
                      onClickIcon={onClickMain}
                      onClickPlaylist={onClickItem}
                      key={playlist.id}
                      playlist={playlist}
                      showTracksOnly={showSubItemsOnly}
                      onDragAndDrop={onDragAndDrop}
                  />
              ))
            : [];

        return (
            <MaterialList
                className={classes.root}
                subheader={listSub}
                {...restProps}
            >
                {listOfItems}
            </MaterialList>
        );
    }
}

export default withStyles(styles)(List);
