import React from 'react';
import { Route } from 'react-router';
import Nav from '../Nav';
import MyPlaylists from '../../containers/MyPlaylists';

const Main = ({ match: { url } }) => {
    console.log(url);

    return (
        <div>
            <Nav />
            <Route path={`${url}/myplaylists`} component={MyPlaylists} />
        </div>
    );
};

export default Main;
