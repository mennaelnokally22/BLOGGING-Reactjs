import React, { Fragment } from 'react';
import SignUp from './pages/SignUp';
import { Switch, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path='/' exact component={SignUp} />
        <Route path='/sign-in' exact component={SignIn} />
        <Route path='/home' exact component={Home} />
      </Switch>
    </Fragment>
  );
}

export default App;
