import { SET_NAV_INDEX } from '../actions';
import { swapKeysAndValues } from '../utils/helpers';
import { keys, length } from 'ramda';

const DEFAULT_INDEX = 0;
const ROUTE_INDEX_MAP = {
  0: '/app',
  1: '/app/public',
  2: '/app/componofy'
};

const numberOfPages = length(keys(ROUTE_INDEX_MAP));

export const navigation = (
  state = {
    index: DEFAULT_INDEX,
    currentPage: ROUTE_INDEX_MAP[DEFAULT_INDEX],
    nextIndex: 1,
    nextPage: ROUTE_INDEX_MAP[DEFAULT_INDEX + 1],
    indexToRouteMap: ROUTE_INDEX_MAP,
    routeToIndexMap: swapKeysAndValues(ROUTE_INDEX_MAP, parseInt),
    numberOfPages
  },
  action
) => {
  switch (action.type) {
    case SET_NAV_INDEX:
      let nextIndex = action.index + 1;
      nextIndex = nextIndex < state.numberOfPages ? nextIndex : action.index;

      return Object.assign({}, state, {
        currentPage: ROUTE_INDEX_MAP[action.index],
        nextPage: ROUTE_INDEX_MAP[nextIndex],
        index: action.index,
        nextIndex
      });
    default:
      return state;
  }
};
