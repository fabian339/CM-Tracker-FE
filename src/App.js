import React from 'react';
import logo from './logo.svg';
import Navbar from './components/layout/Nav';
import login from './components/pages/public/login';
import register from './components/pages/public/register';
import registration from './components/pages/public/registration';



import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
        <div className="container">
          <Switch>
            {/* <Route exact path="/" component={home} /> */}
            {/* <AuthRoute exact path="/login" component={login} /> */}
            {/* <AuthRoute exact path="/signup" component={signup} />
            <Route exact path="/users/:handle" component={user} />
            <Route exact path="/users/:handle/secret/:secretId" component={user} /> */}
            <Route exact path="/registration" component={registration} />
            <Route exact path="/login" component={login} />
            <Route exact path="/register" component={register} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
