//como queremos que actue la app

import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case types.notesActive:
            return {
                ...state, //hacemos la clonación del estado anterior
                active: {
                    ...action.payload
                }
            }
        
        //para mostrar la nueva nota 
        case types.notesAddNew:
            return {

                ...state,
                notes: [action.payload, ...state.notes] //insertamos la nota
            }

        case types.notesLoad: //para cargar las notas
            return {
                ...state, //hacemos la clonacion del estado anterior
                notes: [...action.payload] 
                //y las notas seran un spread de la payload ejercido en el action
            }

        case types.notesUpdated:
            return {
                ...state, //indicamos que cambiaremos 
                notes: state.notes.map(

                    note => note.id === action.payload.id //si son iguales entonces
                        ? action.payload.note //reflejar el action.payload.note
                        : note //sino solamente reflejar la nota
                )

                // notes: state.notes.map((note) => 
                //     note.id === action.payload.id ? action.payload : note
                // ),
            };
        
        case types.notesDelete: 
            return {
                ...state,
                active: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            } //retornamos todas las notas cuyo id sea diferente al action.payload en el payload esta el id que queremos borrar
        
        //limpiar las notas cuando nos deslogueemos
        case types.notesLogoutCleaning:
            return {
                ...state,
                active: null,
                notes: []
            }

        default:
            return state;
    }
}