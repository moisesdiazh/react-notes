import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";

import validator from "validator";
import { removeError, setError } from "../../actions/ui"; //importamos las acciones de ui
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {

  //le damos acceso al dispath, sirve para hacer dispatch de acciones
  const dispatch = useDispatch();

  const {msgError} = useSelector(state => state.ui);

  // console.log(msgError) // para ver que llega

  //lo que vamos a mandar al formulario, aunque sean datos ficticios
  const [formValues, handleInputChange] = useForm({
    name: "Moi",
    email: "moi@moi.cl",
    password: "12345",
    confirmPassword: "12345",
  });

  const { name, email, password, confirmPassword } = formValues; //los valores que sacaremos del formvalues, email y pass

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log(name, email, password, password2); confirmamos si llegan los datos

    if (isFormValid()) {
      // console.log("formulario correcto");

      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  };

  //validaciones en el formulario
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required')); //disparamos con el dispatch con la accion asincrona
      return false;
    }

    //validator es una importación que usamos para validar el correo
    else if (!validator.isEmail(email)) {

      dispatch(setError("Email is not valid")); //disparamos con el dispatch con la accion asincrona
      return false;
    } else if (password !== confirmPassword || password.length < 5) {

      dispatch(setError('Password should be at least 6 characters and match each other')); //disparamos con el dispatch con la accion asincrona
      return false
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={handleRegister}>

        {
          // si mensaje de error es true entonces cambiar el mensaje a los de setError
          msgError &&
          (
            <div className="auth__alert-error">
                {msgError}
            </div>
          )
        }

        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="auth__input"
          value={confirmPassword}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Sign Up
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
