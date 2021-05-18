import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import app from "./firebase";
const auth = app.auth();
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const authenticate = () => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  };
  useEffect(() => {
    authenticate();
  }, []);
  if (pending) {
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
