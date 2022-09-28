import { toastr } from 'react-redux-toastr';

const INITIAL_STATE = {
  addreses: []
};

var reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ERRORS_FROM_CAPTURED_ADDRESS':
      console.log(action.payload.errors)
      action.payload.errors.forEach(error => toastr.error("Error", error));
      return state
    case 'ADDRESES_FETCHED':
      return {
        ...state,
        addreses: action.payload.hits
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