const API_BASE_URL = 'http://localhost:3001/api';

export const getMyPlaylists = () => {
    const OFFSET = 1;
    const LIMIT = 10;
    const URL = `${API_BASE_URL}/myplaylists/${OFFSET}/${LIMIT}`;

    return fetch(URL).then(response => response.json());
};
