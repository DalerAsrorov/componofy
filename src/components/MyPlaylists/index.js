import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { MY_PLAYLISTS_PROPTYPE } from '../../utils/constants';
import FooterPanel from '../FooterPanel';
import List from '../List';

const LIMIT = 10;

const styles = theme => ({
    loadmore: {
        width: '100%'
    }
});

const STATUS = {
    CONTINUE: 'Load more',
    STOP: 'All playlists loaded'
};

class MyPlaylists extends PureComponent {
    static propTypes = {
        fetchMyPlaylists: PropTypes.func.isRequired,
        myPlaylists: MY_PLAYLISTS_PROPTYPE.isRequired,
        classes: PropTypes.object.isRequired
    };

    state = {
        currentOffset: 0,
        playlistsRemaining: 0,
        status: STATUS['CONTINUE']
    };

    _handleLoadMore = event => {
        event.preventDefault();

        const {
            fetchMyPlaylists,
            myPlaylists: { numberOfTracks }
        } = this.props;
        let { currentOffset, playlistsRemaining } = this.state;

        if (currentOffset + LIMIT >= numberOfTracks) {
            this.setState({
                status: STATUS['STOP']
            });
        }

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
        let { playlistsRemaining, currentOffset, status } = this.state;
        let { myPlaylists: { numberOfTracks, isFetching } } = nextProps;

        if (
            numberOfTracks > 0 &&
            !isFetching &&
            currentOffset === 0 &&
            playlistsRemaining === 0
        ) {
            if (numberOfTracks < LIMIT) {
                currentOffset = numberOfTracks;
                status = STATUS['STOP'];
            } else {
                currentOffset = LIMIT;
            }

            playlistsRemaining = numberOfTracks - currentOffset;

            this.setState({
                playlistsRemaining,
                currentOffset,
                status
            });
        }
    }

    render() {
        const { myPlaylists: { playlists }, classes } = this.props;
        const ListOfMyPlaylists = <List items={playlists} isPlaylist={true} />;
        let { playlistsRemaining, status } = this.state;

        if (playlistsRemaining === 0) {
            playlistsRemaining = null;
        }

        return (
            <div id="myPlaylists">
                {ListOfMyPlaylists}
                <FooterPanel
                    onClick={this._handleLoadMore}
                    mainText={status}
                    circleText={playlistsRemaining}
                />
            </div>
        );
    }
}

export default withStyles(styles)(MyPlaylists);
