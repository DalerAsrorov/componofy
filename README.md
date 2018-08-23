# componofy

[![GitHub version](https://badge.fury.io/gh/dalerasrorov%2Fcomponofy.svg)](https://badge.fury.io/gh/dalerasrorov%2Fcomponofy)
[![dependencies Status](https://david-dm.org/dalerasrorov/componofy/status.svg)](https://david-dm.org/dalerasrorov/componofy)
[![Maintenance Status](https://img.shields.io/badge/status-maintained-brightgreen.svg)](https://github.com/dalerasrorov/componofy/pulse)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![license](https://img.shields.io/github/license/dalerasrorov/componofy.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Join chat!](https://img.shields.io/badge/%E2%8A%AA%20GITTER%20-JOIN%20CHAT%20%E2%86%92-brightgreen.svg?style=flat)](https://gitter.im/daler-asrorov/componofy)

A web app that allows a Spotify user to merge multiple (personal, private, and public) playlists into a new awesome playlist.

## Demo

[Watch video](https://www.youtube.com/watch?v=lQnvfRADJMQ)

## Features

* _Reorder the tracks in your playlists just with drag and drop!_
  ![As easy as drag and drop!](./docs/gifs/reorder_my_playlist_tracks_snippet.gif 'Reorder your playlist tracks!')

* _Select all or specific tracks from the playlist to add to the queue_
  ![Click on add playlist to add all tracks from that playlist!](./docs/gifs/add_all_playlist_tracks_to_queue_snippet.gif 'Add playlist tracks.')

* _Search and add public playlist tracks created by Spotify users around the world. You can search by genre, artist, song, mood, and other categories._
  ![Add all or selected public playlist tracks!](./docs/gifs/search_and_add_public_playlist_tracks.gif 'Search and add public playlist tracks.')

* _Create a new playlist out of added personal and public playlist tracks. You can add a custom playlist cover image and set it as either private or public._
  ![Add all or selected public playlist tracks!](./docs/gifs/create_new_playlist_out_of_playlist_tracks.gif 'Create new playlist.')

* _Or... you can combine the added playlist tracks with the your existing playlist. Now your playlist is updated with the brand new songs! This is the idea of merging personal and/or public playlists with existing playlist owned by you, the user._
  ![Merge queud playlist tracks with existing playlist!](./docs/gifs/merge_new_playlist_out_of_playlist_tracks.gif 'Merge playlist tracks with existing playlist.')

## New Feature Details

* Each release has its own set of new features. You can find the details in
  the [releases section](https://github.com/DalerAsrorov/componofy/releases)
* You can also track the board of features I am working on in this [project board](https://github.com/DalerAsrorov/componofy/projects/7)

## Contributions

PRs are always welcome! If there is a bug or a new feature that you can add to this app,
I would appreciate it a lot! Read the [contribution guide](CONTRIBUTING.md) to have you up and running. If you
find the guide confusing, create an issue or [join chat](https://gitter.im/daler-asrorov/componofy).

## Run project locally

To run the project on your local machine:

1.  `git clone https://github.com/DalerAsrorov/componofy.git`
2.  `cd ./componofy`
3.  `yarn install`
4.  In `/componofy/src/utils/helpers.js` replace `DEV_SERVER_URL` with `HOST_URL`.
5.  Create an `.env` file with the following information:

```
APP_CLIENT_URL=http://localhost:3000
SPOTIFY_CLIENT=[your own spotify client key]
SPOTIFY_CLIENT_SECRET=[your own spotify client secret key]
SPOTIFY_REDIRECT_URI=http://localhost:3001/api/callback
YAR_PASS=[any set of characters (without quotes)]
DEV_MODE=true
```

6.  `yarn start:api` in one terminal (window/tab)
1.  `yarn start:dev` in another terminal (window/tab)
1.  Go to `localhost:3000` in your favorite browser

Note: you can get spotify client app and secret keys in [Developer's](https://developer.spotify.com/) website section

## License

[Apache License 2.0](LICENSE)
