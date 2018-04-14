import { schema } from 'normalizr';

export const track = new schema.Entity('tracks');

export const playlist = new schema.Entity('playlists', {
  tracks: {
    list: [track]
  }
});
