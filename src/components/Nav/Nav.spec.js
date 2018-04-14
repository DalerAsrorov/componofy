import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nav from './';

Enzyme.configure({ adapter: new Adapter() });

// props used throughout test
const classes = {
    root: '',
    tabContainer: ''
};

const requiredProps = {
    numberOfFinalPlaylists: 30,
    location: {
        pathname: 0
    },
    navigation: {
        0: 'route1',
        1: 'route2',
        routeToIndexMap: jest.fn(),
        index: 0
    },
    setNavIndex: jest.fn(),
    navigateTo: jest.fn(),
    classes
};

describe('When Nav component is initialized', () => {
    it('Nav renders properly', () => {
        let nav = shallow(<Nav {...requiredProps} />);

        expect(nav).toMatchSnapshot();
    });

    it('Nav navigateTo prop is not being called on render', () => {
        let nav = shallow(<Nav {...requiredProps} />);

        expect(requiredProps.navigateTo.mock.calls.length).toBe(0);
    });

    it('Nav has correct classes for styling', () => {
        let nav = shallow(<Nav {...requiredProps} />);
        let classNames = nav.prop('classes');

        Object.keys(classes).forEach(stylAttr => {
            expect(classNames).toHaveProperty(stylAttr);
        });
    });
});
