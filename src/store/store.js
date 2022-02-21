import thunk from 'redux-thunk';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

//para trabajar acciones asincronas en la app

//el combine reducers lo utilizamos para poder añadir todos los reducers que vamos a utilizar
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes:notesReducer
});

//con lo que creamos el store
export const store = createStore(//para trabajar acciones asincronas en la app
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);

