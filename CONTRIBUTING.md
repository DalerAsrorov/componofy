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
1. Add two new files `index.js` and `[NameOfTheComponentFolder].scss`. 
Save the `.scss` file. `yarn start:dev` script will generate `[NameOfTheComponentFolder].css` file which you can
import in `index.js` like 
```
import './[NameOfTheComponentFolder].css'
```
1. To keep the look and feel of the app consistent, use Material UI react framework 
that is used and is encouraged.
1. See [`src/components/FooterPanel`](src/components/FooterPanel) as an example.
1. Once the component is implemented, you will use it in one of the base components:
  - [`src/components/MyPlaylists/index.js`](src/components/MyPlaylists/index.js)
  - [`src/components/PublicPlalists/index.js`](src/components/PublicPlaylists/index.js)
  - [`src/components/ComponofyPlaylists/index.js`](src/components/ComponofyPlaylists/index.js)
* If component should be used in the dialog window (final step of the app)
  - [`src/components/Dialog/index.js`](src/components/Dialog/index.js)

### Adding new action/reducer/prop
 TODO
 
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
 
 
 
