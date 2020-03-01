import React from 'react';
import logo from './logo.svg';

//componets
import Navbar from './components/layout/Nav';
import login from './components/pages/public/login';
import adminRegister from './components/pages/registrations/admin/adminRegister';
import orgRegister from './components/pages/registrations/admin/organization/orgRegister';
import mergingAdminWithOrg from './components/pages/registrations/admin/merging/mergingAdminWithOrg';
import adminModules from './components/pages/adminPages/adminModules/adminModules';
import AuthRoute from  './util/AuthRoute'

import jwtDecode from 'jwt-decode';
import './App.css';

import registration from './components/pages/registrations/registerOptions/registration';
//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED_USER, SET_AUTHENTICATED_ADMIN } from './redux/types';
import { getAdminData, logoutAdmin } from './redux/actions/adminActions';
import { getUserData } from './redux/actions/userActions';

import axios from 'axios';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


const token = localStorage.FBIdToken;
if(token){
  const decodedtoken = jwtDecode(token);
  // console.log(decodedtoken.exp);
  if(decodedtoken.exp * 1000 < Date.now()){
    store.dispatch(logoutAdmin());
    window.location.href = '/login';
  }
} else {
    if(localStorage.accType === "admin") {
      store.dispatch({ type: SET_AUTHENTICATED_ADMIN });
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getAdminData());
  } else if(localStorage.accType === "user") {
    store.dispatch({ type: SET_AUTHENTICATED_USER });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/merge/admin/:fullname/organization/:orgId" component={mergingAdminWithOrg} /> 
              <Route exact path="/admin-register" component={adminRegister} />
              <Route exact path="/admin/:fullname/modules" component={adminModules} />
              <Route exact path="/admin/:fullname/org-register" component={orgRegister} />
              <AuthRoute exact path="/registration" component={registration} />
              <AuthRoute exact path="/login" component={login} />
            </Switch>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
