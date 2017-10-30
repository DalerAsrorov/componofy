import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MY_PLAYLISTS_PROPTYPE } from '../../utils/constants';
import List from '../List';

class MyPlaylists extends PureComponent {
    static propTypes = {
        myPlaylists: MY_PLAYLISTS_PROPTYPE,
        fetchMyPlaylists: PropTypes.func.isRequired
    };

    state = {
        isScrolledToTarget: false
    };

    componentDidMount() {
        const { fetchMyPlaylists } = this.props;

        fetchMyPlaylists();
    }

    render() {
        const { myPlaylists: { playlists } } = this.props;
        const ListOfMyPlaylists = <List items={playlists} isPlaylist={true} />;

        return <div id="myPlaylists">{ListOfMyPlaylists}</div>;
    }
}

export default MyPlaylists;
