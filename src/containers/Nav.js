import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import Nav from '../components/Nav';

export default connectStream(withRouter(Nav));
