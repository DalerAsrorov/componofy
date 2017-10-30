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

import Info from './Info';

const styles = theme => ({
    checkmark: {
        color: theme.palette.grey[600]
    }
});

class Track extends PureComponent {
    static propType = {
        track: PropTypes.object
    };

    state = {
        // TODO: use mapStateToProps from redux
        // to check if track is in the queue of
        // added tracks. If it is, then mark
        // the prop "isAdded" as true, otherwise
        // false. Once that is done, this should
        // be moved to props of boolean type.
        isAdded: false
    };

    _handleChecked = event => {
        const { isAdded } = this.state;
        const { track } = this.props;

        this.setState({ isAdded: !isAdded });
    };

    render() {
        const { isAdded } = this.state;
        const { track, classes } = this.props;

        const {
            id: trackID,
            artists,
            name: trackName,
            album: { name: albumName, external_urls: { spotify: albumUrl } },
            external_urls: { spotify: trackUrl }
        } = track;

        const {
            name: artistName,
            external_urls: { spotify: artistUrl }
        } = head(artists);

        const tempComp = () => <p>Hello</p>;

        return (
            <ListItem divider>
                <ListItemIcon>
                    <Checkbox
                        className={classes.checkmark}
                        onClick={this._handleChecked}
                        checked={isAdded}
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
                        />
                    }
                />
            </ListItem>
        );
    }
}

export default withStyles(styles)(Track);
