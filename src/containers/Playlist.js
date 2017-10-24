import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import Playlist from '../components/Playlist';

export default connectStream(withRouter(Playlist));
