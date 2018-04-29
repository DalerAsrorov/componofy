import { swapKeysAndValues } from './helpers';

export const MOCK_EXTERNAL_URL = {
  spotify: 'test_external_url'
};

export const ROUTE_INDEX_MAP = {
  0: '/app',
  1: '/app/public',
  2: '/app/componofy'
};

export const MOCK_IMAGE = {
  url: 'test image url',
  height: 500,
  width: 100
};

export const DEFAULT_INDEX = 0;

export const MOCK_NAVIGATION = {
  index: 0,
  currentPage: ROUTE_INDEX_MAP[DEFAULT_INDEX],
  nextIndex: 1,
  nextPage: ROUTE_INDEX_MAP[DEFAULT_INDEX + 1],
  indexToRouteMap: ROUTE_INDEX_MAP,
  routeToIndexMap: swapKeysAndValues(ROUTE_INDEX_MAP, parseInt),
  numberOfPages: 3
};

export const MOCK_ARTIST = {
  id: '324',
  name: 'Test Artist',
  external_urls: MOCK_EXTERNAL_URL
};

export const MOCK_ALBUM = {
  artists: [MOCK_ARTIST],
  name: 'Test album',
  external_urls: MOCK_EXTERNAL_URL,
  album_type: 'test type',
  images: [MOCK_IMAGE, MOCK_IMAGE]
};

export const MOCK_TRACK = {
  id: '1234',
  artists: [MOCK_ARTIST],
  external_urls: MOCK_EXTERNAL_URL,
  track_number: 1,
  duration_ms: 12323,
  popularity: 78,
  album: MOCK_ALBUM
};

export const MOCK_TRACKS = [MOCK_TRACK, MOCK_TRACK, MOCK_TRACK];

export const MOCK_PLAYLIST = {
  id: '8752',
  href: 'testLink',
  name: 'Artist 1',
  external_urls: MOCK_EXTERNAL_URL,
  tracks: {
    list: MOCK_TRACKS
  },
  owner: {
    id: 'testOwner',
    type: 'testType'
  },
  images: [MOCK_IMAGE],
  type: 'testType',
  public: true,
  isOpen: false
};

export const MOCK_PLAYLISTS = [
  {
    id: '8752',
    href: 'testLink',
    name: 'Artist 1',
    external_urls: MOCK_EXTERNAL_URL,
    tracks: {
      list: []
    },
    owner: {
      id: 'testOwner',
      type: 'testType'
    },
    images: [MOCK_IMAGE],
    type: 'testType',
    public: true,
    isOpen: false
  },
  {
    id: '6547',
    href: 'testLink',
    name: 'Artist 1',
    external_urls: MOCK_EXTERNAL_URL,
    tracks: {
      list: []
    },
    owner: {
      id: 'testOwner',
      type: 'testType'
    },
    images: [MOCK_IMAGE],
    type: 'testType',
    public: true,
    isOpen: false
  },
  {
    id: '4234',
    href: 'testLink',
    name: 'Artist 1',
    external_urls: MOCK_EXTERNAL_URL,
    tracks: {
      list: []
    },
    owner: {
      id: 'testOwner',
      type: 'testType'
    },
    images: [MOCK_IMAGE],
    type: 'testType',
    public: true,
    isOpen: false
  }
];
