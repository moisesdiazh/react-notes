import { types } from "../types/types";
//reducer de la autenticación para login

//los reducer reciben el state y el action
//el state estara vacio siempre y cuando no este autenticado
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      };

    case types.logout: //restablecemos el objeto a un objeto vacio
      return {};

    default:
      return state;
  }
};
