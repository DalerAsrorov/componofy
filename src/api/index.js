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
    }).then(data => {
        debugger;
    });
};

const testPlaylistURL = '11c8FlKwqPSVyE88fw9mjc';

addTracksToPlaylist(testPlaylistURL, [
    '1fy015PWkCjeiN0mEQ28gK',
    '6mgS6Y9ivI6eYYFa2N6r68'
]);
