import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { HomeComponent } from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomeComponent} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
