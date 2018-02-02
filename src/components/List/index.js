import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MaterialList, { ListSubheader } from 'material-ui/List';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { is } from 'ramda';
import { PLAYLIST_PROPTYPE } from '../../utils/constants';
import Playlist from '../../containers/Playlist';
import Track from '../../containers/Track';

const styles = theme => ({
    root: {
        width: '100%',
        padding: '0',
        background: theme.palette.background.paper
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
        onClickItem: PropTypes.func,
        onCheckboxActive: PropTypes.func,
        onClickMain: PropTypes.func,
        onMoveItem: PropTypes.func,
        subheader: PropTypes.string,
        classes: PropTypes.object,
        keyItem: PropTypes.object,
        showSubItemsOnly: PropTypes.bool
    };

    render() {
        const {
            items,
            subheader,
            classes,
            isPlaylist,
            onClickMain,
            onClickItem,
            keyItem,
            showSubItemsOnly,
            onMoveItem,
            onMoveTrack,
            ...restProps
        } = this.props;
        let listOfItems, listSub;

        listSub = subheader ? <ListSubheader>{subheader}</ListSubheader> : null;

        if (isPlaylist) {
            listOfItems = is(Array, items)
                ? items.map(playlist => (
                      <Playlist
                          onClickIcon={onClickMain}
                          onClickPlaylist={onClickItem}
                          key={playlist.id}
                          playlist={playlist}
                          showTracksOnly={showSubItemsOnly}
                          onMoveItem={onMoveItem}
                      />
                  ))
                : [];
        } else {
            listOfItems = is(Array, items)
                ? items.map((track, index) => (
                      <Track
                          key={track.id}
                          index={index}
                          track={track}
                          playlist={keyItem}
                          onMoveTrack={onMoveTrack}
                      />
                  ))
                : [];
        }

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

export default DragDropContext(HTML5Backend)(withStyles(styles)(List));
