import React from 'react';
import logo from './logo.svg';
import Navbar from './components/layout/Nav';
import login from './components/pages/public/login';
import adminRegister from './components/pages/registrations/admin/adminRegister';
import orgRegister from './components/pages/registrations/admin/organization/orgRegister';

import registration from './components/pages/registrations/modules/registration';
//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
// import { logoutUser, getUserData } from './redux/actions/userActions'



import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import './App.css';

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
              <Route exact path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/secret/:secretId" component={user} /> */}
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
