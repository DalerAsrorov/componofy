const API_BASE_URL = 'http://localhost:3001/api';

export const getMyPlaylists = (offset = 1, limit = 10) => {
    const OFFSET = offset;
    const LIMIT = limit;
    const URL = `${API_BASE_URL}/myplaylists/${OFFSET}/${LIMIT}`;

    return fetch(URL).then(
        response => response.json(),
        error => console.error('Error fetching my playlists', error)
    );
};
