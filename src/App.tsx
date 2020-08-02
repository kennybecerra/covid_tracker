import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home/Home';
import Admin from './routes/Admin/Admin';
import './App.css';

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
