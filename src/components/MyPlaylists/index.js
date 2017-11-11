import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
        fetchMyPlaylists: PropTypes.func.isRequired,
        myPlaylists: MY_PLAYLISTS_PROPTYPE.isRequired,
        classes: PropTypes.object.isRequired
    };

    state = {
        settingsIsOpen: false,
        status: STATUS[1],
        anchorEl: null
    };

    _handleLoadMore = event => {
        event.preventDefault();

        const {
            fetchMyPlaylists,
            myPlaylists: { numberOfTracks, currentOffset, playlistsRemaining }
        } = this.props;

        if (currentOffset !== numberOfTracks) {
            fetchMyPlaylists(currentOffset);
            scroll.scrollToBottom();
        }
    };

    _handleClickOptions = event => {
        this.setState({
            settingsIsOpen: true,
            anchorEl: event.currentTarget
        });
    };

    _handleClickOption = event => {
        this.setState({
            settingsIsOpen: false
        });
    };

    componentDidMount() {
        let { currentOffset } = this.state;
        const { fetchMyPlaylists } = this.props;

        fetchMyPlaylists(currentOffset);
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
            myPlaylists: { playlists, playlistsRemaining },
            classes
        } = this.props;
        let { status, settingsIsOpen, anchorEl } = this.state;

        const ListOfMyPlaylists = <List items={playlists} isPlaylist={true} />;

        if (playlistsRemaining === 0) {
            playlistsRemaining = null;
        }

        return (
            <div id="myPlaylists">
                {ListOfMyPlaylists}
                <FooterPanel
                    shouldShowCircle={status !== STATUS['STOP']}
                    onClickOptions={this._handleClickOptions}
                    onSelectItem={this._handleClickOption}
                    circleText={playlistsRemaining}
                    onClick={this._handleLoadMore}
                    isOpen={settingsIsOpen}
                    mainText={status}
                    anchorEl={anchorEl}
                />
            </div>
        );
    }
}

export default withStyles(styles)(MyPlaylists);
