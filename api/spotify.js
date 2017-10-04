import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config();

const SCOPES_STR =
	'user-read-email playlist-read-private playlist-read-collaborative playlist-modif' +
	'y-public playlist-modify-private user-library-read';
const SCOPE_LIST = SCOPES_STR.split(' ');
const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	redirectUri: process.env.SPOTIFY_REDIRECT_URI
});
const { APP_CLIENT_URL } = process.env;

export const createAuthorizeURL = (scopes = SCOPE_LIST, state = 'spotify-auth') => {
	const authUrl = spotifyApi.createAuthorizeURL(scopes, state);

	return {
		authUrl,
		...arguments
	};
};

// eslint-disable-next-line
export async function authorizationCodeGrant(code, state) {
	try {
		const payload = await spotifyApi.authorizationCodeGrant(code);
		const { body: { expires_in, access_token, refresh_token } } = payload;

		spotifyApi.setAccessToken(access_token);
		spotifyApi.setRefreshToken(refresh_token);
	} catch (error) {
		return error;
	}

	return APP_CLIENT_URL;
}

// eslint-disable-next-line
export async function getMyPlaylists() {
	try {
		return await spotifyApi.getUserPlaylists();
	} catch (error) {
		return error;
	}
}

export const getPlaylists = () => {
	return [];
};

export default {
	createAuthorizeURL,
	authorizationCodeGrant,
	getPlaylists
};
