import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import MaterialList, {
    ListItem,
    ListItemIcon,
    ListItemText
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { head } from 'ramda';
import { TRACK_PROPTYPE, PLAYLIST_PROPTYPE } from '../../utils/constants';

import Info from './Info';

const styles = theme => ({
    checkmark: {
        color: theme.palette.grey[600]
    }
});

class Track extends PureComponent {
    static propTypes = {
        removePlaylistTrackFromFinal: PropTypes.func.isRequired,
        playlistContainsThisTrack: PropTypes.bool.isRequired,
        addPlaylistTrackToFinal: PropTypes.func.isRequired,
        track: TRACK_PROPTYPE.isRequired,
        playlist: PLAYLIST_PROPTYPE
    };

    _handleChecked = event => {
        const {
            track,
            playlist,
            addPlaylistTrackToFinal,
            removePlaylistTrackFromFinal,
            playlistContainsThisTrack
        } = this.props;

        if (playlist) {
            if (playlistContainsThisTrack) {
                removePlaylistTrackFromFinal(track, playlist);
            } else {
                addPlaylistTrackToFinal(track, playlist);
            }
        }
    };

    render() {
        const { track, classes, playlistContainsThisTrack } = this.props;

        const {
            id: trackID,
            artists,
            name: trackName,
            album: { name: albumName, external_urls: { spotify: albumUrl } },
            external_urls: { spotify: trackUrl },
            popularity
        } = track;
        const {
            name: artistName,
            external_urls: { spotify: artistUrl }
        } = head(artists);

        const isPopular = popularity >= 70;

        return (
            <ListItem divider>
                <ListItemIcon>
                    <Checkbox
                        className={classes.checkmark}
                        onClick={this._handleChecked}
                        checked={playlistContainsThisTrack}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Info
                            trackName={trackName}
                            trackUrl={trackUrl}
                            artistName={artistName}
                            artistUrl={artistUrl}
                            albumName={albumName}
                            albumUrl={albumUrl}
                            isPopular={isPopular}
                        />
                    }
                />
            </ListItem>
        );
    }
}

export default withStyles(styles)(Track);
