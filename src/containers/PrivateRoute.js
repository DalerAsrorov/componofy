import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import PrivateRoute from '../components/PrivateRoute';

export default connectStream(withRouter(PrivateRoute));
