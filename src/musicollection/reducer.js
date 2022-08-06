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
      // action.payload.errors.forEach(error => toastr.error("Error", error));
      return state
    case 'ALBUMS_FETCHED':
      return {
        ...state,
        albums: action.payload.albums,
        pagination: action.payload.pagination
      }
    case 'ERRORS_FROM_SEARCH_ALBUMS':
      // action.payload.errors.forEach(error => toastr.error("Error", error));
      return state
    case 'ALBUM_UPDATED':
      const album = action.payload.album;
      const albums = state.albums.filter(obj => obj.id !== album.id);
      return {
        ...state,
        albums: [...albums, album].sort((a,b) => b.id - a.id)
      }
    case 'ERRORS_FROM_ALBUM_UPDATED':
      // action.payload.errors.forEach(error => toastr.error("Error", error));
      return state
    case 'ALBUM_REMOVED':
      const id = action.payload.album.id
      return {
        ...state,
        albums: state.albums.filter((album) => {return album.id !== id})
      }
    case 'ERRORS_FROM_ALBUM_REMOVED':
      // action.payload.errors.forEach(error =>toastr.error("Error", error));
      return state
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state;
  }
}

export default reducer;