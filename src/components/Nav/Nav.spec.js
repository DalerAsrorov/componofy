import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Nav from './';

Enzyme.configure({ adapter: new Adapter() });

// Classes required for Material UI theme
const classes = {
  root: '',
  tabContainer: '',
};

// Required props for Material UI components context
const requiredProps = {
  numberOfFinalPlaylists: 30,
  location: {
    pathname: 0,
  },
  navigation: {
    0: 'route1',
    1: 'route2',
    routeToIndexMap: jest.fn(),
    index: 0,
  },
  setNavIndex: jest.fn(),
  navigateTo: jest.fn(),
  classes,
};

describe('When Nav component is initialized', () => {
  let mount, shallow;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  it('Nav renders properly', () => {
    let wrapper = createShallow(<Nav {...requiredProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('Nav has correct classes for styling', () => {
    let wrapper = shallow(<Nav {...requiredProps} />);
    let classNames = wrapper.prop('classes');

    Object.keys(classes).forEach((stylAttr) => {
      expect(classNames).toHaveProperty(stylAttr);
    });
  });

  it('Nav has three tabs', () => {
    let wrapper = mount(<Nav {...requiredProps} />);

    expect(wrapper.find(Tabs)).toHaveLength(1);
    expect(wrapper.find(Tab)).toHaveLength(3);
  });

  it('should show badge with the number of playlsits added', () => {
    let expected = 10;
    let wrapper = mount(
      <Nav {...requiredProps} numberOfFinalPlaylists={expected} />
    );
    let badge = wrapper.find('.number-badge').at(0);

    expect(badge.props().badgeContent).toBe(expected);
  });

  it('should not show badge if number of playlists added is 0', () => {
    let expected = false;
    let wrapper = mount(<Nav {...requiredProps} numberOfFinalPlaylists={0} />);
    let badge = wrapper.find('.number-badge');

    expect(badge.exists()).toEqual(expected);
  });

  it('should initially have the tab index value of 0', () => {
    let wrapper = mount(<Nav {...requiredProps} />);
    let tabsWrapper = wrapper.find(Tabs);
    let expected = 0;

    expect(tabsWrapper.props().value).toBe(0);
  });
});
