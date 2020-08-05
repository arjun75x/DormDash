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
import { encodeBasicAuthHeader } from "./utils";

function App() {
  const [hasLoggedIn, setLoggedIn] = useState(false);
  const [userNetID, setUserNetID] = useState("");
  const [hasAdminPriv, setHasAdminPriv] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [authHeader, setAuthHeader] = useState(null);
  const [loggedInAsDev, setLoggedInAsDev] = useState(false);

  const handleGoogleLogin = (token, netId, isAdmin = false) => {
    setLoggedIn(true);
    setAuthHeader(encodeBasicAuthHeader("Google", token));
    setUserNetID(netId);
    setHasAdminPriv(isAdmin);
    setLoggedInAsDev(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAuthHeader(null);
    setUserNetID("");
    setHasAdminPriv(false);
  };

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  const handleDeveloperLogin = (netId) => {
    setLoggedIn(true);
    setUserNetID(netId);
    setAuthHeader(encodeBasicAuthHeader("DeveloperOnly", netId));
    setHasAdminPriv(true);
    setLoggedInAsDev(true);
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
                <LogIn handleLogin={handleGoogleLogin} />
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
              authHeader={authHeader}
              userNetID={userNetID}
              handleLogout={handleLogout}
              hasAdminPriv={hasAdminPriv}
              loggedInAsDev={loggedInAsDev}
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
