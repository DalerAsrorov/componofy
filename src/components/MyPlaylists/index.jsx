import React, { PureComponent } from 'react';
import Playlist from '../Playlist';
import { getMyPlaylists } from '../../api';

export default class MyPlaylists extends PureComponent {
    state = {
        // TODO: make this a global state in Redux
        // Structure this data structure well for easy access
        // of properties
        myPlaylists: [],
        // Once the user reaches the last item,
        // if there is more will make another request
        // based on the offset (and limit)
        isScrolledToTarget: false
    };

    componentDidMount() {
        getMyPlaylists()
            .then(response => {
                const { data: { body: { items: myPlaylists } } } = response;

                this.setState({
                    myPlaylists
                });
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

    render() {
        const { myPlaylists } = this.state;
        const MyPlaylistsComponents = myPlaylists.map(playlist => (
            <Playlist key={playlist.id} playlist={playlist} />
        ));

        return <div>{MyPlaylistsComponents}</div>;
    }
}
