import { connect } from 'react-redux';
import { connectStream } from '../connectPage';
import {
  getTotalPlaylistsScehmaTracks,
  hasEntityOpenPlaylist,
  getPlaylistsSchemaLength
} from '../utils/transforms';
import ComponofyPlaylists from '../components/ComponofyPlaylists';

const mapStateToProps = ({ finalPlaylists } = {}, ownrProps) => ({
  numberOfTracksInFinalPlaylist: getTotalPlaylistsScehmaTracks(finalPlaylists),
  finalPlaylistsHasOpenPlaylist: hasEntityOpenPlaylist(finalPlaylists),
  numberOfFinalPlaylists: getPlaylistsSchemaLength(finalPlaylists),
  playlists: finalPlaylists.playlists,
  shouldShowOnlyTracks: finalPlaylists.shouldShowOnlyTracks,
  searchTerm: finalPlaylists.searchTerm,
  hasChosenNewCreate: finalPlaylists.hasChosenNewCreate,
  areAllOpen: finalPlaylists.areAllOpen
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStream(ComponofyPlaylists)
);
