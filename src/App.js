import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./firebase";
function App() {
  const [isLoggedin, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((userAuth) => {
      const user = {
        uid: userAuth?.uid,
        email: userAuth?.email,
      };
      if (userAuth) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(null);
      }
    });
    return unsub;
  });

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route
            path="/signup"
            exact
            render={() => (isLoggedin ? <Home /> : <SignUp />)}
          />
          <Route
            path="/share"
            render={() => (isLoggedin ? <Home /> : <SignIn />)}
          />

          <Redirect from="*" to="/404" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
