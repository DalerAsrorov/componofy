import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { connectStream } from '../connectPage';

class PrivateRoute extends PureComponent {
    static propTypes = {
        checkIfAuthenticated: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { checkIfAuthenticated } = this.props;

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

export default connectStream(withRouter(PrivateRoute));
