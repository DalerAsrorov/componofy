# CHANEGLOG

## v1.4.0

Some of the major upgrades/changes:

* Update to React 16.3 and use of `Fragment` component for menu items.
* Upgraded testing framework `enzyme` and fixed failing `Nav` tests.
* Polished and reformatted code.

The rest of changes can be found [here](https://github.com/DalerAsrorov/componofy/projects/8)

### v1.3.0

Some of the major features/changes are:

* Loader message if no playlists found.
* Fixed some UI responsiveness bugs and improved render time of DIalog.
* Show suggested custom playlist based on user's preferences.
* Upgraded Material UI to beta 38.

To see the full list checkout [v1.3 Release Project Board](https://github.com/DalerAsrorov/componofy/projects/7).

### v1.2.0

* In this release experience for showing a particular playlist has been improved - the user can decide whether to expand the playlist tracklist fully or not.
* Search and footer `sticky` position now works for Safari and other `webkit` type of browsers.
* Number of playlist tracks indicated on the right.
* Number of added tracks from playlist shows up to the left of the badge described above.
  View more in the [v1.2.0 release project board](https://github.com/DalerAsrorov/componofy/projects/6).

### v1.1.0

* Major feature: ability to reorder tracks in a playlist owned by the user.
* Also includes fixes like:
  * Fetch all playlist tracks with no limit (before it was <= 100).
  * New search resets the offset properly. It means that on new search, the first 10 playlists will not be missed.
  * Show loader until all playlist tracks are fetched.
  * If playlists has a lot of playlists, the max height will be applied to not make the user scroll the page.
* The rest of thea features/fixes can be found in [v1.1.0 Feature Board](https://github.com/DalerAsrorov/componofy/projects/5).

### v1.0.1

* Major feature: ability to merge public/private/personal playlists into an existing user's playlist.
* The rest of the features can be found in [v1.0.1 Feature Board](https://github.com/DalerAsrorov/componofy/projects/3).

### v1.0.0

* The first complete build of the project.
* Contains set of features implemented in [Project Alpha](https://github.com/DalerAsrorov/componofy/projects/1)
  and [Project Beta](https://github.com/DalerAsrorov/componofy/projects/2).
