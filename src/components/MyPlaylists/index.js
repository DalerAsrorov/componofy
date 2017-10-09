import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getMyPlaylists } from '../../api';
import List from '../List';

class MyPlaylists extends PureComponent {
    static propTypes = {
        myPlaylists: PropTypes.object.isRequired,
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
        const ListOfMyPlaylists = <List items={playlists} />;

        return <div id="myPlaylists">{ListOfMyPlaylists}</div>;
    }
}

export default MyPlaylists;
