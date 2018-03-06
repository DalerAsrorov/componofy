# Contributions

## Set up project for development

1. Fork this repository by clikcing the **Fork** button.
1. `git clone https://github.com/<your username>/componofy.git`
1. Set upstream: `git remote add upstream https://github.com/DalerAsrorov/componofy.git`
1. Create a new branch `git checkout -b [feature branch name]`
1. `cd ./componofy`
1. `yarn install`
1. In [`src/utils/helpers.js`](src/utils/helpers.js) replace
   [`DEV_SERVER_URL`](src/utils/helpers.js#L5) with `HOST_URL` in [line 8](src/utils/helpers.js#L8)
1. Create an `.env` file with the following information:

```
APP_CLIENT_URL=http://localhost:3000
SPOTIFY_CLIENT=[your own spotify client key]
SPOTIFY_CLIENT_SECRET=[your own spotify client secret key]
SPOTIFY_REDIRECT_URI=http://localhost:3001/api/callback
YAR_PASS=[any set of characters (without quotes)]
DEV_MODE=true
```

9. `yarn start:api` in one terminal (window/tab)
1. `yarn start:dev` in another terminal (window/tab)

The dev server will be started and the browser with the app will be opened.
The project should be available in `localhost:3000`.
Note: you can get spotify client app and secret keys in
[Developer's](https://developer.spotify.com/) website section

## Building a new feature

Depending on the type of the feature, there are different places in the project where the changes can be made.

### Adding new component

1. Create a new folder with the component name in [`./src/components`](src/components).
   The name of the folder should be capitalized and camel case.
2. Add two new files `index.js` and `[NameOfTheComponentFolder].scss`.
   Save the `.scss` file. `yarn start:dev` script will generate `[NameOfTheComponentFolder].css` file which you can
   import in `index.js` like

```
import './[NameOfTheComponentFolder].css'
```

3. To keep the look and feel of the app consistent, use Material UI react framework
   that is used and is encouraged.
4. See [`src/components/FooterPanel`](src/components/FooterPanel) as an example.
5. Once the component is implemented, you will use it in one of the base components:

* [`src/components/MyPlaylists/index.js`](src/components/MyPlaylists/index.js)
* [`src/components/PublicPlalists/index.js`](src/components/PublicPlaylists/index.js)
* [`src/components/ComponofyPlaylists/index.js`](src/components/ComponofyPlaylists/index.js)

- If component should be used in the Dialog - final step:
  * [`src/components/Dialog/index.js`](src/components/Dialog/index.js)

### Adding new action/reducer/prop

1. Add new public module function in [`src/actions/index.js`](src/actions/index.js)
2. Connect that action in one of the reducers in [`src/reducers`](src/reducers)
   * [`src/reducers/myPlaylists.js`](src/reducers/myPlaylists.js) is
     responsible for managing state in `/app` route. It contains user's prlaylists information
     and essential metadata for playlist manipulation.
   * [`src/reducers/publicPlaylists.js`](src/reducers/publicPlaylists.js) is
     responsible for managing state in `/app/public` route. It contains necessary actions that hydrate the
     state tree with public playlists (playlists created by other Spotify users).
   * [`src/reducers/finalPlaylists.js`](src/reducers/finalPlaylists.js) is
     responsible for managing state in `/app/componofy` route. It contains the state tree hydrated with
     the playlists and tracks added from `/app` and/or `/app/public` routes. Actions connected to this reducer
     are responsible for making calls to add tracks via Spotify API and some of the Dialog content.
   * [`src/reducers/componoform.js`](src/reducers/componoform.js) is
     responsible for managing state in `/app/componofy` route as well. It contains necessary actions that hydrate
     the [`Dialog component`](src/components/Dialog/index.js) state. Among other properties, contains final playlist url -
     url of the new playlist (or existing playlist if merged with existing) after merge.
   * [`src/reducers/user.js`](src/reducers/user.js) is
     responsible for managing the user state such as authentication and refresh token. It hydrates the state tree with
     user information continiously fetched from [`server`](server.js) that gets informotion about the authenticated user
     after log in (see [`api/spotify.js`](api/spotify.js) `authorizationCodeGrant` and `createAuthorizeURL` functions for more details).
   * [`src/reducers/errors.js`](src/reducers/errors.js) is
     responsible for managing the user state's global errors. The method [`addErrorToApp`](src/actions/index.js#L20) adds a new [`ErrorSnackBar`](src/components/ErrorSnackBar/index.js) component to UI
     with the error message supplied by the function's argument. The component will automatically disappear after few seconds.
3. In one of the reducers mentioned above, import your new action constant name and add logic to update the state.
4. Import the new action in [`src/connectPage.js`](src/connectPage.js) to `mapDispatchToProps` object.
   * Also, add new global state properties that you want to connect with the global store in `mapStateToProps` object.
5. Add the new `propType` to whatever component you want to use your new action in. Look at [`src/utils/constants`](src/utils/constants.js) for `propTypes` that
   may already exist.

### Adding new endpoint

TODO

## Before submitting new PR

1. `git checkout master`
1. `git pull --rebase upstream master`
1. `git checkout [your feature branch name]`
1. In [`src/utils/helpers.js`](src/utils/helpers.js#L5) place back
   [`HOST_URL`](src/utils/helpers.js#L3) in [line 8](src/utils/helpers.js#L8)
1. Commit this change to new branch
1. Create a PR with your new branch
