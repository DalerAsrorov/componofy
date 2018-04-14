import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Nav from './';

Enzyme.configure({ adapter: new Adapter() });

// props used throughout test
const navigateTo = jest.fn();
const classes = {
    root: {
        width: '100%',
        backgroundColor: '#fff'
    },

    tabContainer: {}
};

describe('When Nav component is initialized', () => {
    it('Nav renders properly', () => {
        let nav = mount(<Nav classes={classes} navigateTo={navigateTo} />);

        return expect(nav).toMatchSnapshot();
    });

    it('Nav navigateTo prop is not being called on render', () => {
        let nav = mount(<Nav classes={classes} navigateTo={navigateTo} />);

        return expect(navigateTo.mock.calls.length).toBe(0);
    });

    it('Nav has correct classes for styling', () => {
        let nav = mount(<Nav classes={classes} navigateTo={navigateTo} />);
        let classNames = nav.prop('classes');

        return expect(classNames).toMatchObject({
            root: expect.any(String),
            tabContainer: expect.any(String)
        });
    });
});
