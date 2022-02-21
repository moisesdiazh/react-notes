import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const {notes} = useSelector(state => state.notes);

    // console.log(notes);



    return (
        <div className='journal__entries'>
            
            {
                notes.map(notes => (
                    // debemos mandar las props
                    <JournalEntry 
                        key={notes.id} 
                        {...notes}

                    />
                ))
            }
        </div>
    )
}
