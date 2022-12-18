// import { toastr } from 'react-redux-toastr';

const INITIAL_STATE = {
  albums: [],
  album:{},
  pagination:{},
  list_of_artists:[]
};

var reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ARTISTS_FETCHED':
      return {
        ...state,
        list_of_artists: action.payload.artists
      }
    case 'ALBUM_FETCHED':
      return {
        ...state,
        album: action.payload.album
      }
    case 'ALBUM_CREATED':
      return {
        ...state,
        albums: [action.payload.album, ...state.albums]
      }
    case 'ERRORS_FROM_ALBUM_CREATED':
      return state
    case 'ALBUMS_FETCHED':
      const hits = action.payload.albums.hits
      const estimatedTotalHits = action.payload.albums.estimatedTotalHits
      const limit = action.payload.albums.limit
      const offset = action.payload.albums.offset
      return {
        ...state,
        albums: hits,
        pagination: {
          pages_count: Math.ceil(estimatedTotalHits / limit),
          per_page: limit,
          current_page: ((offset / limit) + 1),
          items_count: estimatedTotalHits
        }
      }
    case 'ERRORS_FROM_SEARCH_ALBUMS':
      return state
    case 'ALBUM_UPDATED':
      const album = action.payload.album;
      const albums = state.albums.filter(obj => Number(obj.id) !== Number(album.id));
      return {
        ...state,
        albums: [...albums, album].sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      }
    case 'ERRORS_FROM_ALBUM_UPDATED':
      return state
    case 'ALBUM_REMOVED':
      const id = action.payload.album.id
      return {
        ...state,
        albums: state.albums.filter((album) => {return album.id !== id})
      }
    case 'ERRORS_FROM_ALBUM_REMOVED':
      return state
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state;
  }
}

export default reducer;