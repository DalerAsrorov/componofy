import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Button from 'material-ui/Button';
import Scroll from 'react-scroll';
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
    // There is no tracks to load
    0: 'All playlists loaded',
    // There is more tracks to load
    1: 'Load more'
};

let scroll = Scroll.animateScroll;

class MyPlaylists extends PureComponent {
    static propTypes = {
        setOpenStatusMyPlaylists: PropTypes.func.isRequired,
        removePlaylistFromFinal: PropTypes.func.isRequired,
        myPlaylists: MY_PLAYLISTS_PROPTYPE.isRequired,
        addPlaylistToFinal: PropTypes.func.isRequired,
        fetchMyPlaylists: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired
    };

    state = {
        settingsIsOpen: false,
        status: STATUS[1],
        canScrollUp: false,
        anchorEl: null
    };

    _handleLoadMore = event => {
        event.preventDefault();

        const {
            fetchMyPlaylists,
            myPlaylists: { numberOfTracks, currentOffset, playlistsRemaining }
        } = this.props;

        fetchMyPlaylists(currentOffset);
        scroll.scrollToBottom();
    };

    _handleClickOptions = event => {
        this.setState({
            settingsIsOpen: true,
            anchorEl: event.currentTarget
        });
    };

    _handleClickOption = () => {
        this.setState({
            settingsIsOpen: false
        });
    };

    _handleCanScrollUp = canScrollUp => {
        const { myPlaylists: { playlists } } = this.props;
        const nTracks = playlists.length;

        if (canScrollUp && nTracks < LIMIT) {
            canScrollUp = false;
        }

        this.setState({
            canScrollUp
        });
    };

    _handleAddPlaylist = (playlist, containsPlaylist) => {
        if (!containsPlaylist) {
            return this.props.addPlaylistToFinal(playlist);
        }

        return this.props.removePlaylistFromFinal(playlist);
    };

    _handleAdd = () => {};

    _handleClickCollapse = () => {
        this.props.setOpenStatusMyPlaylists();
    };

    componentDidMount() {
        let { currentOffset } = this.state;
        const {
            fetchMyPlaylists,
            setMyPlaylistVisited,
            myPlaylists: { isVisited }
        } = this.props;

        if (!isVisited) {
            fetchMyPlaylists(currentOffset);
            setMyPlaylistVisited(true);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { myPlaylists: { canLoadMore } } = nextProps;

        if (!canLoadMore) {
            this.setState({
                status: STATUS[0]
            });
        }
    }

    render() {
        let {
            myPlaylists: { playlists, playlistsRemaining, canLoadMore },
            classes
        } = this.props;
        const { status, settingsIsOpen, anchorEl, canScrollUp } = this.state;

        const ListOfMyPlaylists = (
            <List
                onClickMain={this._handleAddPlaylist}
                items={playlists}
                isPlaylist={true}
            />
        );

        if (playlistsRemaining === 0) {
            playlistsRemaining = null;
        }

        return (
            <div id="myPlaylists">
                <Waypoint
                    onEnter={() => {
                        this._handleCanScrollUp(false);
                    }}
                />
                {ListOfMyPlaylists}
                <Waypoint
                    onEnter={() => {
                        this._handleCanScrollUp(true);
                    }}
                />
                <FooterPanel
                    shouldShowCircle={canLoadMore}
                    onClickOptions={this._handleClickOptions}
                    onSelectItem={this._handleClickOption}
                    circleText={playlistsRemaining}
                    onClick={this._handleLoadMore}
                    isOpen={settingsIsOpen}
                    mainText={status}
                    anchorEl={anchorEl}
                    canScrollUp={canScrollUp}
                    onCollapse={this._handleClickCollapse}
                />
            </div>
        );
    }
}

export default withStyles(styles)(MyPlaylists);
