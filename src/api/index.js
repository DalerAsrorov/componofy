const API_BASE_URL = '/api';

const corsParams = {
    mode: 'cors',
    // allow client to access server data
    // Note: without this parameter session
    // variables would not be shared from the server
    credentials: 'include'
};

export const getMyStatus = () => {
    const URL = `${API_BASE_URL}/userstatus`;

    return fetch(URL, {
        ...corsParams
    }).then(
        response => response.json(),
        error => console.error('Error fetching my status', error)
    );
};

export const getMyPlaylists = (offset = 0, limit = 10) => {
    const URL = `${API_BASE_URL}/myplaylists/${offset}/${limit}`;

    return fetch(URL, { ...corsParams }).then(
        response => response.json(),
        error => console.error('Error fetching my playlists', error)
    );
};

export const searchPlaylists = (query = '', offset = 0, limit = 10) => {
    const URL = `${API_BASE_URL}/searchplaylist/${query}/${offset}/${limit}`;

    return fetch(URL, {
        ...corsParams
    }).then(
        response => response.json(),
        error => console.error('Error fetching searched playlists', error)
    );
};

export const getMyTopArtists = () => {
    const URL = `${API_BASE_URL}/mytopartists`;

    return fetch(URL, { ...corsParams }).then(
        response => response.json(),
        error => console.error('Error fetching my playlists', error)
    );
};

export const getPlaylistTracks = (
    userID,
    playlistID,
    offset = 0,
    limit = 100
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

export const createPlaylist = (playlistName = '', options) => {
    const URL = `${API_BASE_URL}/createplaylist`;

    const body = JSON.stringify({
        playlistName,
        options
    });

    return fetch(URL, {
        method: 'post',
        body,
        ...corsParams
    }).then(response => response.json());
};

export const addTracksToPlaylist = (playlistID, tracks, options) => {
    const URL = `${API_BASE_URL}/addtracks`;
    const body = JSON.stringify({
        playlistID,
        options,
        tracks
    });

    return fetch(URL, {
        method: 'post',
        body,
        ...corsParams
    }).then(response => response.json());
};

// Make sure to remove the "data:base64," part
export const uploadPlaylistCoverImage = (
    playlistId,
    imageBase64,
    options = {}
) => {
    const URL = `${API_BASE_URL}/upload-playlist-image`;

    return fetch(URL, {
        method: 'post',
        body: JSON.stringify({
            imageBase64,
            playlistId
        }),
        credentials: 'include'
    }).then(response => response.json());
};

export const reorderTracksInPlaylist = (playlistId, start, end) => {
    const URL = `${API_BASE_URL}/reorder-playlist-tracks/${playlistId}/${start}/${end}`;

    return fetch(URL, {
        ...corsParams
    }).then(response => response.json(), error => error);
};

export const requestRefreshToken = () => {
    const URL = `${API_BASE_URL}/update-token`;

    return fetch(URL, {
        method: 'post',
        ...corsParams
    })
        .then(response => response.json())
        .catch(error => error);
};

export const getLogOutUser = () => {
    const URL = `${API_BASE_URL}/logout`;

    return fetch(URL, {
        ...corsParams
    }).then(
        response => response.json(),
        error => console.error('Error fetching my status', error)
    );
};
