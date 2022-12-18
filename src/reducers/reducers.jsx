import { combineReducers } from "redux";
import {reducer as toastr} from 'react-redux-toastr';
import auth from "../auth/reducer";
import albumcollection from "../albumcollection/reducer"
import zip_code_search from "../zip_code_search/reducer"

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth,
  albumcollection,
  zip_code_search,
  form:formReducer,
  toastr
});

export default rootReducer;
