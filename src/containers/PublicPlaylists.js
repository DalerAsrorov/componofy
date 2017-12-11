import { withRouter } from 'react-router-dom';
import { connectStream } from '../connectPage';
import PublicPlaylists from '../components/PublicPlaylists';

export default connectStream(withRouter(PublicPlaylists));
