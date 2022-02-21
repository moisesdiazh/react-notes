import Swal from 'sweetalert2';



import { db, doc, setDoc, collection } from "../firebase/firebase-config";
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import {types} from '../types/types';




export const startNewNote = () => {
    //como es asincrona, se coloca el return y el callback
    return async(dispatch, getState) => {

        // const state = getState(); si queremos ver que llega accionando el boton de nuevas entradas
        // console.log(state);

        const {uid} = getState().auth;
        // console.log(uid);

        //creamos el objeto vacio con la nota
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        
        // console.log(doc);

        //creamos la nota
        dispatch(activeNote(doc.id, newNote)); //hacemos el dispatch al reducer

        dispatch(addNewNote(doc.id, newNote));
    }
}


//accion sincrona
export const activeNote = (id, notes) => ({

    
    type: types.notesActive,
    payload: {
        id,
        ...notes
    }
});

//para que se añada la nueva nota en la pantalla en tiempo real, mandamos la accion en startNewNote
export const addNewNote = (id, notes) => ({

    type: types.notesAddNew,
    payload: {
        id,
        ...notes
    }
})




export const startLoadingNotes = (uid) => {
 
    return async (dispatch) => {
 
        const notes = await loadNotes(uid)
 
        dispatch(setNotes(notes))//hacemos un dispatch de la accion setNotes con las notas 
    }
}

export const setNotes = (notes) => ({

    type: types.notesLoad,
    payload: notes

});

//recibimos el note y esto sera una tarea asincrona mediante thunk
export const startSaveNote = (note) => {

    return async(dispatch, getState) => {

        const {uid} = getState().auth;

        if(!note.url){ //si la url no existe, eliminarla

            delete note.url;
        }

        const noteToFirestore = {...note};

        delete noteToFirestore.id; //eliminar el id

        //vamos a la bd, con el id del usuario y actualizamos la nota
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

        dispatch(refreshNote(note.id, noteToFirestore )); //disparamos el refreshNote

        Swal.fire('Saved', note.title, 'success'); 
        //mensaje de sweetalert luego de guardar y refrescar
    }
}


//pedimos el id y la nota
export const refreshNote = (id, note) => ({ //refrescamos la nota en la barra lateral

    type: types.notesUpdated,
    payload: {
        id, 
        note: {
            id,
            ...note
        }
    }
})

//es una tarea asincrona
export const startUploading = (file) => {

    return async(dispatch, getState) => {

        const {active:activeNote} = getState().notes; //traemos el active del activeNote

        //mensaje de sweetalert
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        // console.log(file); vemos que nos llegan en file

        // console.log(activeNote); vemos que nos llega en activeNote

        //realizamos el helper para la subida de archivos
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) ) //disparamos la accion de StartSaveNote mandando la notaActiva

        // console.log(fileUrl);

        Swal.close(); //para cerrar la alerta
    }
}
                            //enviamos el id de la nota
export const startDeleting = (id) => {

    return async(dispatch, getState) => {

        const uid = getState().auth.uid; //obtenemos el id

        // console.log(`${uid}/journal/notes/${id}`) para verificar
        await db.doc(`${uid}/journal/notes/${id}`).delete();

        dispatch(deleteNote(id));
    }
};

//tarea sincrona y debemos colocarlo en el reducer
export const deleteNote = (id) => ({

    type: types.notesDelete,
    payload: id
});

//el notelogout para cuando nos deslogueemos y se limpien las notas
//luego vamos al reducer a colocar el type y por ultimo colocarlo en el actions de auth en startLogout
export const noteLogout = () => ({

    type: types.notesLogoutCleaning,

});