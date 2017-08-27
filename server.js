import Hapi from 'hapi';
import Spotify from './api/spotify';

const server = new Hapi.Server();

server.connection({
    port: 3001,
    host: 'localhost'
});

server.start(err => {
    if (err) {
        throw err;
    }

    console.log(`Componofy server running at: ${server.info.uri}`);
});

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
        notes: 'Can be used for checking if server connection still exists.',
        tags: ['api', 'intro']
    }
});

server.route({
    method: 'POST',
    path: '/auth',
    handler: (request, reply) => {
        console.log('Route /auth');
        console.log(request);
    },
    config: {
        description: 'Handles authentication request from client.',
        notes: 'Should accept grant for access token',
        tags: ['api', 'auth']
    }
});
