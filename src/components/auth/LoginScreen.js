import React from "react";
import { useDispatch, useSelector } from "react-redux"; //hook de dispatch
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";


export const LoginScreen = () => {

  //le damos acceso al dispath, sirve para hacer dispatch de acciones
  const dispatch = useDispatch();

  //necesitamos seleccionar con el selector o extraer el loading
  const {loading} = useSelector(state => state.ui); 

  //lo que vamos a mandar al formulario, aunque sean datos ficticios
  const [formValues, handleInputChange] = useForm({

    email: "moi@moi.cl",
    password: "123456",
  });

  const {email, password} = formValues; //los valores que sacaremos del formvalues, email y pass

  //manejamos el submit
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password)); //disparamos con el dispatch con la accion asincrona
  }

  //realizamos el dispatch del startGoogleLogin mediante el handleGoogleLogin en el boton de google
  const handleGoogleLogin = () => {

    dispatch(startGoogleLogin());
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          Sign In
        </button>

        <div className="auth__social-networks">
          <p>Login with Social Networks</p>

          <div 
              className="google-btn"
              onClick={handleGoogleLogin}
          >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
