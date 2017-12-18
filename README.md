# componofy

A web app that allows a user to merge multiple playlists into a new one and make various changes.

## Contribution

PRs are always welcome! If you want to contribute, you would need to:

1. git clone https://github.com/DalerAsrorov/componofy.git
1. cd ./componofy
1. yarn install
1. In `/componofy/src/utils/helpers.js` replace `DEV_SERVER_URL` with `HOST_URL`.
1. Create an `.env` file with the following information:

```
APP_CLIENT_URL=http://localhost:3000
SPOTIFY_CLIENT=[your own spotify client key]
SPOTIFY_CLIENT_SECRET=[your own spotify client secret ke]
SPOTIFY_REDIRECT_URI=http://localhost:3001/api/callback
YAR_PASS=[any set of characters (without quotes)]
```

Note: you can get spotify client app and secret keys in [Developer's](https://developer.spotify.com/) website section.

## License

[Apache License 2.0](LICENSE)
