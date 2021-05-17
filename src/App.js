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
import Another from "./pages/Another";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/an" exact component={Another} />
            {/* <Route path="/create" exact component={Create} /> */}
            <Route path="/signup" exact component={SignUp} />
            {/* <Route path="/login" exact component={Login} /> */}
            <Route path="/Signin" exact component={Signin} />
            <Redirect from="*" to="/404" />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
