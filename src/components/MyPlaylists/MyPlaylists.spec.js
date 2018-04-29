import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createShallow, createMount } from 'material-ui/test-utils';
import MyPlaylsits from './';
import { MOCK_MY_PLAYLISTS } from './mockData';
import { MOCK_NAVIGATION } from '../../utils/mocks';

Enzyme.configure({ adapter: new Adapter() });

const requiredProps = {
  startPlaylistTracksReorderProcess: jest.fn(),
  setOpenStatusForAllPlaylists: jest.fn(),
  myPlaylistsHasOpenPlaylist: false,
  generateSuggestedPlaylists: jest.fn(),
  setOpenStatusMyPlaylists: jest.fn(),
  removePlaylistFromFinal: jest.fn(),
  reorderPlaylistTracks: jest.fn(),
  setPlaylistDragStatus: jest.fn(),
  addPlaylistToFinal: jest.fn(),
  fetchMyPlaylists: jest.fn(),
  myPlaylists: MOCK_MY_PLAYLISTS,
  setPlaylistOpen: jest.fn(),
  setMySearchTerm: jest.fn(),
  addErrorToApp: jest.fn(),
  navigation: MOCK_NAVIGATION,
  logOutUser: jest.fn(),
  classes: {}
};

/**
 * NOTE: Testing this causes a lot of errors
 * will need to re-visit on how to test this huge component
 * properly.
 */
describe('My Playlists', () => {
  let mount, shallow;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  it('renders with required props', () => {
    let wrapper = shallow(<MyPlaylsits {...requiredProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
