import { types } from "../types/types";

const initalState = {
  //hacemos unos datos ficticios
  loading: false,
  msgError: null,
};

//hacemos el reducer con una constate inicializada con datos ficticios

//luego debemos ir al store para colocarlo

//luego vamos a los actions a crear la action
export const uiReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };

    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };

    case types.uiStartLoading: //el reducer de uiStartLoading, el types estan types.js
      return {
        ...state,
        loading: true,
      };

    
    case types.uiFinishLoading: //el reducer de uiFinishLoading, el types estan types.js
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
