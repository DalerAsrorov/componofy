const API_BASE_URL = 'http://localhost:3001/api';

export const getMyStatus = () => {
    const URL = `${API_BASE_URL}/userstatus`;

    return fetch(URL, {
        mode: 'cors',
        // allow client to access server data
        // Note: without this parameter session
        // variables would not be shared from the server
        credentials: 'include'
    }).then(
        response => response.json(),
        error => console.error('Error fetching my status')
    );
};

export const getMyPlaylists = (offset = 0, limit = 10) => {
    const URL = `${API_BASE_URL}/myplaylists/${offset}/${limit}`;

    return fetch(URL).then(
        response => response.json(),
        error => console.error('Error fetching my playlists', error)
    );
};

export const searchPlaylists = (query = '', offset = 1, limit = 10) => {
    const URL = `${API_BASE_URL}/searchplaylist/${query}/${offset}/${limit}`;

    return fetch(URL).then(
        response => response.json(),
        error => console.error('Error fetching searched playlists', error)
    );
};

export const getPlaylistTracks = (
    userID,
    playlistID,
    offset = 0,
    limit = 10
) => {
    const URL = `${API_BASE_URL}/playlist-tracks/${userID}/${playlistID}/${offset}/${limit}`;

    return fetch(URL).then(
        response => response.json(),
        error =>
            console.error(
                `Error fetching ${userID}'s traks from ${playlistID}.`
            )
    );
};
