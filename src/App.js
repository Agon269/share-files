import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { AuthProvider } from "./Auth";

import Home from "./pages/Home";
import PrivateRoute from "./pages/PrivateRoute";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Download from "./pages/Download";
import Upload from "./pages/Upload";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/download" exact component={Download} />
            <PrivateRoute path="/upload" exact component={Upload} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/Signin" exact component={Signin} />
            <Redirect from="*" to="/404" />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
