import React, { PureComponent } from 'react';
import { getMyPlaylists } from '../../api';
import List from '../List';

class MyPlaylists extends PureComponent {
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
        const ListOfMyPlaylists = <List items={myPlaylists} />;

        return <div id="myPlaylists">{ListOfMyPlaylists}</div>;
    }
}

export default MyPlaylists;
