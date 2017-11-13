import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import Settings from '../components/Settings';

export default connectStream(withRouter(Settings));
