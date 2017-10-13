import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { checkIfAuthenticated } from '../actions';

class PrivateRoute extends PureComponent {
    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        checkIfAuthenticated: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { isAuthenticated, checkIfAuthenticated } = this.props;

        checkIfAuthenticated();
    }

    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render={props => {
                    return <Component {...props} />;
                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
    checkIfAuthenticated() {
        dispatch(checkIfAuthenticated());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
