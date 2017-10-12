import Hapi from 'hapi';
import Yar from 'yar';
import corsHeaders from 'hapi-cors-headers';
import {
    createAuthorizeURL,
    authorizationCodeGrant,
    getMyPlaylists
} from './api/spotify';
import dotenv from 'dotenv';

// allow server to import environment variables
dotenv.config();

// Hapi server instance.
const server = new Hapi.Server();

// options for session management module
const options = {
    cookieOptions: {
        password: process.env.YAR_PASS,
        isSecure: false
    }
};

server.connection({
    port: 3001,
    host: 'localhost'
});

server.ext('onPreResponse', corsHeaders);

server.register({ register: Yar, options }, error => {
    if (error) {
        throw error;
    }

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply({
                time: new Date().getTime(),
                app: 'Componofy',
                isOn: true
            });
        },
        config: {
            description: 'Starting end point.',
            notes:
                'Can be used for checking if server connection still exists.',
            tags: ['api', 'index']
        }
    });

    server.route({
        method: 'GET',
        path: '/userstatus',
        handler: (request, reply) => {
            const { yar } = request;
            let { id: sessionID } = yar;
            let session = yar.get('session');

            reply({
                sessionID,
                isAuthenticated: !!session,
                ...session
            });
        },
        config: {
            description:
                'Lets client know whether the user has already been authenticated.',
            notes:
                'Can be used for checking if server connection still exists.',
            tags: ['api', 'index']
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        handler: (request, reply) => {
            const { yar } = request;

            yar.reset();

            reply({
                isAuthenticated: !!yar.get('session'),
                offlineAt: Date.now()
            });
        },
        config: {
            description: 'Logs out user from the app and clears the session.',
            notes:
                'Session object will not be available if this request is made.',
            tags: ['api', 'auth']
        }
    });

    server.route({
        method: 'GET',
        path: '/auth',
        handler: (request, reply) => {
            const { authUrl } = createAuthorizeURL();
            reply.redirect(authUrl);
        },
        config: {
            description: 'Receives confirmation to start authentication.',
            notes: 'Authentication process will redirect',
            tags: ['api', 'auth']
        }
    });

    server.route({
        method: 'GET',
        path: '/callback',
        handler: (request, reply) => {
            const { query: { code } } = request;

            authorizationCodeGrant(code)
                .then(({ clientAppURL, accessToken, refreshToken }) => {
                    const sessionState = {
                        lastVisit: Date.now(),
                        accessToken,
                        refreshToken
                    };

                    request.yar.set('session', sessionState);
                    reply.redirect(clientAppURL);
                })
                .catch(error => console.error(error));
        },
        config: {
            description:
                'Given code from Spotify authentication server, generates token and `re`directs back to client app.',
            notes: 'Accepts the code value',
            tags: ['api', 'auth']
        }
    });

    server.route({
        method: 'GET',
        path: '/api/myplaylists/{offset}/{limit}',
        handler: (request, reply) => {
            const { offset, limit } = request.params;

            getMyPlaylists({
                offset,
                limit
            })
                .then(data => {
                    reply({
                        time: new Date().getTime(),
                        data
                    });
                })
                .catch(error => reply({ error }));
        },
        config: {
            description: 'Return the authenticated user playlist.',
            notes:
                'Should be authenticated first to have access to this information',
            tags: ['api', 'user-info']
        }
    });
});

server.start(err => {
    if (err) {
        throw err;
    }

    console.log(`Componofy server running at: ${server.info.uri}`);
});
