import { db } from "../firebase/firebase-config"

export const loadNotes = async(uid) => { //lo usamos en el appRouter.js

                                        //para obtener la info utilizamos el .get
    const notesSnap = await db.collection(`${uid}/journal/notes`).get();

    const notes = [];

    // console.log(notesSnap); //para ver que nos llega

    notesSnap.forEach(snapHijo => {
        
        // console.log(snapHijo.data()); para ver que llega en el snap hijo.data

        notes.push({ //hacemos un push para hacer un objeto con la data de la nota
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    // console.log(notes); para ver que llega en notes

    return notes;


}