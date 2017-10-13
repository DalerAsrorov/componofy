import React from 'react';
import { Route } from 'react-router';
import PublicPlaylists from '../PublicPlaylists';
import Nav from '../../containers/Nav';
import MyPlaylists from '../../containers/MyPlaylists';

const Main = ({ match: { url } }) => {
    return (
        <div>
            <Nav />
            <Route exact path={`${url}`} component={MyPlaylists} />
            <Route path={`${url}/public`} component={PublicPlaylists} />
        </div>
    );
};

export default Main;
