import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import ComponofyPlaylists from '../components/ComponofyPlaylists';

export default connectStream(withRouter(ComponofyPlaylists));
