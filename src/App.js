import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Skills from './components/Skills';
import Skill from './components/Skill';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import '@fontsource/roboto';

function App() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/skills">
          <Skills />
        </Route>
        <Route path="/skills/:id">
          <Skill />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

