import { toastr } from "react-redux-toastr";
import axios from "axios";

export function search_addreses(query = ''){
  query = query.toString().toLowerCase();
  return dispatch => {
    axios.get(`/latech/addreses/search/${query}`).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function capture_address(zip){
  return dispatch => { 
    axios.get(`/latech/addreses/capture/${zip}`).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}