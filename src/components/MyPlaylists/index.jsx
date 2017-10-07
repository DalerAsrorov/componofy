import React, { PureComponent } from 'react';
import { getMyPlaylists } from '../../api';

export default class MyPlaylists extends PureComponent {
    state = {
        // TODO: make this a global state in Redux
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

        console.log(myPlaylists);

        return <h3>My playlists route </h3>;
    }
}
