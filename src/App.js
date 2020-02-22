import React from 'react';
import logo from './logo.svg';
import Navbar from './components/layout/Nav';
import login from './components/pages/public/login';
import adminRegister from './components/pages/registrations/admin/adminRegister';
import orgRegister from './components/pages/registrations/admin/organization/orgRegister';
import loadingData from './components/pages/registrations/admin/loadingData/loadingData';

import jwtDecode from 'jwt-decode';
import './App.css';

import registration from './components/pages/registrations/modules/registration';
//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutAdminUser, getAdminData } from './redux/actions/adminActions'
import axios from 'axios';



import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


const token = localStorage.FBIdToken;
if(token){
  const decodedtoken = jwtDecode(token);
  // console.log(decodedtoken.exp);
  if(decodedtoken.exp * 1000 < Date.now()){
    store.dispatch(logoutAdminUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getAdminData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
          <div className="container">
            <Switch>
              {/* <Route exact path="/" component={home} /> */}
              {/* <AuthRoute exact path="/login" component={login} /> */}
              {/* <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />*/}
              <Route exact path="/merge/admin/:fullname/organization/:orgId" component={loadingData} /> 
              <Route exact path="/admin-register" component={adminRegister} />
              <Route exact path="/org-register" component={orgRegister} />
              <Route exact path="/registration" component={registration} />
              <Route exact path="/login" component={login} />
              {/* <Route exact path="/register" component={register} /> */}
            </Switch>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
