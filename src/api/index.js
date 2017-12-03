const API_BASE_URL = 'http://localhost:3001/api';

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

export const searchPlaylists = (query = '', offset = 0, limit = 10) => {
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
    });
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
    });
};

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
        ...corsParams
    });
};

const sampleBase64 =
    'data:image/jpeg;base64,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';

uploadPlaylistCoverImage('11JkaA1IdZmpEaJJC62e4F', sampleBase64);
