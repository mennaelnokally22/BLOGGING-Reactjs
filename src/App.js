import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchResult from './pages/SearchResult';
import FollowersBlogs from './pages/FollowersBlogs';

import { setAuth } from './actions/auth';
import BlogDetails from './pages/BlogDetails';

function App({ dispatch }) {
  const token = localStorage.getItem('token');
  if (token) {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(setAuth({ token, ...user }));
  }
  return (
    <div style={{ backgroundColor: '#212121', paddingBottom: '100px' }}>
      <Switch>
        <Route path='/sign-in' exact component={SignIn} />
        <Route path='/home' exact component={Home} />
        <Route path='/profile/:id' exact component={Profile} />
        <Route path='/results' exact component={SearchResult} />
        <Route path='/followers-blogs' exact component={FollowersBlogs} />
        <Route path='/blog/:id' exact component={BlogDetails} />
        <Route path='/' exact component={SignUp} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default connect()(App);
