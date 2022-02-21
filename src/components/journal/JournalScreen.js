import React from 'react'
import { useSelector } from 'react-redux'
import { NoteScreen } from '../notes/NoteScreen'
import { NothingSelected } from './NothingSelected'
// import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const {active} = useSelector(state => state.notes);

    return (
        <div className="journal__main-content">
            <Sidebar/>
            
            <main>

                {/* Un ternario para indicar que si esta activo mostrar el notescreen y sino, nada seleccionado */}
                {
                    (active)
                        ? (<NoteScreen/>)
                        : (<NothingSelected/>)
                }

                {/* <NothingSelected/> */}
                {/* <NoteScreen/> */}
            </main>
        </div>
    )
}
