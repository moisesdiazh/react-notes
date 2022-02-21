import React from "react";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

                            //recibimos el id, date, title, body y url de la imagen
export const JournalEntry = ({id, date, title, body, url}) => {

  //momentjs
  const noteDate = moment(date);

  const dispatch = useDispatch();

  const handleEntryClick = () => {

    dispatch(
      activeNote(id, {
          date, title, body, url
      })
      ); //hacemos un dispatch del active note pero mandandole el id
  }
  
  return (

    <div className="journal__entry pointer" onClick={handleEntryClick}>

      {
        url && //si url existe entonces mostrar la imagen
        <div 
          className="journal__entry-picture" 
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${url})`
          }}>
      </div>
      }

      <div className="journal__entry-body">
          <p className="journal__entry-title">
              {title}
          </p>

          <p className="journal__entry-content">
              {body}

          </p>
      </div>

      <div className="journal__entry-date-box">
          {/* aplicamos momentjs */}
          <span>{noteDate.format('dddd')}</span>
          <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  );
};
