# componofy

[![GitHub version](https://badge.fury.io/gh/dalerasrorov%2Fcomponofy.svg)](https://badge.fury.io/gh/dalerasrorov%2Fcomponofy)
[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/dalerasrorov/componofy/pulse)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/dalerasrorov/componofy.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A web app that allows a Spotify user to merge multiple (personal, private, and public) playlists into a new awesome playlist.

## Demo

[Watch video](https://www.youtube.com/watch?v=XAF5MUOzKhs&t=17s)

## New Feature Details

* Each release has its own set of new features. You can find the details in
  the [releases section](https://github.com/DalerAsrorov/componofy/releases)
* You can also track the board of features I am working on in this [project board](https://github.com/DalerAsrorov/componofy/projects/7)

## Contribution

PRs are always welcome! If you want to contribute, you would need to:

1. `git clone https://github.com/DalerAsrorov/componofy.git`
1. `cd ./componofy`
1. `yarn install`
1. In `/componofy/src/utils/helpers.js` replace `DEV_SERVER_URL` with `HOST_URL`.
1. Create an `.env` file with the following information:

```
APP_CLIENT_URL=http://localhost:3000
SPOTIFY_CLIENT=[your own spotify client key]
SPOTIFY_CLIENT_SECRET=[your own spotify client secret key]
SPOTIFY_REDIRECT_URI=http://localhost:3001/api/callback
YAR_PASS=[any set of characters (without quotes)]
DEV_MODE=true
```

6. `yarn start:api` in one terminal (window/tab)
1. `yarn start:dev` in another terminal (window/tab)
1. Go to `localhost:3000` in your favorite browser

Note: you can get spotify client app and secret keys in [Developer's](https://developer.spotify.com/) website section

## License

[Apache License 2.0](LICENSE)
