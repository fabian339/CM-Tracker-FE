import React from 'react';

//componets
import Navbar from './components/layout/Nav';
import login from './components/pages/public/login';

import PrivateAdminRoute from  './util/authRoutes/PrivateAdminRoute';
// import UNAUTHORIZEDPAGE from './components/pages/public/UNAUTHORIZEDPAGE'


import jwtDecode from 'jwt-decode';
import './App.css';

// import registration from './components/pages/registrations/registerOptions/registration';
import timesheetForm from './components/pages/timesheetForm';
import timesheetDisplay from './components/pages/timesheetDisplay';
import signatures from './components/pages/signatures';
import signaturesDisplay from './components/pages/signatureDisplay';

import UNAUTHORIZED from './components/pages/public/UNAUTHORIZEDPAGE';

//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED_USER, SET_AUTHENTICATED_ADMIN } from './redux/types';
import { logoutUser } from './redux/actions/userActions';

import axios from 'axios';

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

axios.defaults.baseURL = "https://us-central1-cm-tracker-492ed.cloudfunctions.net/api";
const token = localStorage.FBIdToken;

if(token){
  const decodedtoken = jwtDecode(token);
  // console.log(decodedtoken.exp);
  if(decodedtoken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
      if(localStorage.role === "admin") {
        // console.log("settiong headers", window);
        store.dispatch({ type: SET_AUTHENTICATED_ADMIN });
        axios.defaults.headers.common['Authorization'] = token;
        // store.dispatch(getAdminData(localStorage.fullname));
      } else if(localStorage.accType === "regular-user") {
      store.dispatch({ type: SET_AUTHENTICATED_USER });
      axios.defaults.headers.common['Authorization'] = token;
      // store.dispatch(getUserData());
    }
  }
}


function App() {
  return (
    
    <Provider store={store}>
      <Router>
        <Navbar />
            <Switch>
              <Route exact path="/" component={timesheetForm} />
              <Route exact path="/signatures" component={signatures} />
              <Route exact path="/login" component={login} />
              <PrivateAdminRoute exact path="/timesheets/:fullname" component={timesheetDisplay} />
              <PrivateAdminRoute exact path="/signatures/:fullname" component={signaturesDisplay} />

              <Route exact path="/UNAUTHORIZED" component={UNAUTHORIZED} />

            </Switch>
      </Router>
    </Provider>
  );
}

export default App;
