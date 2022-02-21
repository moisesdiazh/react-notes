import { useState } from 'react';

//hook para manejar el formulario
export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

                //recibimos el nuevo estado del formualrio
    const reset = (newFormState = initialState) => {
        setValues( newFormState );
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    return [ values, handleInputChange, reset ];

}