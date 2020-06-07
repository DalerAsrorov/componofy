import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ListSubheader, List as MaterialList } from '@material-ui/core';
import { is } from 'ramda';
import { PLAYLIST_PROPTYPE } from '../../utils/constants';
import Playlist from '../../containers/Playlist';

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: '0',
    background: theme.palette.background.paper,
  },

  listSubheader: {
    background: '#ffffff',
  },
});

export const List = withStyles(styles)(
  ({
    items,
    keyItem,
    classes,
    subheader,
    showSubItemsOnly,
    isPlaylist,
    onClickMain,
    onClickItem,
    onDragAndDrop,
    collapseHasFixedHeight,
    shouldShowTracksIncludedValue,
    ...restProps
  }) => (
    <MaterialList
      className={classes.root}
      subheader={
        subheader && (
          <ListSubheader className={classes.listSubheader}>
            {subheader}
          </ListSubheader>
        )
      }
      {...restProps}
    >
      {is(Array, items)
        ? items.map((playlist) => (
            <Playlist
              onClickIcon={onClickMain}
              onClickPlaylist={onClickItem}
              key={playlist.id}
              playlist={playlist}
              showTracksOnly={showSubItemsOnly}
              onDragAndDrop={onDragAndDrop}
              collapseHasFixedHeight={collapseHasFixedHeight}
              shouldShowTracksIncludedValue={shouldShowTracksIncludedValue}
            />
          ))
        : []}
    </MaterialList>
  )
);

List.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PLAYLIST_PROPTYPE),
    PropTypes.arrayOf(
      // TODO: https://github.com/DalerAsrorov/componofy/issues/18
      PropTypes.object
    ),
  ]).isRequired,
  onDragAndDrop: PropTypes.func,
  onClickItem: PropTypes.func,
  onCheckboxActive: PropTypes.func,
  onClickMain: PropTypes.func,
  subheader: PropTypes.string,
  classes: PropTypes.object,
  keyItem: PropTypes.object,
  collapseHasFixedHeight: PropTypes.bool,
  showSubItemsOnly: PropTypes.bool,
  shouldShowTracksIncludedValue: PropTypes.bool,
};
