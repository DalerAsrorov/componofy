import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const SCOPES_STR =
    'user-library-read user-read-email playlist-read-private playlist-read-collaborative playlist-modif' +
    'y-public playlist-modify-private user-library-read';
const SCOPE_LIST = SCOPES_STR.split(' ');
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});
const { APP_CLIENT_URL } = process.env;

export const createAuthorizeURL = (
    scopes = SCOPE_LIST,
    state = 'spotify-auth'
) => {
    const authUrl = spotifyApi.createAuthorizeURL(scopes, state);

    return {
        authUrl,
        ...arguments
    };
};

// eslint-disable-next-line
export async function authorizationCodeGrant(code) {
    let params = {
        clientAppURL: `${APP_CLIENT_URL}/app`
    };

    try {
        const payload = await spotifyApi.authorizationCodeGrant(code);
        const { body: { expires_in, access_token, refresh_token } } = payload;

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        params['accessToken'] = access_token;
        params['refreshToken'] = refresh_token;

        return params;
    } catch (error) {
        return error;
    }

    return params;
}

export async function getMyPlaylists(options = {}) {
    const myPlaylistParams = [
        // skip the first argument (userID) to get my playlist
        undefined,
        // options needs next and offset for pagination
        options
    ];

    try {
        return await spotifyApi.getUserPlaylists(...myPlaylistParams);
    } catch (error) {
        return error;
    }
}

export const getPlaylists = () => {
    return [];
};

export async function searchPlaylists(query, options = {}) {
    try {
        return await spotifyApi.searchPlaylists(query, options);
    } catch (error) {
        return error;
    }
}

export async function getPlaylistTracks(userID, playlistID, options = {}) {
    try {
        return await spotifyApi.getPlaylistTracks(userID, playlistID, options);
    } catch (error) {
        return error;
    }
}

export async function getMe() {
    try {
        return await spotifyApi.getMe();
    } catch (error) {
        return error;
    }
}

export default {
    createAuthorizeURL,
    authorizationCodeGrant,
    getPlaylists,
    getPlaylistTracks
};
