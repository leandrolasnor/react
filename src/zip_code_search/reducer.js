import { toastr } from 'react-redux-toastr';

const INITIAL_STATE = {
  addreses: [],
  pagination: {}
};

var reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ERRORS_FROM_CAPTURED_ADDRESS':
      console.log(action.payload.errors)
      action.payload.errors.forEach(error => toastr.error("Error", error));
      return state
    case 'CAPTURED_ADDRESS':
      return {
        ...state,
        addreses: [ action.payload.address ],
        pagination: {}
      }
    case 'ADDRESES_FETCHED':
      const hits = action.payload.addreses.hits
      const estimatedTotalHits = action.payload.addreses.estimatedTotalHits
      const limit = action.payload.addreses.limit
      const offset = action.payload.addreses.offset
      return {
        ...state,
        addreses: hits,
        pagination: {
          pages_count: Math.ceil(estimatedTotalHits / limit),
          per_page: limit,
          current_page: ((offset / limit) + 1),
          items_count: estimatedTotalHits
        }
      }
    case 'ERRORS_FROM_ADDRESES_FETCHED':
      action.payload.errors.forEach(error => toastr.error("Error", error));
      return state
    case '500':
      toastr.error(action.type, action.payload.message)
      return state
    case 'LOGOUT':
      return INITIAL_STATE
    default:
      return state;
  }
}

export default reducer;