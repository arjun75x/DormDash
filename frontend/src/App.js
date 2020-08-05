import React from "react";
import { useState } from "react";
import "./App.css";
import Queue from "./queue";
import { Route, Switch } from "react-router-dom";
import Admin from "./admin";
import LogIn from "./LogIn/index";
import DeveloperLogin from "./LogIn/DeveloperLogin";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

function App() {
  const [hasLoggedIn, setLoggedIn] = useState(false);
  const [userTokenID, setUserTokenID] = useState();
  const [userNetID, setUserNetID] = useState("");
  const [hasAdminPriv, setPriv] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleLogIn = (value) => {
    setLoggedIn(value);
  };
  const handleUserToken = (value) => {
    setUserTokenID(value);
  };
  const handleUserNetID = (value) => {
    setUserNetID(value);
  };
  const handlePriv = (value) => {
    setPriv(value);
  };

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  const handleDeveloperLogin = (netId) => {
    setLoggedIn(true);
    setUserNetID(netId);
    setUserTokenID("DeveloperOnly");
  };

  return (
    <main>
      {!hasLoggedIn && userNetID === "" && (
        <Box
          height="100%"
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <Box display="flex" flexDirection="column" height="300px">
            <Paper>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Google" />
                <Tab label="Developer" />
              </Tabs>
            </Paper>
            <Box
              padding="40px 0"
              margin="0 auto"
              width="100%"
              display="flex"
              justifyContent="center"
            >
              {selectedTab === 0 ? (
                <LogIn
                  setLoggedInCB={handleLogIn}
                  handleUserTokenCB={handleUserToken}
                  handleUserNetIDCB={handleUserNetID}
                  handlePrivCB={handlePriv}
                />
              ) : (
                <DeveloperLogin handleLogin={handleDeveloperLogin} />
              )}
            </Box>
          </Box>
        </Box>
      )}
      {hasLoggedIn && userNetID !== "" && (
        <Switch>
          <Route path="/" exact>
            <Queue
              hasLoggedIn={hasLoggedIn}
              setLoggedInCB={handleLogIn}
              userTokenID={userTokenID}
              userNetID={userNetID}
              handleUserTokenCB={handleUserToken}
              handleUserNetIDCB={handleUserNetID}
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
