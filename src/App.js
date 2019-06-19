import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { CalculatorComponent } from './components/Calculator/Calculator';
import { ListComponent } from './components/List/List';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ListComponent} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
