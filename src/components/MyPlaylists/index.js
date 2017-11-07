import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { MY_PLAYLISTS_PROPTYPE } from '../../utils/constants';
import List from '../List';

const LIMIT = 10;

const styles = theme => ({
    loadmore: {
        width: '100%'
    }
});

class MyPlaylists extends PureComponent {
    static propTypes = {
        fetchMyPlaylists: PropTypes.func.isRequired,
        myPlaylists: MY_PLAYLISTS_PROPTYPE.isRequired,
        classes: PropTypes.object.isRequired
    };

    state = {
        currentOffset: 0,
        playlistsRemaining: 0
    };

    _handleLoadMore = event => {
        event.preventDefault();

        const {
            fetchMyPlaylists,
            myPlaylists: { numberOfTracks }
        } = this.props;
        let { currentOffset, playlistsRemaining } = this.state;

        if (currentOffset !== numberOfTracks) {
            fetchMyPlaylists(currentOffset);

            if (playlistsRemaining < LIMIT) {
                currentOffset += playlistsRemaining;
            } else {
                currentOffset += LIMIT;
            }

            playlistsRemaining = numberOfTracks - currentOffset;

            this.setState({
                playlistsRemaining,
                currentOffset
            });
        }
    };

    componentDidMount() {
        let { currentOffset } = this.state;
        const { fetchMyPlaylists } = this.props;

        fetchMyPlaylists(currentOffset);
    }

    componentWillReceiveProps(nextProps) {
        let { playlistsRemaining, currentOffset } = this.state;
        let { myPlaylists: { numberOfTracks, isFetching } } = nextProps;

        if (
            numberOfTracks > 0 &&
            !isFetching &&
            currentOffset === 0 &&
            playlistsRemaining === 0
        ) {
            if (numberOfTracks < LIMIT) {
                currentOffset = numberOfTracks;
            } else {
                currentOffset = LIMIT;
            }

            playlistsRemaining = numberOfTracks - currentOffset;

            this.setState({
                playlistsRemaining,
                currentOffset
            });
        }
    }

    render() {
        const { playlistsRemaining } = this.state;
        const { myPlaylists: { playlists }, classes } = this.props;

        const ListOfMyPlaylists = <List items={playlists} isPlaylist={true} />;

        return (
            <div id="myPlaylists">
                {ListOfMyPlaylists}
                <Button
                    onClick={this._handleLoadMore}
                    raised
                    color="accent"
                    className={classes.loadmore}
                >
                    Load more
                    {/* To do: Replace span with Material UI component */}
                    <span>{playlistsRemaining}</span>
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(MyPlaylists);
