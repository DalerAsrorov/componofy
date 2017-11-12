import React from 'react';
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Nav from './';

configure({ adapter: new Adapter() });

// props used throughout test
const navigateTo = jest.fn();
const classes = {
    root: {
        width: '100%',
        backgroundColor: '#fff'
    },

    tabContainer: {}
};

it('Nav renders properly', () => {
    let nav = shallow(<Nav classes={classes} navigateTo={navigateTo} />);

    return expect(nav).toMatchSnapshot();
});

it('Nav navigateTo prop is not being called on render', () => {
    let nav = shallow(<Nav classes={classes} navigateTo={navigateTo} />);

    return expect(navigateTo.mock.calls.length).toBe(0);
});

it('Nav has correct classes for styling', () => {
    let nav = shallow(<Nav classes={classes} navigateTo={navigateTo} />);
    let classNames = nav.prop('classes');

    return expect(classNames).toMatchObject({
        root: expect.any(String),
        tabContainer: expect.any(String)
    });
});
