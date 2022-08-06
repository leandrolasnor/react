import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";
import reducers from "./reducers/reducers";
import AuthOrApp from "./authOrApp";
import reportWebVitals from './reportWebVitals';
import ReduxToastr from 'react-redux-toastr'

const devTools =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : null;
const store =
  process.env.NODE_ENV === "development"
    ? applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)
    : applyMiddleware(multi, thunk, promise)(createStore)(reducers);

const Index = () => (
  <Provider store={store}>
    <AuthOrApp />
    <ReduxToastr
      timeOut={6000}
      newestOnTop={true}
      preventDuplicates
      position="bottom-right"
      transitionIn='bounceIn'
      transitionOut='bounceOut'
      progressBar
      closeOnToastrClick/>
  </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('musicollection')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
