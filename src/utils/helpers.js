const SERVER_URL = 'http://localhost:3001';

export const replaceTo = path => {
    window.location.replace(`${SERVER_URL}${path}`);
};
