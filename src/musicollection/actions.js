import { toastr } from "react-redux-toastr";
import axios from "axios";

export function search_albums(query = ''){
  query = query.toString().toLowerCase();
  return dispatch => {
    axios.get(`/albums/search/${query}`).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function delete_album(id){
  return dispatch => { 
    axios.delete(`/albums/${id}`).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function create_album(album){
  return dispatch => { 
    axios.post(`/albums`, album).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function update_album(album){
  return dispatch => { 
    axios.put(`/albums/${album.id}`, album).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function show_album(id){
  return dispatch => {
    axios.get(`/albums/${id}`).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}

export function list_artists(){
  return dispatch => {
    axios.get(`/artists`).then(resp => {}).catch(e => {
      if (e.response) {
        if (e.response.data.errors) {
            e.response.data.errors.forEach(error => toastr.error("Error", error));
        } else {toastr.error(String(e.response.status), e.response.statusText);}
      } else if (e.request) {toastr.error("Error", e.message);}
    });
  };
}