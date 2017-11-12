import * as R from 'ramda';

const SERVER_URL = 'http://localhost:3001';

export const replaceTo = path => {
    window.location.replace(`${SERVER_URL}${path}`);
};

export const formatPlaylist = unformattedPlaylist => {
    let formatted = unformattedPlaylist;

    return formatted;
};

export const removeDuplicates = R.curry((data, prop) => {
    return R.pipe(
        R.groupBy(R.prop(prop)),
        R.values,
        R.pipe(R.map(R.take(1)), R.flatten)
    )(data);
});
