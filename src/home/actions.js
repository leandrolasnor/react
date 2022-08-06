import axios from 'axios';
import { toastr } from 'react-redux-toastr';
const _ = require("lodash");

export function get_jobs(data, limit = 3, offset = 0){
    const config = {
        headers:{
            "uid": _.get(data,"uid"),
            "client":_.get(data,"client"),
            "access-token": _.get(data,"access-token"),
            'Content-Type': process.env.REACT_APP_CONTENTTYPE
        }
    }
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/get_jobs/${limit}/${offset}`, config)
            .then(resp => {
                dispatch({type: "JOBS_FETCHED", payload: _.get(resp.data, "jobs", [])})
            })
            .catch(e => {
                if (e.response) {
                    if (e.response.data.errors) {
                        e.response.data.errors.forEach(
                            error => toastr.error('Erro', error)
                        )
                    } else {
                        toastr.error(String(e.response.status), e.response.statusText)
                    }
                } else if (e.request) {
                    if (e.message === 'Network Error') {
                        toastr.error('Erro', 'Servidor OFFLINE');
                    }
                }
            })
    }
}