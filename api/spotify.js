import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

export const getPlaylists = () => {
    return spotifyApi;
};

export default {
    getPlaylists
};
