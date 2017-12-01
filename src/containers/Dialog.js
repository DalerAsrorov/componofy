import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import Dialog from '../components/Dialog';

export default connectStream(withRouter(Dialog));
