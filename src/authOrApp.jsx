import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThroughProvider } from "react-through";
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider';
import axios from 'axios'
import App from "./App";
import Auth from "./auth/auth";
import { validateToken } from "./auth/actions";
import './index.css'
import "hover.css/css/hover-min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import '@fortawesome/fontawesome-free-brands';
import '@fortawesome/fontawesome-free-solid';
import '@fortawesome/fontawesome-free-regular'
const _ = require("lodash")

let AuthOrApp = props => {
  const dispatch = useDispatch()
  const { user, validToken } = useSelector(state => state.auth)
  const {children} = props;
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
	axios.defaults.headers.common['Content-type'] = 'application/json';

  useEffect(() => {
    const local_storage = JSON.parse(localStorage.getItem(process.env.REACT_APP_APPLICATION_NAME)) || null
    if(local_storage && !validToken){
      dispatch(validateToken(local_storage));
    }
  },[dispatch, validToken])

  return(
    <React.Fragment>
      {
      (user && validToken) ?
        <ThroughProvider>
          <ActionCableProvider url={`${process.env.REACT_APP_CABLE_URL}?ws_token=${_.get(user, "ws_token")}`}>
            <App>{children}</App>
          </ActionCableProvider>
        </ThroughProvider> : <Auth />
      }
    </React.Fragment>

  );
}
export default AuthOrApp;
