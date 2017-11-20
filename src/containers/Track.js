import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import Track from '../components/Track';

export default connectStream(withRouter(Track));
