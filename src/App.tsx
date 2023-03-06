import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Admin from './routes/Admin/Admin';
import Home from './routes/Home/Home';

import './dayjs';

function App() {
  return (
    <Switch>
      <Route exact path='/admin'>
        <Admin />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
