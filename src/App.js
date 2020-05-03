import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchResult from './pages/SearchResult';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path='/sign-in' exact component={SignIn} />
        <Route path='/home' exact component={Home} />
        <Route path='/profile/:id' exact component={Profile} />
        <Route path='/results' exact component={SearchResult} />
        <Route path='/' exact component={SignUp} />
      </Switch>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
