import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import DashboardComponent from './components/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={DashboardComponent} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
