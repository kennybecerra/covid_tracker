import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home/Home';
import Admin from './routes/Admin/Admin';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/admin'>
        <Home />
      </Route>
      <Route exact path='/home'>
        <Home />
      </Route>
      <Route path='*'>
        <Redirect to='./home' />
      </Route>
    </Switch>
  );
}

export default App;
