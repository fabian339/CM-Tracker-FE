import React from 'react';
import logo from './logo.svg';

//componets
import Navbar from './components/layout/Nav';
import login from './components/pages/public/login';
import UserRegister from './components/pages/registrations/admin/UserRegister';
import orgRegister from './components/pages/registrations/admin/organization/orgRegister';
import loadingAdminPage from './components/pages/adminPages/LoadingPageAdmin/loadingAdminPage';
import adminModules from './components/pages/adminPages/adminModules/adminModules';
import PrivateAdminRoute from  './util/authRoutes/PrivateAdminRoute';
import PrivateUserRoute from  './util/authRoutes/PrivateUserRoute';
import UNAUTHORIZEDPAGE from './components/pages/public/UNAUTHORIZEDPAGE'


import jwtDecode from 'jwt-decode';
import './App.css';

import registration from './components/pages/registrations/registerOptions/registration';
//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED_USER, SET_AUTHENTICATED_ADMIN, SET_ERRORS } from './redux/types';
import { getAdminData, logoutUser } from './redux/actions/userActions';
import { getUserData } from './redux/actions/userActions';

import axios from 'axios';

import {BrowserRouter as Router, Route, Switch, useParams} from 'react-router-dom'


const token = localStorage.FBIdToken;

if(token){
  const decodedtoken = jwtDecode(token);
  // console.log(decodedtoken.exp);
  if(decodedtoken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
      // if(localStorage.accType === "admin") {
        // console.log("settiong headers", window);
        store.dispatch({ type: SET_AUTHENTICATED_ADMIN });
        axios.defaults.headers.common['Authorization'] = token;
        // store.dispatch(getAdminData(localStorage.fullname));
      // } else if(localStorage.accType === "user") {
      // store.dispatch({ type: SET_AUTHENTICATED_USER });
      // axios.defaults.headers.common['Authorization'] = token;
      // store.dispatch(getUserData());
    // }
  }
}


function App() {
  return (
    
    <Provider store={store}>
      <Router>
        <Navbar />
          {/* <div className="container"> */}
            <Switch>
              <PrivateAdminRoute exact path="/merge/admin/:fullname/organization/:orgId" component={loadingAdminPage} /> 
              <PrivateAdminRoute exact path="/admin/:fullname/modules" component={adminModules} />
              {/* <PrivateUserRoute exact path="/user/:fullname/page" component={adminModules} /> */}
              <PrivateAdminRoute exact path="/admin/:fullname/org-register" component={orgRegister} />
              <Route
                exact path="/admin-register"
                render={(props) => <UserRegister {...props} role={"admin"} />} />
              <Route
                exact path="/user-register"
                render={(props) => <UserRegister {...props} role={"regular-user"} />} />
              <Route
                exact path="/client-register"
                render={(props) => <UserRegister {...props} role={"external-user"} />} />
              <Route exact path="/registration" component={registration} />
              <Route exact path="/login" component={login} />
              <Route exact path="/UNAUTHORIZED" component={UNAUTHORIZEDPAGE} />
            </Switch>
          {/* </div> */}
      </Router>
    </Provider>
  );
}

export default App;
