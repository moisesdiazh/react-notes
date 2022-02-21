import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector(state => state.notes); //extraemos el active o la nota activa

    const handleSave = () => {
        // console.log(active);
        dispatch(startSaveNote(active)); //hacemos un dispatch con la accion de startSaveNote con active
    }

    const handlePictureClick = () => {

        document.querySelector('#fileSelector').click(); //para simular el click
    }

    const handleFileChange = (e) => {

        // console.log(e.target.files); para ver si llega la foto correspondiente

        const file = e.target.files[0];

        if(file) {

            dispatch(startUploading(file));
        }
    }


    return (
        <div className='notes__appbar'>
            <span>28 de agosto del 2021</span>

            <input
                id="fileSelector" 
                type="file"
                name='file'
                style={{display: 'none'}}
                onChange={handleFileChange}
            />

            <div>
                <button 
                    className='btn'
                    onClick={handlePictureClick}
                >
                    Picture
                </button>

                <button className='btn' onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
