import { connect } from 'react-redux';
import { connectStream } from '../connectPage';
import Dialog from '../components/Dialog';

const mapStateToProps = ({ finalPlaylists } = {}, ownProps) => ({
  finalPlaylists
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStream(Dialog)
);
