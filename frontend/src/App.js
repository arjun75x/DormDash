import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Queue from "./queue";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from "./admin/admin";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Queue} exact />
        <Route path="/admin" component={Admin} />
        {/* <Queue /> */}
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
