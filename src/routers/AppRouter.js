import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { useDispatch } from "react-redux";

import { firebase } from "../firebase/firebase-config";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";

import { JournalScreen } from "../components/journal/JournalScreen";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch(); //traemos el useDispatch

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // console.log(user); para ver que llega en el user

      //si el objeto user tiene algo entonces
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid)); //hacemos un dispatch de la accion startLoadingNotes con las notas
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]); //colocamos el dispatch y el setChecking como dependencias

  if (checking) {
    return <h1>Wait...</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          {/* Rutas de authRouter */}
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />
          {/* Rutas de JournalScreen */}
          <PrivateRoute
            isAuthenticated={isLoggedIn}
            isAuthenticated={isLoggedIn}
            exact
            path="/"
            component={JournalScreen}
          />

          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
