import React from 'react';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import Lainding from './';

Enzyme.configure({ adapter: new Adapter() });

// Required props for Material UI components context
const requiredProps = {
  onAuth: jest.fn(),
  title: 'Login',
  subTitle: 'Some login',
};

describe('When Nav component is initialized', () => {
  let mount, shallow;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  it('Landing has correct props', () => {
    let wrapper = shallow(<Lainding {...requiredProps} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have a correct title', () => {
    let wrapper = mount(<Lainding {...requiredProps} />);

    expect(wrapper.prop('title')).toBe(requiredProps.title);
  });
});
