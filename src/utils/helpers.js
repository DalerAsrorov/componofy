import * as R from 'ramda';

const SERVER_URL = 'http://localhost:3001';

export const replaceTo = path => {
    window.location.replace(`${SERVER_URL}${path}`);
};

export const formatTracks = tracks => {
    return tracks.map(trackObject => {
        const { track, ...rest } = trackObject;

        return {
            ...track,
            ...rest
        };
    });
};

export const removeDuplicates = R.curry((data, prop) => {
    return R.pipe(
        R.groupBy(R.prop(prop)),
        R.values,
        R.pipe(R.map(R.take(1)), R.flatten)
    )(data);
});

export const swapKeysAndValues = (map, fn = toString) => {
    return R.zipObj(R.values(map), R.map(fn, R.keys(map)));
};

export const filterSearchPlaylist = (searchTerm, playlists) => {
    const stringContains = (mainStr, compareToStr) =>
        R.toUpper(mainStr).indexOf(R.toUpper(compareToStr)) > -1;

    const containsInfo = playlist => {
        if (stringContains(playlist.name, searchTerm)) {
            return true;
        }

        return !!R.find(
            R.propSatisfies(name => stringContains(name, searchTerm), 'name')
        )(playlist.tracks.list);
    };

    return R.filter(containsInfo, playlists);
};

export const formatPlaylistsData = (playlistsMap, tracksMap) => {
    return R.pipe(
        R.toPairs,
        R.map(([playlistKey, playlistData]) => {
            let { list, ...restTrackProps } = playlistData.tracks;
            list = playlistData.tracks.list.map(trackID => tracksMap[trackID]);

            return {
                ...playlistData,
                id: playlistKey,
                tracks: {
                    list,
                    ...restTrackProps
                }
            };
        })
    )(playlistsMap);
};

export const isDomElementInFocus = domElement =>
    domElement === document.activeElement;

export const safeString = (str = '') => str;

export const getAllPlaylistsTrackIds = (playlistsMap = {}) => {
    return R.pipe(R.values, R.map(R.path(['tracks', 'list'])), R.flatten)(
        playlistsMap
    );
};

export const toTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
