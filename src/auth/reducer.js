const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem(process.env.REACT_APP_APPLICATION_NAME)) || null,
  validToken: false
};

var _ = require('lodash');

var reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REFRESH_TOKEN":
      if(!action.payload) return {...state}
      localStorage.removeItem(process.env.REACT_APP_APPLICATION_NAME);
      localStorage.setItem(
        process.env.REACT_APP_APPLICATION_NAME,
        JSON.stringify({
          ...state.user,
          'access-token': action.payload
        })
      );
      return { 
        ...state,
        user:{
          ...state.user,
          'access-token': action.payload
        }
      }
    case "TOKEN_VALIDATED":
      if (action.payload) {
        return { ...state, validToken: action.payload};
      }
      localStorage.removeItem(process.env.REACT_APP_APPLICATION_NAME);
      return INITIAL_STATE;
    case "LOGOUT":
      localStorage.removeItem(process.env.REACT_APP_APPLICATION_NAME);
      return INITIAL_STATE
    case "USER_FETCHED":
      localStorage.removeItem(process.env.REACT_APP_APPLICATION_NAME);
      localStorage.setItem(
        process.env.REACT_APP_APPLICATION_NAME,
        JSON.stringify({
          name:action.payload.data.name,
          email:action.payload.data.email,
          ws_token: action.payload.data.ws_token,
          permissions: action.payload.permissions,
          uid: _.get(action.payload,"headers.uid"),
          client: _.get(action.payload,"headers.client"),
          "access-token": _.get(action.payload,"headers.access-token")
        })
      );
      return {
        ...state,
        user: {
          name:_.get(action.payload, "data.name"),
          email:action.payload.data.email,
          ws_token: action.payload.data.ws_token,
          permissions: action.payload.permissions,
          uid: _.get(action.payload,"headers.uid"),
          client: _.get(action.payload,"headers.client"),
          "access-token": _.get(action.payload,"headers.access-token")
        },
        validToken: true
      };
    default:
      return state;
  }
};

export default reducer;
