import React from 'react';
import { Route } from 'react-router';
import Nav from '../Nav';
import PublicPlaylists from '../PublicPlaylists';
import MyPlaylists from '../../containers/MyPlaylists';

const Main = ({ match: { url } }) => {
    console.log(url);

    return (
        <div>
            <Nav />
            <Route exact path={`${url}`} component={MyPlaylists} />
            <Route path={`${url}/public`} component={PublicPlaylists} />
        </div>
    );
};

export default Main;
