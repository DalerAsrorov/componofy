import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { connectStream } from '../connectPage';
import { values, isEmpty } from 'ramda';
import ErrorSnackBar from '../components/ErrorSnackBar';

class PrivateRoute extends PureComponent {
    static propTypes = {
        checkIfAuthenticated: PropTypes.func.isRequired,
        removeErrorFromApp: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { checkIfAuthenticated } = this.props;

        checkIfAuthenticated();
    }

    render() {
        const {
            component: Component,
            removeErrorFromApp,
            errors,
            ...rest
        } = this.props;
        let globalErrors;

        if (!isEmpty(errors)) {
            globalErrors = values(errors).map(errorItem => (
                <ErrorSnackBar
                    key={errorItem.errorId}
                    message={errorItem.message}
                    errorId={errorItem.errorId}
                    autoHideDuration={errorItem.timeout}
                    onClose={removeErrorFromApp}
                />
            ));
        }

        return (
            <Route
                {...rest}
                render={props => (
                    <div id="privateRoute">
                        <Component {...props} />
                        {globalErrors}
                    </div>
                )}
            />
        );
    }
}

export default connectStream(withRouter(PrivateRoute));
