import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import MyPlaylists from '../components/MyPlaylists';

export default connectStream(withRouter(MyPlaylists));
