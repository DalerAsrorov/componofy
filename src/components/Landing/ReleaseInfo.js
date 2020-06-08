import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FaGithubAlt from 'react-icons/lib/fa/github-alt';
import { DEMO_YOUTUBE_LINK, GITHUB_REPO_LINK } from '../../utils/constants';
import { TypographyLink } from '../common';

export const ReleaseInfoDialog = (props) => (
  <React.Fragment>
    <Button variant="outlined" color="default" onClick={props.onOpenInfoDialog}>
      Version {props.releaseVersion} is out! Please read the new guide! 💚
    </Button>
    <Dialog
      fullWidth
      maxWidth="lg"
      open={props.isOpen}
      onClose={props.onCloseInfoDialog}
      aria-labelledby="release-info-dialog"
      aria-describedby="release-info-dialog"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Typography component="p" style={{ marginBottom: '1rem' }}>
          Hello friend. Thank you for visiting this app. It means a lot to me
          that you are using this app for modifying or creating new Spotify
          playlists. This app is absolutely free and is going to be maintained
          more thoroughly. Visit my{' '}
          <a target="__blank" href="https://dalerasrorov.com/">
            website
          </a>{' '}
          to contact me or learn more about my work. You can also email me:{' '}
          <b>asrorids@gmail.com</b>.
        </Typography>
        <Typography component="div">
          <Typography variant="h5">Guide</Typography>
          General guide and clarifications:
          <ul>
            <li>
              Merging playlist in this app means - select playlists (or
              individual tracks from those playlists) to the final list and
              combine all tracks from your selection of playlists. You can
              remove tracks from the queue by clicking on the checkmark of
              either playlist or track - you can decide what tracks you want to
              be included or not from specific playlist or remove the playlist
              altogether from the final queue.
            </li>
            <li>
              You can serach for all the public tracks available on Spotify and
              add the whole playlist or individual tracks from those playlists
              to the queue. The search is fast!
            </li>
            <li>
              Once you are done with your selection of playlists and their
              tracks, the app will gather all the selected tracks and make one
              of the following actions based on your choice:
              <ul>
                <li>
                  <b>Create a new playlist</b> with the selected playlist tracks
                  - playlist creation.
                </li>
                <li>
                  <b>
                    Add the selected playlist tracks to one of your existing
                    personal playlists
                  </b>{' '}
                  - existing playlist modification.
                </li>
              </ul>
            </li>
            <li>
              There is no requirement as for what playlists should be added to
              the list of playlists to be merged. You can select either personal
              or public playlists or both at the same time. The app will select
              the final playlists (i.e. its tracks you included) into the final
              version.
            </li>
            <li>
              You <b>can change the order of your personal playlist tracks</b>{' '}
              just by draging and dropping the track list item up or down!
            </li>
            <li>
              You can{' '}
              <b>
                add a custom playlist cover image for your new playlist or even
                existing playlist
              </b>
              . The app will automatically place the final iamge you selected as
              the main image that will be shown on Spotify. If you don't select
              any image, Spotify generates default grid of images for playlist
              cover image.
            </li>
            <li>
              <b>
                None of the playlists are removed after the combination/merging
                process
              </b>
              . The Spotify API doesn't allow developers to delete playlists
              unfortunately - hence the idea of "merging" can be confusing but I
              hope I clarified it for you.
            </li>
          </ul>
        </Typography>
        <Typography component="div">
          <Typography variant="h5">Updates</Typography>
          <ul>
            <li>UI improvements</li>
            <li>
              Overall performance improvents with search and tracks combination
              process
            </li>
            <li>Bug fixes that caused server to be overflowed.</li>
          </ul>
        </Typography>
        <Typography color="secondary" variant="h6">
          If you are confused by this guide or have any questions please{' '}
          <a target="__blank" href={DEMO_YOUTUBE_LINK}>
            watch YouTube demo
          </a>{' '}
          and feel free to reach out to me directly. You can see the source code
          if you click on that cute Github icon below!
        </Typography>
        <section style={{ textAlign: 'center' }}>
          <TypographyLink variant="h2" hasNoDecoration href={GITHUB_REPO_LINK}>
            <FaGithubAlt />
          </TypographyLink>
        </section>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCloseInfoDialog} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
);

ReleaseInfoDialog.propTypes = {
  onOpenInfoDialog: PropTypes.func.isRequired,
  onCloseInfoDialog: PropTypes.func.isRequired,
  releaseVersion: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
