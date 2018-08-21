import { connect } from 'react-redux';
import { connectStream } from '../connectPage';
import { getTotalPlaylistsScehmaTracks } from '../utils/transforms';
import ComponofyPlaylists from '../components/ComponofyPlaylists';

const mapStateToProps = ({ finalPlaylists } = {}, ownrProps) => ({
  numberOfTracksInFinalPlaylist: getTotalPlaylistsScehmaTracks(finalPlaylists)
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStream(ComponofyPlaylists)
);
