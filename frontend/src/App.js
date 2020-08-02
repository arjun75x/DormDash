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
  const [userTokenID, setUserTokenID] = useState();
  const [userNetID, setUserNetID] = useState("");
  const handleLogIn = () => (value) => {
    // console.log(value);
    setLoggedIn(value);
  }
  const handleUserToken = () => (value) => {
    // console.log(value);
    setUserTokenID(value);
  }
  const handleUserNetID = () => (value) => {
    // console.log(value);
    setUserNetID(value);
  }
  return (
    <main>      
        { !hasLoggedIn && 
          <LogIn 
          setLoggedInCB={handleLogIn()} 
          handleUserTokenCB={handleUserToken()} 
          handleUserNetIDCB={handleUserNetID()}/>}
        { hasLoggedIn &&
        <Switch>
          <Route path="/"   exact>
            <Queue 
            hasLoggedIn={hasLoggedIn} 
            setLoggedInCB={handleLogIn()} 
            userTokenID={userTokenID} 
            userNetID={userNetID}
            handleUserTokenCB={handleUserToken()} 
            handleUserNetIDCB={handleUserNetID()}
          />
          </Route>
          <Route path="/admin" component={Admin} />
          <Route component={Error} />
        </Switch>
        }
      
    </main>
  );
}

export default App;
