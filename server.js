import Hapi from 'hapi';
import Yar from 'yar';
import Inert from 'inert';
import Path from 'path';
import {
    createAuthorizeURL,
    deleteUserData,
    authorizationCodeGrant,
    getMe,
    getMyPlaylists,
    searchPlaylists,
    getPlaylistTracks,
    setUserAndTokens,
    createPlaylist,
    addTracksToPlaylist,
    reorderTracksInPlaylist,
    uploadPlaylistCoverImage,
    getMyTopArtists
} from './api/spotify';
import dotenv from 'dotenv';

// allow server to import environment variables
dotenv.config();

const PORT = process.env.PORT || 3001;

// Hapi server instance.
const server = new Hapi.Server({
    port: PORT,
    routes: {
        cors: true
    }
});

const isSecure = process.env.DEV_MODE ? false : true;
const yarOptions = {
    cookieOptions: {
        password: process.env.YAR_PASS,
        isSecure
    }
};

const startApp = async () => {
    try {
        await server.register([
            { plugin: Yar, options: yarOptions },
            { plugin: Inert, options: {} }
        ]);

        server.route({
            method: 'GET',
            path: '/api/userstatus',
            handler: (request, h) => {
                const { yar } = request;
                const { id: sessionID } = yar;
                const session = yar.get('session');

                return {
                    sessionID,
                    isAuthenticated: !!session,
                    ...session
                };
            },
            config: {
                cors: {
                    credentials: true
                },
                description:
                    'Lets client know whether the user has already been authenticated.',
                notes:
                    'Can be used for checking if server connection still exists.',
                tags: ['api', 'index', 'user']
            }
        });

        server.route({
            method: 'GET',
            path: '/api/logout',
            handler: (request, h) => {
                const { yar } = request;

                deleteUserData(yar.get('session').id);
                yar.reset();

                return {
                    isAuthenticated: !!yar.get('session'),
                    offlineAt: Date.now()
                };
            },
            config: {
                description:
                    'Logs out user from the app and clears the session.',
                notes:
                    'Session object will not be available if this request is made.',
                tags: ['api', 'auth']
            }
        });

        server.route({
            method: 'GET',
            path: '/api/auth',
            handler: (request, h) => {
                const { authUrl } = createAuthorizeURL();

                return h.redirect(authUrl);
            },
            config: {
                cors: {
                    credentials: true,
                    origin: ['*']
                },
                description: 'Receives confirmation to start authentication.',
                notes: 'Authentication process will redirect',
                tags: ['api', 'auth', 'user']
            }
        });

        server.route({
            method: 'GET',
            path: '/api/callback',
            handler: (request, h) => {
                const { query: { code } } = request;

                return authorizationCodeGrant(code)
                    .then(({ clientAppURL, accessToken, refreshToken }) => {
                        return getMe().then(({ body: { id, email } }) => {
                            const sessionState = {
                                lastVisit: Date.now(),
                                accessToken,
                                refreshToken,
                                email,
                                id
                            };

                            setUserAndTokens(id, accessToken, refreshToken);

                            request.yar.set('session', sessionState);

                            return h.redirect(clientAppURL);
                        });
                    })
                    .catch(error => console.error(error));
            },
            config: {
                cors: {
                    credentials: true,
                    origin: ['*']
                },
                description:
                    'Given code from Spotify authentication server, generates token and `re`directs back to client app.',
                notes: 'Accepts the code value',
                tags: ['api', 'auth', 'user']
            }
        });

        server.route({
            method: 'GET',
            path: '/api/myplaylists/{offset}/{limit}',
            handler: (request, h) => {
                const { offset, limit } = request.params;
                const { yar } = request;
                const session = yar.get('session');
                const { id: userId } = session;

                return getMyPlaylists(userId, {
                    offset,
                    limit
                })
                    .then(data => ({
                        date: Date.now(),
                        data
                    }))
                    .catch(error => ({ error }));
            },
            config: {
                description: 'Return the authenticated user playlist.',
                notes:
                    'Should be authenticated first to have access to this information',
                tags: ['api', 'playlists', 'user']
            }
        });

        server.route({
            method: 'GET',
            path: '/api/mytopartists',
            handler: (request, h) => {
                const { yar } = request;
                const session = yar.get('session');
                const { id: userId } = session;

                return getMyTopArtists(userId)
                    .then(data => ({
                        date: Date.now(),
                        data
                    }))
                    .catch(error => ({ error }));
            },
            config: {
                description: 'Return the authenticated user playlist.',
                notes:
                    'Should be authenticated first to have access to this information',
                tags: ['api', 'playlists', 'user']
            }
        });

        server.route({
            method: 'GET',
            path: '/api/searchplaylist/{query}/{offset}/{limit}',
            handler: (request, h) => {
                const { query, offset, limit } = request.params;
                const { yar } = request;
                const session = yar.get('session');
                const { id: userId } = session;

                return searchPlaylists(userId, query, {
                    offset,
                    limit
                })
                    .then(data => ({
                        date: Date.now(),
                        query,
                        data
                    }))
                    .catch(error => ({ error }));
            },
            config: {
                description:
                    'Returns the list of playlists based on the given search parameters.',
                notes: 'This endpoint does not require authentication.',
                tags: ['api', 'playlsits', 'search']
            }
        });

        server.route({
            method: 'GET',
            path: '/api/playlist-tracks/{userID}/{playlistID}/{offset}/{limit}',
            handler: (request, h) => {
                const { offset, limit, userID, playlistID } = request.params;

                return getPlaylistTracks(userID, playlistID, { offset, limit })
                    .then(data => ({
                        date: Date.now(),
                        data
                    }))
                    .catch(error => ({ error }));
            },
            config: {
                description:
                    'Returns playlist tracks given the user and playlist IDs.',
                notes: 'Both user and playlist IDs are required to fetch data.',
                tags: ['api', 'playlists']
            }
        });

        server.route({
            method: 'GET',
            path: '/api/reorder-playlist-tracks/{playlistId}/{start}/{end}',
            handler: (request, h) => {
                const { yar, params: { playlistId, start, end } } = request;
                const session = yar.get('session');
                const { id: userId } = session;

                return reorderTracksInPlaylist(userId, playlistId, start, end)
                    .then(data => ({
                        date: Date.now(),
                        data
                    }))
                    .catch(error => ({ error }));
                return {
                    success: true
                };
            },
            config: {
                description: 'Reorder user playlist tracks',
                notes:
                    'Needs authenticated user. Both user and playlist IDs are required to fetch data.',
                tags: ['api', 'user', 'playlists', 'tracks']
            }
        });

        server.route({
            method: 'POST',
            path: '/api/createplaylist',
            handler: (request, h) => {
                const { yar } = request;
                const session = yar.get('session');
                const { id: userId } = session;
                const payload = JSON.parse(request.payload);
                const { playlistName, options } = payload;

                return createPlaylist(userId, playlistName, options)
                    .then(data => ({
                        date: Date.now(),
                        data
                    }))
                    .catch(error => ({ error }));
            },
            config: {
                cors: {
                    credentials: true
                },
                description:
                    'Creates playlist and returns back info about the new playlist.',
                notes:
                    'Should be authenticated to create playlist. This endpoint does not create tracks in playlist.',
                tags: ['api', 'playlists', 'action']
            }
        });

        server.route({
            method: 'POST',
            path: '/api/addtracks',
            handler: (request, h) => {
                const { yar } = request;
                const session = yar.get('session');
                const { id: userID } = session;
                const payload = JSON.parse(request.payload);
                const { playlistID, tracks, options } = payload;

                return addTracksToPlaylist(userID, playlistID, tracks, options)
                    .then(data => ({
                        date: Date.now(),
                        data
                    }))
                    .catch(error => ({ error }));
            },
            config: {
                cors: {
                    credentials: true
                },
                description:
                    'Adds tracks to the playlist with the specified ID.',
                notes:
                    'The playlist ID is required. Tracks received from data is an array of track IDs.',
                tags: ['api', 'playlists', 'action', 'tracks']
            }
        });

        server.route({
            method: 'POST',
            path: '/api/upload-playlist-image',
            handler: (request, h) => {
                const { yar } = request;
                const session = yar.get('session');
                const { id: userId, accessToken } = session;
                const payload = JSON.parse(request.payload);
                const { playlistId, imageBase64 } = payload;

                return uploadPlaylistCoverImage(userId, playlistId, imageBase64)
                    .then(data => ({
                        date: Date.now(),
                        data
                    }))
                    .catch(error => ({ error }));
            },
            config: {
                cors: {
                    credentials: true
                },
                description:
                    'Uploas cover image to the specified existing playlist.',
                notes:
                    'Receives an image with base64 file format. Needs authentication.',
                tags: ['api', 'playlists', 'image', 'update']
            }
        });

        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                file: Path.join(__dirname, './build/index.html')
            },
            config: {
                description: 'Starting end point.',
                tags: ['api', 'index']
            }
        });

        server.route({
            method: 'GET',
            path: '/static/{param*}',
            handler: {
                directory: {
                    path: Path.join(__dirname, './build/static'),
                    listing: false,
                    index: true
                }
            },
            config: {
                description: 'Endpoint for serving static pages.',
                tags: ['api', 'index']
            }
        });

        server.route({
            method: 'GET',
            path: '/assets/{param*}',
            handler: {
                directory: {
                    path: Path.join(__dirname, './build/assets'),
                    listing: false,
                    index: true
                }
            },
            config: {
                description: 'Endpoint for serving images.',
                tags: ['api', 'index']
            }
        });

        await server.start();
    } catch (error) {
        console.log('Registration error.', error);
    }
};

startApp();
