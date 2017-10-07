import React, { PureComponent } from 'react';
import { getMyPlaylists } from '../../api';

export default class MyPlaylists extends PureComponent {
    componentDidMount() {
        getMyPlaylists()
            .then(playlists => {
                console.log('Getting user playlist:', playlists);
            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

    render() {
        return <h3>My playlists route </h3>;
    }
}
