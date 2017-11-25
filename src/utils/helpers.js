import * as R from 'ramda';

const SERVER_URL = 'http://localhost:3001';

export const replaceTo = path => {
    window.location.replace(`${SERVER_URL}${path}`);
};

export const formatPlaylist = unformattedPlaylist => {
    let formatted = unformattedPlaylist;

    return formatted;
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
        let shouldShow = false;
        if (stringContains(playlist.name, searchTerm)) {
            return true;
        }

        return !!R.find(
            R.propSatisfies(name => stringContains(name, searchTerm), 'name')
        )(playlist.tracks.list);
    };

    return R.filter(containsInfo, playlists);
};

export const isDomElementActive = domElement =>
    domElement === document.activeElement;
