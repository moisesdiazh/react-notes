import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";

import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {

  const dispatch = useDispatch(); //necesitamos el dispatch para actualizar la nota activa

  // donde manejamos los cambios en las notas

  const {active:note} = useSelector(state => state.notes);
  // console.log(note);

  const [formValues, handleInputChange, reset] = useForm(note);

  // console.log(formValues);
  const {body, title, id} = formValues;

  const activeId = useRef(note.id); //almacenamos una variable mutable 

  //usamos el useEffect para cuando queremos cambiar algo cuando sucede algo

  //hacemos este efecto el cual comparara el note.id con el activeId y si es diferente reseteara la nota

  //si cambia el note.id entonces tendremos una nueva noteActive
  useEffect(() => {

    if(note.id !== activeId.current){
      reset(note);
      activeId.current = note.id //
    }
  
  }, [note, reset]); //mandamos las dependencias
  
  useEffect(() => {
    // console.log(formValues);
    dispatch(activeNote(formValues.id, {...formValues})); //cambiamos la nota Activa 
  }, [formValues, dispatch]); //esto se va a disparar cuando cambie en formValues
  
  const handleDelete = () => {
    //dispatch
    dispatch(startDeleting(id));
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea 
            placeholder="What happened today?" 
            className="notes__textarea" 
            name="body"
            value={body}
            onChange={handleInputChange}
        >

        </textarea>

        {
          (note.url) 
              && ( //si tiene imagen de url entonces mostrar
                    <div className="notes__image">
                        <img src={note.url} alt="imagen"/>
                    </div>
              )
        }
      </div>

        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>
  );
};
