import React from "react";
import { useState } from "react";
import "./App.css";
import Queue from "./queue";
import { Route, Switch } from "react-router-dom";
import Admin from "./admin";
import LogIn from "./LogIn/index";

function App() {
  const [hasLoggedIn, setLoggedIn] = useState(false);
  const [userTokenID, setUserTokenID] = useState();
  const [userNetID, setUserNetID] = useState("");
  const [hasAdminPriv, setPriv] = useState(false);
  const handleLogIn = () => (value) => {
    // console.log(value);
    setLoggedIn(value);
  };
  const handleUserToken = () => (value) => {
    // console.log(value);
    setUserTokenID(value);
  };
  const handleUserNetID = () => (value) => {
    // console.log(value);
    setUserNetID(value);
  };
  const handlePriv = (value) => {
    setPriv(value);
  };
  return (
    <main>
      {!hasLoggedIn && userNetID === "" && (
        <>
          <LogIn
            setLoggedInCB={handleLogIn()}
            handleUserTokenCB={handleUserToken()}
            handleUserNetIDCB={handleUserNetID()}
            handlePrivCB={handlePriv}
          />
        </>
      )}
      {hasLoggedIn && userNetID !== "" && (
        <Switch>
          <Route path="/" exact>
            <Queue
              hasLoggedIn={hasLoggedIn}
              setLoggedInCB={handleLogIn()}
              userTokenID={userTokenID}
              userNetID={userNetID}
              handleUserTokenCB={handleUserToken()}
              handleUserNetIDCB={handleUserNetID()}
              hasAdminPriv={hasAdminPriv}
            />
          </Route>
          <Route path="/admin" component={Admin} />
          <Route component={Error} />
        </Switch>
      )}
    </main>
  );
}

export default App;
