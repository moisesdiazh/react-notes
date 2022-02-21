import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";


//accion asincrona

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {

      dispatch( startLoading() );
      
  //realizamos el auth y el logeo con firebase, hacemos una promesa con que llegue el usuario
  //luego mandamos un dispatch de login con el id del usuario y el name del usuario
      firebase.auth().signInWithEmailAndPassword( email, password )
          .then( ({ user }) => {

              // console.log(user); // para ver que nos llegue el user a firebase

              //ahora hacemos el dispatch para que se dispare la acción
              dispatch(login( user.uid, user.displayName ));

              dispatch( finishLoading() );
          })
          .catch( e => {
              console.log(e);
              dispatch( finishLoading() );
              Swal.fire('Error', e.message, 'error');
          })

      
      
  }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name }); //para que se actualice el displayname con el name

        // console.log(user); // para ver que nos llegue el user a firebase

        //ahora hacemos el dispatch para que se dispare la acción
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
        Swal.fire("Error", e.message, "error");
      });
  };
};

//el login con google
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

//esta es la acción que vamos a llamar cuando tengamos el uid y el displayName
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  //es asincrono porque la parte de firebase tiene que dispararla y
  // ejecutar el logout con una instruccion de firebase que regresa una promesa
  return async (dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());

    dispatch(noteLogout());//cuando nos deslogueamos
  };
};

export const logout = () => ({
  type: types.logout,
});
