import Hapi from 'hapi';
import corsHeaders from 'hapi-cors-headers';
import { createAuthorizeURL, authorizationCodeGrant, getMyPlaylists } from './api/spotify';

const server = new Hapi.Server();
let isAuthenticated = false;

server.connection({
	port: 3001,
	host: 'localhost'
});

server.ext('onPreResponse', corsHeaders);

server.start(err => {
	if (err) {
		throw err;
	}

	console.log(`Componofy server running at: ${server.info.uri}`);
});

server.route({
	method: 'GET',
	path: '/userstatus',
	handler: (request, reply) => {
		reply({
			isAuthenticated
		});
	},
	config: {
		description: 'Lets client know whether the user has already been authenticated.',
		notes: 'Can be used for checking if server connection still exists.',
		tags: ['api', 'index']
	}
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
		tags: ['api', 'index']
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
			.then(clientUrl => {
				isAuthenticated = true;
				reply.redirect(clientUrl);
			})
			.catch(error => console.error(error));
	},
	config: {
		description: 'Given code from Spotify authentication server, generates token and redirects back to client app.',
		notes: 'Accepts the code value',
		tags: ['api', 'auth']
	}
});

server.route({
	method: 'GET',
	path: '/api/myplaylists',
	handler: (request, reply) => {
		getMyPlaylists()
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
		notes: 'Should be authenticated first to have access to this information',
		tags: ['api', 'user-info']
	}
});
