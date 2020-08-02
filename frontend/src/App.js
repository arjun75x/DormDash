import React from "react";
import {useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import Queue from "./queue";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./admin";
import LogIn from './LogIn/index';

function App() {
  const [hasLoggedIn, setLoggedIn] = useState(false);
  const handleLogIn = () => (value) => {
    console.log(value);
    setLoggedIn(value);
  }
  return (
    <main>      
        { !hasLoggedIn && 
          <LogIn setLoggedInCB={handleLogIn()}/>}
        { hasLoggedIn &&
        <Switch>
          <Route path="/"   exact>
            <Queue hasLoggedIn={hasLoggedIn} setLoggedInCB={handleLogIn()}/>
          </Route>
          <Route path="/admin" component={Admin} />
          <Route component={Error} />
        </Switch>
        }
      
    </main>
  );
}

export default App;
