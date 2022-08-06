import { toastr } from "react-redux-toastr";
import axios from "axios";
const _ = require("lodash");

export function refreshToken(token){
  return dispatch => {
    dispatch({type:"REFRESH_TOKEN", payload:token})
  }
}

export function login(values) {
  return dispatch => { 
    axios.post('/auth/sign_in', values).then(resp => {
      dispatch(
        [
          {
            type: "USER_FETCHED",
            payload: {
              data: resp.data,
              headers: resp.headers,
              permissions: [],
            }
          },
          { type: "HIDE_OVERLAY" },
          {
            type: "REFRESH_TOKEN",
            payload: _.get(resp,"headers.access-token")
          }
        ]
      );
    }).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error =>
            toastr.error("Erro", error)
          );
        } else {
          toastr.error(String(e.response.status), e.response.statusText);
        }
      } else if (e.request) {
        if (e.message === "Network Error") {
          toastr.error("Erro", "Servidor OFFLINE");
        }
      }
      dispatch([{ type: "HIDE_OVERLAY" }]);
    });
  };
}

export function register(values) {
  return dispatch => { 
    axios.post(`/auth`, values).then(resp => {
      dispatch(
        [
          {
            type: "USER_FETCHED",
            payload: {
              data: resp.data,
              headers: resp.headers,
              permissions: [],
            }
          },
          { type: "HIDE_OVERLAY" },
          {
            type: "REFRESH_TOKEN",
            payload: _.get(resp,"headers.access-token")
          }
        ]
      );
    }).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.full_messages.forEach(error =>
            toastr.error("Error", error)
          );
        } else {
          toastr.error(String(e.response.status), e.response.statusText);
        }
      } else if (e.request) {
        if (e.message === "Network Error") {
          toastr.error("Erro", "Servidor OFFLINE");
        }
      }
      dispatch([{ type: "HIDE_OVERLAY" }]);
    });
  };
}

export const logout = () => {
  return dispatch => {
    axios.delete(`/auth/sign_out`)
    .then(resp => {
      if(resp.data.success){
        dispatch({ type: "LOGOUT" })
      }
    }).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
          e.response.data.errors.forEach(error =>
            toastr.error("Erro", error)
          );
        } else {
          toastr.error(String(e.response.status), e.response.statusText);
        }
      } else if (e.request) {
        if (e.message === "Network Error") {
          dispatch({ type: "TOKEN_VALIDATED", payload: false })
          toastr.error("Erro", "Servidor OFFLINE");
        }
      }
    });
  };
}

export function validateToken(data) {
  const config = {
    headers:{
      "uid": _.get(data,"uid"),
      "client":_.get(data,"client"),
      "access-token": _.get(data,"access-token"),
      'Content-Type': process.env.REACT_APP_CONTENTTYPE
    }
  }
  return dispatch => {
    axios.get('/auth/validate_token', config)
      .then(resp => {
        dispatch([
          {type: "TOKEN_VALIDATED", payload: resp.data.success || false},
          {type: "REFRESH_TOKEN", payload: _.get(resp,"headers.access-token")}
        ]);
      })
      .catch(e => {
        if (e.response) {
          if (e.response.data.errors) {
              e.response.data.errors.forEach(error =>
              toastr.error("Erro", error)
            );
          } else {
            toastr.error(String(e.response.status), e.response.statusText);
          }
        } else if (e.request) {
          if (e.message === "Network Error") {
            toastr.error("Erro", "Servidor OFFLINE");
          }
        }
        dispatch({ type: "TOKEN_VALIDATED", payload: false });
      });
  };
}