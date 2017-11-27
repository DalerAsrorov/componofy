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
        subheader: PropTypes.string,
        classes: PropTypes.object,
        keyItem: PropTypes.object
    };

    render() {
        const {
            items,
            subheader,
            classes,
            isPlaylist,
            onClickMain,
            onClickItem,
            keyItem
        } = this.props;
        let listOfItems;

        if (isPlaylist) {
            listOfItems = is(Array, items)
                ? items.map(playlist => (
                      <Playlist
                          onClickIcon={onClickMain}
                          onClickPlaylist={onClickItem}
                          key={playlist.id}
                          playlist={playlist}
                      />
                  ))
                : [];
        } else {
            listOfItems = is(Array, items)
                ? items.map(track => (
                      <Track key={track.id} track={track} playlist={keyItem} />
                  ))
                : [];
        }

        return (
            <MaterialList
                className={classes.root}
                subheader={<ListSubheader>{subheader}</ListSubheader>}
            >
                {listOfItems}
            </MaterialList>
        );
    }
}

export default withStyles(styles)(List);
