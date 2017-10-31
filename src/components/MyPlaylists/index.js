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
        currentOffset: 1
    };

    _handleLoadMore = event => {
        event.preventDefault();

        let { currentOffset } = this.state;
        const { fetchMyPlaylists } = this.props;

        fetchMyPlaylists(currentOffset);

        currentOffset += LIMIT;
        this.setState({ currentOffset });
    };

    componentDidMount() {
        let { currentOffset } = this.state;
        const { fetchMyPlaylists } = this.props;

        fetchMyPlaylists(currentOffset);
    }

    render() {
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
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(MyPlaylists);
