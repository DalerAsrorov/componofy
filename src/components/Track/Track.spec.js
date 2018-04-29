import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createShallow, createMount } from 'material-ui/test-utils';
import { MOCK_TRACK, MOCK_PLAYLIST, MOCK_NAVIGATION } from '../../utils/mocks';
import Track from './';

Enzyme.configure({ adapter: new Adapter() });

const requiredProps = {
  removePlaylistTrackFromFinal: jest.fn(),
  playlistContainsThisTrack: false,
  addPlaylistTrackToFinal: jest.fn(),
  addErrorToApp: jest.fn(),
  index: 1,
  track: MOCK_TRACK,
  playlist: MOCK_PLAYLIST,
  navigation: MOCK_NAVIGATION
};

/**
 * NOTE: Testing this causes a lot of errors
 * will need to re-visit on how to test this huge component
 * properly.
 */
describe('Track component', () => {
  let mount, shallow;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  it('renders with required props', () => {
    let wrapper = shallow(<Track {...requiredProps} />);

    expect(wrapper).toMatchSnapshot();
  });
});
