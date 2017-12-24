import SpotifyWebApi from 'spotify-web-api-node';
import * as R from 'ramda';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const DEV_HOST = 'http://localhost:3000';
const SCOPES_STR =
    'user-library-read user-read-email playlist-read-private playlist-read-collaborative playlist-modif' +
    'y-public playlist-modify-private user-library-read ugc-image-upload';
const SCOPE_LIST = SCOPES_STR.split(' ');
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI
});
const { APP_CLIENT_URL } = process.env;

let userMap = {};

export const setUserAndTokens = (userId, accessToken, refreshToken) => {
    userMap[userId] = {
        accessToken,
        refreshToken
    };
};

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

export const setUpTokens = (accessToken, refreshToken) => {
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
};

export async function authorizationCodeGrant(code) {
    let params = {
        clientAppURL: `${APP_CLIENT_URL || DEV_HOST}/app`
    };

    try {
        const payload = await spotifyApi.authorizationCodeGrant(code);
        const {
            body: {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expiresIn
            }
        } = payload;

        setUpTokens(accessToken, refreshToken);

        console.log(spotifyApi);

        params['accessToken'] = accessToken;
        params['refreshToken'] = refreshToken;
        params['expiresIn'] = expiresIn;

        return params;
    } catch (error) {
        return error;
    }

    return params;
}

export async function getMyPlaylists(userId, options = {}) {
    try {
        const { accessToken, refreshToken } = userMap[userId];
        setUpTokens(accessToken, refreshToken);

        return await spotifyApi.getUserPlaylists(undefined, options);
    } catch (error) {
        return error;
    }
}

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

export async function createPlaylist(userId, playlistName, options, callback) {
    try {
        const { accessToken, refreshToken } = userMap[userId];
        setUpTokens(accessToken, refreshToken);

        return await spotifyApi.createPlaylist(
            userId,
            playlistName,
            options,
            callback
        );
    } catch (error) {
        return error;
    }
}

export async function addTracksToPlaylist(
    userId,
    playlistId,
    trackIDs,
    options,
    callback
) {
    const stringToAttach = 'spotify:track:';
    let tracks = R.map(R.concat(stringToAttach), trackIDs);

    try {
        const snapshot = await spotifyApi.addTracksToPlaylist(
            userId,
            playlistId,
            tracks,
            options,
            callback
        );

        return snapshot;
    } catch (error) {
        return error;
    }
}

export const uploadPlaylistCoverImage = (userId, playlistId, imageData) => {
    const URL = `${SPOTIFY_API_URL}/users/${userId}/playlists/${playlistId}/images`;

    const { accessToken, refreshToken } = userMap[userId];
    setUpTokens(accessToken, refreshToken);

    imageData =
        imageData.indexOf('data') > -1
            ? imageData.substring(imageData.indexOf(',') + 1)
            : imageData;

    return fetch(URL, {
        method: 'put',
        body: imageData,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'image/jpeg'
        }
    })
        .then(data => {
            return {
                status: data.status,
                statusText: data.statusText
            };
        })
        .catch(error => error);
};

export default {
    createAuthorizeURL,
    authorizationCodeGrant,
    getMyPlaylists,
    getPlaylistTracks,
    getMe,
    createPlaylist,
    uploadPlaylistCoverImage
};
